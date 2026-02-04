package main

import (
	"bufio"
	"context"
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"os"
	"regexp"
	"sort"
	"strings"
	"time"

	"github.com/tmc/langchaingo/llms"
	"github.com/tmc/langchaingo/llms/openai"
	"github.com/tmc/langchaingo/prompts"
)

type LogEntry struct {
	Timestamp time.Time `json:"timestamp"`
	Level     string    `json:"level"`
	Message   string    `json:"message"`
	Source    string    `json:"source"`
	Raw       string    `json:"raw"`
}

type LogAnalysis struct {
	TotalEntries    int            `json:"total_entries"`
	ErrorCount      int            `json:"error_count"`
	WarningCount    int            `json:"warning_count"`
	TopErrors       []ErrorPattern `json:"top_errors"`
	TimeRange       TimeRange      `json:"time_range"`
	Recommendations []string       `json:"recommendations"`
	Anomalies       []Anomaly      `json:"anomalies"`
}

type ErrorPattern struct {
	Pattern string `json:"pattern"`
	Count   int    `json:"count"`
	Example string `json:"example"`
}

type TimeRange struct {
	Start time.Time `json:"start"`
	End   time.Time `json:"end"`
}

type Anomaly struct {
	Type        string   `json:"type"`
	Description string   `json:"description"`
	Severity    string   `json:"severity"`
	Examples    []string `json:"examples"`
}

type LogAnalyzer struct {
	llm llms.Model
}

// 初始化模型
func NewLogAnalyzer() (*LogAnalyzer, error) {
	llm, err := openai.New(
		openai.WithBaseURL("https://ark.cn-beijing.volces.com/api/v3"),
		openai.WithModel("doubao-seed-1-8-251228"),
	)
	if err != nil {
		log.Fatalf("建立llm模型失败: %v", err)
		return nil, err
	}

	return &LogAnalyzer{
		llm: llm,
	}, nil

}

func (la *LogAnalyzer) ParseLogFile(filename string) ([]LogEntry, error) {
	file, err := os.Open(filename) // 不会直接读取文件
	if err != nil {
		log.Fatalf("打开日志文件失败: %v", err)
		return nil, err
	}
	defer file.Close()

	var entries []LogEntry

	scanner := bufio.NewScanner(file)

	// 把我们关心的日志格式都“编译成正则表达式”，方便后续去匹配日志文件的每一行，提取我们想要的信息
	patterns := []*regexp.Regexp{
		// JSON logs
		regexp.MustCompile(`^\{.*\}$`),
		// Standard format: 2023-01-01 12:00:00 [ERROR] message
		regexp.MustCompile(`^(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2})\s+\[(\w+)\]\s+(.+)$`),
		// Nginx/Apache format
		regexp.MustCompile(`^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}).*\[([^\]]+)\].*"([^"]*)".*(\d{3})`),
	}

	for scanner.Scan() { //读取下一行（默认按行分割）  返回 true → 说明读取成功，还有数据
		line := scanner.Text() //获取刚才 Scan() 读取的文本  默认是 字符串，不包含换行符
		if strings.TrimSpace(line) == "" {
			continue
		}
		entry := LogEntry{Raw: line}
		// 如果这个行是 JSON 格式，则尝试解析为 JSON
		if line[0] == '{' {
			var jsonEntry map[string]interface{}
			if err := json.Unmarshal([]byte(line), &jsonEntry); err == nil {
				entry = parseJSONLog(jsonEntry, line)
				entries = append(entries, entry)
				continue
			}
		}

		// Try structured patterns
		for _, pattern := range patterns[1:] {
			if matches := pattern.FindStringSubmatch(line); matches != nil {
				entry = parseStructuredLog(matches, line)
				break
			}
		}

		// Fallback: treat as unstructured
		if entry.Timestamp.IsZero() { //用来判断这个 time.Time 是否等于 零值
			entry = LogEntry{
				Timestamp: time.Now(), // Use current time as fallback
				Level:     inferLogLevel(line),
				Message:   line,
				Raw:       line,
			}
		}

		entries = append(entries, entry)

	}
	return entries, scanner.Err()

}

func parseJSONLog(data map[string]any, raw string) LogEntry {
	entry := LogEntry{
		Raw: raw,
	}
	if ts, ok := data["timestamp"].(string); ok {
		if t, err := time.Parse(time.RFC3339, ts); err == nil {
			entry.Timestamp = t
		}
	}

	if level, ok := data["level"].(string); ok {
		entry.Level = level
	}

	if msg, ok := data["message"].(string); ok {
		entry.Message = msg
	}

	if src, ok := data["source"].(string); ok {
		entry.Source = src
	}

	return entry

}

