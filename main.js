const { app, BrowserWindow, ipcMain } = require('electron')
const logger = require('./logger')
const fs = require('fs')
const path = require('path')
const { fetchAndSaveList, saveImage } = require('./lib/mediaUtils')

const mediaDir = path.join(__dirname, 'media')

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    fullscreen: true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  mainWindow.loadFile(path.join(__dirname, '/renderer/index.html'))
  mainWindow.webContents.openDevTools()

  mainWindow.webContents.on('did-finish-load', async () => {
    await fetchAndSaveList()
    await saveImage(mainWindow)
  })
}

ipcMain.on('message-from-renderer', (event, data) => {
  console.log('Message from renderer:', data)

  const imageFiles = fs.readdirSync(mediaDir)
    .filter(file => file.endsWith('.png'))
    .sort((a, b) => Number(a.split('.')[0]) - Number(b.split('.')[0]))

  event.reply('response-from-main', imageFiles.map(name => path.join(mediaDir, name)))
})

// Manejar el evento al iniciar la aplicación
app.whenReady().then(() => {
  logger.info('Application started')
  createWindow()
})

// Manejar el evento de cierre de la aplicación
app.on('window-all-closed', () => {
  logger.info('Application finished')
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
