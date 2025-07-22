import { app, BrowserWindow, screen, powerSaveBlocker } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
// 获取 __dirname 的等价写法
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.commandLine.appendSwitch('disable-background-media-suspend'); //防止音频/视频在后台时被系统或 Chromium 暂停。
app.commandLine.appendSwitch('disable-background-timer-throttling'); //防止后台 setTimeout、setInterval 被节流，避免影响定时播放等逻辑。
app.commandLine.appendSwitch('disable-renderer-backgrounding'); //阻止渲染进程进入低功耗模式。
app.commandLine.appendSwitch('disable-backgrounding-occluded-windows'); //禁用对“被遮挡的窗口”的降级行为（即最小化或被其他窗口遮挡时）。
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required'); // 允许音视频在无用户操作下自动播放。
const createWindow = () => {
	const { width, height } = screen.getPrimaryDisplay().workAreaSize;
	const win = new BrowserWindow({
		width: Math.floor(width * 0.8),
		height: Math.floor(height * 0.8),
		webSecurity: false, // 禁用同源策略，慎用！
		visibleOnAllWorkspaces: true, // 在所有虚拟桌面都可见，防止在 macOS/Linux 下窗口“隐身”被判断为后台。
		webPreferences: {
			backgroundThrottling: false // 不限制后台播放
		}
	});

	win.loadFile(path.join(__dirname, '../dist/index.html'));
	win.webContents.openDevTools();
};

app.whenReady().then(() => {
	powerSaveBlocker.start('prevent-app-suspension');
	createWindow();
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});
