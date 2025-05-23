const fs = require('fs')
const path = require('path')
const logger = require('../logger')
const api = require('./axios')

const mediaDir = path.join(__dirname, '../media')

// Comprobar si la carpeta existe, si no, crearla
if (!fs.existsSync(mediaDir)) {
  fs.mkdirSync(mediaDir)
}

const file = path.join(mediaDir, 'list.json')

// Función para obetener la lista de JSON y guardarla en un archivo
async function fetchAndSaveList () {
  try {
    const { data } = await api.get('/')
    await fs.promises.writeFile(file, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Error downloading JSON:', error)
  }
}

async function saveImage (mainWindow) {
  try {
    const raw = fs.readFileSync(file, 'utf8') // Leemos el archivo JSON
    const images = JSON.parse(raw) // Parseamos el JSON a string

    // Recorrer la lista de imágenes
    for (const img of images) {
      const url = img.download_url // URL de la imagen que vamos a descargar
      const filename = `${img.id}.png` // Nombre del archivo de la imagen
      const filePath = path.join(mediaDir, filename) // Ruta donde se guardará la imagen

      logger.info(`Download start: ${filename}`) // Log de inicio de descarga

      try {
        const response = await api.get(url, { responseType: 'stream' }) // Especificar que la respuesta es un stream
        const writer = fs.createWriteStream(filePath) // Archvio donde crear la imagen
        response.data.pipe(writer) // Guardar la imagen en el archivo

        // Esperar a que se termine de escribir el archivo para pasar a la siguiente imagen
        await new Promise((resolve, reject) => {
          writer.on('finish', () => {
            const fullPath = path.join(mediaDir, filename) // Ruta completa de la imagen
            mainWindow.webContents.send('new-image', fullPath) // Enviar la ruta de la imagen al renderer
            mainWindow.webContents.send('log-from-main', `Saved image: ${filename}`) // Enviar mensaje al renderer
            logger.info(`Descarga completada: ${filename}`)
            resolve() // Resolver la promesa
          })

          // Manejar errores al guardar la imagen
          writer.on('error', (err) => {
            logger.error(`Error saving image: ${filename} - ${err.message}`)
            mainWindow.webContents.send('log-from-main', `Saving error ${filename}: ${err.message}`)
            reject(err)
          })
        })
      } catch (error) {
        // Manejar errores al descargar la imagen
        mainWindow.webContents.send('log-from-main', `Error downloading ${filename}: ${error.message}`)
        logger.error(`Error downloading ${filename}: ${error.message}`)
      }
    }
  } catch (error) {
    // Manejar errores al leer el archivo JSON
    mainWindow.webContents.send('log-from-main', `General error: ${error.message}`)
    logger.error(`General error: ${error.message}`)
  }
}

module.exports = { fetchAndSaveList, saveImage }
