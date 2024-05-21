const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');
const dotenv = require('dotenv');
dotenv.config();


const mainWindow = () => new BrowserWindow({
  width: 1200,
  height: 800,
  webPreferences: {
    nodeIntegration: true,
    preload: path.join(__dirname, 'preload.js')
  }
});

function parseCommand(command) {
  return command.split(" ").map((item) => {
    switch (item) {
      case 'sudo':
        item = `echo "${process.env.SUDO_PASSWORD || 1234}" | sudo -S`
        break;
      case 'clear':
        //something
        break;  
      case 'cd':
        //something
        break;
      case 'exit':
        //something
        break;
      default:
        item = item
    }
    return item
  }).join(" ")
}

async function executeCommand(command) {
  return await new Promise((resolve) => {
    exec(command, async (error, stdout, stderr) => {
      let output
      output = stderr || stdout
      resolve(output)
    });
  })
}

function formatOutput(output, whoami, command) {
  return {
    meta: {
      timestamp: Date.now(),
      user: whoami,
      command: command
    },
    output: output + '\n'
  }
}

async function createWindow() {
  const whoami = await executeCommand('whoami')
  const mw = mainWindow();
  mw.loadFile(path.join(__dirname, 'build', 'index.html'));

  ipcMain.on('execute-command', async (event, command) => {
    const output = await executeCommand(parseCommand(command));
    const formatedOutput = formatOutput(output, whoami, command)
    mw.webContents.send('output', formatedOutput)
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
