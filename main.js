const {app, BrowserWindow, ipcMain} = require('electron');
const ipc = ipcMain;
const {exec} = require('child_process');

let win;
let result = '';

setInterval(spawn, 250);

function createWindow() {
  win = new BrowserWindow({
    width: 0,
    height: 0,
    transparent: true,
    thickFrame: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  
  console.log(win.getBounds());
  win.setIgnoreMouseEvents(false);
  win.removeMenu();
  win.setResizable(false);
  win.setAlwaysOnTop(true, 'screen');
  win.loadFile('index.html');
  // win.setIgnoreMouseEvents(true, { forward: true });
  // win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();
  }
)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
})
let child;

function spawn() {
  let child = exec('ping 8.8.8.8 -n 1').stdout.on('data', function (data) {
    // console.log(data);
    try {
      result += data;
      result = String(data);
      // console.log(result);
      let startString = "Zeit=";
      let start = result.lastIndexOf(startString) + startString.length;
      let endString = "ms TTL=";
      let end = result.lastIndexOf(endString);
      lossString = 'Zeitüberschreitung der Anforderung.';
      let loss = result.lastIndexOf(lossString)
      if (loss !== -1) {
        win.webContents.send('update-notify-value', "Packetloss");
        // console.log(data);
      } else {
        if ((start !== -1) && (end !== -1)) {
          data = data.slice(start, end);
          win.webContents.send('update-notify-value', data);
          // console.log(data);
        }

      }

    } catch (err) {
      console.log(err);
    }

  });
}

let oldX = 0;
let oldY = 0;
ipc.on('resize', (event, x, y) => {
  if (oldX != x || oldY != y ){
    win.setResizable(true);
    win.setBounds(width = x, height = y);
    win.setSize(x, y);
    // console.log(x,y);
    win.setResizable(false);
  }
  oldX = x;
  oldY = y;

})