func parseStructuredLog(matches []string, raw string) LogEntry {
	entry := LogEntry{Raw: raw}

	if len(matches) >= 4 {
		if t, err := time.Parse("2006-01-02 15:04:05", matches[1]); err == nil {
			entry.Timestamp = t
		}
		entry.Level = matches[2]
		entry.Message = matches[3]
	}

	return entry
}

func inferLogLevel(line string) string {
	lower := strings.ToLower(line)
	switch {
	case strings.Contains(lower, "error") || strings.Contains(lower, "fatal"):
		return "ERROR"
	case strings.Contains(lower, "warn"):
		return "WARN"
	case strings.Contains(lower, "debug"):
		return "DEBUG"
	default:
		return "INFO"
	}
}

// --------------------------------------------------------------------------------------------------------------------

func (la *LogAnalyzer) AnalyzeLogs(entries []LogEntry) (*LogAnalysis, error) {
	if len(entries) == 0 {
		return &LogAnalysis{}, nil
	}

	// Basic statistics
	analysis := &LogAnalysis{
		TotalEntries: len(entries),
		TimeRange: TimeRange{
			Start: entries[0].Timestamp,
			End:   entries[len(entries)-1].Timestamp,
		},
	}

	// Count by level
	errorMessages := []string{}
	for _, entry := range entries {
		switch strings.ToUpper(entry.Level) {
		case "ERROR", "FATAL":
			analysis.ErrorCount++
			errorMessages = append(errorMessages, entry.Message)
		case "WARN", "WARNING":
			analysis.WarningCount++
		}
	}

	// Find error patterns
	analysis.TopErrors = findErrorPatterns(errorMessages)

	// Use AI for deeper analysis
	if err := la.performAIAnalysis(entries, analysis); err != nil {
		return nil, fmt.Errorf("AI analysis failed: %w", err)
	}

	return analysis, nil
}

func findErrorPatterns(messages []string) []ErrorPattern {
	patternCounts := make(map[string]int)
	patternExamples := make(map[string]string)

	for _, msg := range messages {
		// Normalize error messages by removing specific values
		pattern := normalizeErrorMessage(msg)
		patternCounts[pattern]++
		if patternExamples[pattern] == "" {
			patternExamples[pattern] = msg
		}
	}

	// Sort by frequency
	type kv struct {
		Pattern string
		Count   int
	}

	var sorted []kv
	for k, v := range patternCounts {
		sorted = append(sorted, kv{k, v})
	}

	sort.Slice(sorted, func(i, j int) bool {
		return sorted[i].Count > sorted[j].Count
	})

	var result []ErrorPattern
	for i, kv := range sorted {
		if i >= 10 { // Top 10 patterns
			break
		}
		result = append(result, ErrorPattern{
			Pattern: kv.Pattern,
			Count:   kv.Count,
			Example: patternExamples[kv.Pattern],
		})
	}

	return result
}

func normalizeErrorMessage(msg string) string {
	// Replace common variable patterns
	re1 := regexp.MustCompile(`\d+`)
	re2 := regexp.MustCompile(`[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}`)
	re3 := regexp.MustCompile(`\b\w+@\w+\.\w+\b`)

	normalized := re1.ReplaceAllString(msg, "XXX")
	normalized = re2.ReplaceAllString(normalized, "UUID")
	normalized = re3.ReplaceAllString(normalized, "EMAIL")

	return normalized
}

