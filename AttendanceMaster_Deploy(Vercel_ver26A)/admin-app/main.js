const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 850,
        title: "프리미엄 근태관리 시스템 - 관리자 앱",
        icon: path.join(__dirname, '../icon.png'), // 아이콘이 있다면 연결
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js') // 필요 시 추가
        }
    });

    // 메뉴바 숨기기 (또는 커스텀 메뉴 구성)
    // Menu.setApplicationMenu(null);

    win.loadFile('admin.html');

    // 개발자 도구 (필요시 활성화)
    // win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
