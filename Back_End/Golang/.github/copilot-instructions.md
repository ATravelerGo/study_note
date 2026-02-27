# AI Coding Instructions for Golang Study Notes

This repository is not a traditional service or library. It is a collection of small Go exercises used for personal study.

## Big picture

- All source files live under `src/` and each one is a standalone `package main` program.
- Filenames are numbered (`1.数组.go`, `2.goroutine.go` etc.) and contain Chinese characters. Treat them as examples — the AI should not invent new package structure or import paths.
- There is no `go.mod` or build system; compiling is done with `go run` or `go build` directly on the file. E.g.:
  ```sh
  go run src/4.个人信息管理系统练习.go
  ```
- The code demonstrates basic language features: arrays vs slices, simple goroutine wrappers, concurrency ordering, and a small `PersonInfo` struct with validation helpers.
- Patterns to notice:
  * Validation helper functions (`IsValidEmail`, `IsValidPhone`, `IsValidAge`) return bool and use `regexp.MustCompile`.
  * Methods with pointer receivers (`displayPersonInfo`, `updateAge`) operate on `PersonInfo`.
  * Error handling uses the standard `errors.New` and returning `error` values.

## Developer workflows

- There are no tests or CI. To experiment, run or build individual files as above.
- Use `go fmt` to format the files if modifying them.
- Since the project lives on Windows, path quoting may be required for filenames with spaces or non‑ASCII characters.

## Conventions and patterns

- No external dependencies beyond the standard library (`fmt`, `errors`, `regexp`, `time` for the goroutine example).
- Keep the code very simple; do not introduce packages or modules unless explicitly asked by the user.
- When adding new examples, follow the existing naming scheme and place them under `src/`.
- Error messages are simple, hard‑coded strings (e.g. "invalid age").

## Integration points

- There are no network calls, databases, or external services. All logic is in-memory.

## Guidance for the AI agent

- **Stay minimal.** Any additions should respect the educational nature of the repo.
- **Refer to existing examples.** If asked to extend functionality, mirror the style and file structure seen in the current `.go` files.
- **Do not assume build scripts or tests exist.** If asked to add tests, create new files manually and use the standard `testing` package.
- **Be mindful of Chinese characters in filenames.** Use proper quoting in commands and editor operations.

> _If you are unsure what to do next, ask the user for clarification—this repository is primarily an exercise playground._