func (la *LogAnalyzer) performAIAnalysis(entries []LogEntry, analysis *LogAnalysis) error {
	// Prepare sample of entries for AI analysis
	sampleSize := 50
	if len(entries) < sampleSize {
		sampleSize = len(entries)
	}

	sample := entries[len(entries)-sampleSize:] // Last N entries

	template := prompts.NewPromptTemplate(`
You are an expert system administrator analyzing application logs. Based on the log data provided, identify:

1. **Anomalies**: Unusual patterns, spikes, or unexpected behaviors
2. **Recommendations**: Specific actions to improve system reliability
3. **Critical Issues**: Problems requiring immediate attention

Log Summary:
- Total Entries: {{.total_entries}}
- Errors: {{.error_count}}
- Warnings: {{.warning_count}}
- Time Range: {{.time_range}}

Top Error Patterns:
{{range .top_errors}}
- {{.pattern}} ({{.count}} occurrences)
{{end}}

Recent Log Sample:
{{range .sample}}
{{.timestamp}} [{{.level}}] {{.message}}
{{end}}

Respond in JSON format:
{
  "anomalies": [
    {
      "type": "error_spike|performance|security|other",
      "description": "What was detected",
      "severity": "critical|high|medium|low",
      "examples": ["example log entries"]
    }
  ],
  "recommendations": [
    "Specific actionable recommendations"
  ]
}`, []string{"total_entries", "error_count", "warning_count", "time_range", "top_errors", "sample"})

	sampleData := make([]map[string]string, len(sample))
	for i, entry := range sample {
		sampleData[i] = map[string]string{
			"timestamp": entry.Timestamp.Format(time.RFC3339),
			"level":     entry.Level,
			"message":   entry.Message,
		}
	}

	prompt, err := template.Format(map[string]any{
		"total_entries": analysis.TotalEntries,
		"error_count":   analysis.ErrorCount,
		"warning_count": analysis.WarningCount,
		"time_range":    fmt.Sprintf("%s to %s", analysis.TimeRange.Start.Format(time.RFC3339), analysis.TimeRange.End.Format(time.RFC3339)),
		"top_errors":    analysis.TopErrors,
		"sample":        sampleData,
	})
	if err != nil {
		return fmt.Errorf("formatting prompt: %w", err)
	}

	ctx := context.Background()
	response, err := la.llm.GenerateContent(ctx, []llms.MessageContent{
		llms.TextParts(llms.ChatMessageTypeHuman, prompt),
	}, llms.WithJSONMode())
	if err != nil {
		return fmt.Errorf("generating analysis: %w", err)
	}

	var aiResult struct {
		Anomalies       []Anomaly `json:"anomalies"`
		Recommendations []string  `json:"recommendations"`
	}

	if err := json.Unmarshal([]byte(response.Choices[0].Content), &aiResult); err != nil {
		return fmt.Errorf("parsing AI response: %w", err)
	}

	analysis.Anomalies = aiResult.Anomalies
	analysis.Recommendations = aiResult.Recommendations

	return nil
}
func (la *LogAnalysis) PrintReport() {
	fmt.Printf("📊 Log Analysis Report\n")
	fmt.Printf("=====================\n\n")

	fmt.Printf("📈 Summary:\n")
	fmt.Printf("  Total Entries: %d\n", la.TotalEntries)
	fmt.Printf("  Errors: %d\n", la.ErrorCount)
	fmt.Printf("  Warnings: %d\n", la.WarningCount)
	fmt.Printf("  Time Range: %s to %s\n\n",
		la.TimeRange.Start.Format("2006-01-02 15:04:05"),
		la.TimeRange.End.Format("2006-01-02 15:04:05"))

	if len(la.TopErrors) > 0 {
		fmt.Printf("🔴 Top Error Patterns:\n")
		for i, pattern := range la.TopErrors {
			if i >= 5 {
				break
			}
			fmt.Printf("  %d. %s (%d occurrences)\n", i+1, pattern.Pattern, pattern.Count)
		}
		fmt.Println()
	}

	if len(la.Anomalies) > 0 {
		fmt.Printf("⚠️  Detected Anomalies:\n")
		for _, anomaly := range la.Anomalies {
			fmt.Printf("  %s - %s (%s)\n", anomaly.Type, anomaly.Description, anomaly.Severity)
		}
		fmt.Println()
	}

	if len(la.Recommendations) > 0 {
		fmt.Printf("💡 Recommendations:\n")
		for i, rec := range la.Recommendations {
			fmt.Printf("  %d. %s\n", i+1, rec)
		}
		fmt.Println()
	}
}

func main() {
	var (
		file   = flag.String("file", "", "Log file to analyze")
		output = flag.String("output", "", "Output file for JSON report")
		watch  = flag.Bool("watch", false, "Watch file for changes")
	)
	flag.Parse()

	if *file == "" {
		fmt.Println("Usage: log-analyzer -file=application.log")
		os.Exit(1)
	}

	analyzer, err := NewLogAnalyzer()
	if err != nil {
		log.Fatal(err)
	}

	if *watch {
		// Watch mode - simplified version
		fmt.Printf("👀 Watching %s for changes...\n", *file)
		for {
			if err := analyzeFile(analyzer, *file, *output); err != nil {
				log.Printf("Analysis error: %v", err)
			}
			time.Sleep(30 * time.Second)
		}
	} else {
		if err := analyzeFile(analyzer, *file, *output); err != nil {
			log.Fatal(err)
		}
	}
}
func analyzeFile(analyzer *LogAnalyzer, filename, outputFile string) error {
	fmt.Printf("🔍 Analyzing %s...\n", filename)

	entries, err := analyzer.ParseLogFile(filename)
	if err != nil {
		return fmt.Errorf("parsing log file: %w", err)
	}

	analysis, err := analyzer.AnalyzeLogs(entries)
	if err != nil {
		return fmt.Errorf("analyzing logs: %w", err)
	}

	analysis.PrintReport()

	if outputFile != "" {
		data, err := json.MarshalIndent(analysis, "", "  ")
		if err != nil {
			return fmt.Errorf("marshaling report: %w", err)
		}

		if err := os.WriteFile(outputFile, data, 0644); err != nil {
			return fmt.Errorf("writing report: %w", err)
		}
		fmt.Printf("📄 Report saved to %s\n", outputFile)
	}

	return nil
}
