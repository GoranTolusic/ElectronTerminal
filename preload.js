const { contextBridge, ipcRenderer } = require('electron/renderer')
let commandHistory = []
let currentIndex = -1

contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (command) => ipcRenderer.send('execute-command', command),
  listener: (setOutput) => {
    ipcRenderer.on('output', (event, data) => {
      setOutput(data)
    })
  },
  executeCommand: () => {
    const inputElement = document.getElementById('commandInput')
    const commandInputValue = inputElement.value.trim()
    if (commandInputValue) {
      ipcRenderer.send('execute-command', commandInputValue)
      inputElement.value = ''
      commandHistory.push(commandInputValue)
      currentIndex = commandHistory.length - 1
    }
  },
  showNextCommand: () => {
    const inputElement = document.getElementById('commandInput')
    if (currentIndex < commandHistory.length - 1) {
      currentIndex++
      inputElement.value = commandHistory[currentIndex]
    } else {
      inputElement.value = ''
    }
  },
  showPreviousCommand: () => {
    const inputElement = document.getElementById('commandInput')
    if (currentIndex >= 0) {
      inputElement.value = commandHistory[currentIndex]
      currentIndex--
    }
  }
})