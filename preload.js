const { contextBridge, ipcRenderer } = require('electron')

// Creamos un puente entre el proceso principal y el proceso de renderizado
contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (data) => ipcRenderer.send('message-from-renderer', data), // Enviamos un mensaje al proceso principal
  receiveResponse: (callback) => ipcRenderer.on('response-from-main', (event, data) => callback(data)), // Recibimos la respuesta del proceso principal
  receiveLog: (callback) => ipcRenderer.on('log-from-main', (event, data) => callback(data)), // Recibimos el log del proceso principal
  receiveNewImage: (callback) => ipcRenderer.on('new-image', (event, data) => callback(data)) // Recibimos la nueva imagen del proceso principal
})
