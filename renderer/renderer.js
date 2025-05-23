const $ = selector => document.querySelector(selector)
const $imageElement = $('#views')
const $filename = $('#filename')
let index = 0
const imageFiles = []
let intervalStarted = false

// Recibir mensaje de main
window.electronAPI.receiveNewImage((filePath) => {
  imageFiles.push(filePath)

  // Ejecutar la función al obtener la primera imagen
  if (imageFiles.length === 1) {
    showImage()
  }

  // Mostrar las imágenes cada 10 segundos
  // Si no se ha iniciado el intervalo, lo iniciamos
  if (!intervalStarted) {
    setInterval(showImage, 10000)
    intervalStarted = true
  }
})

// Recibir los mensajes del log
window.electronAPI.receiveLog((message) => {
  console.log('[MAIN LOG]', message)
})

// Enviar mensaje al main
window.electronAPI.sendMessage('request-images')

// Mostrar la imagen
const showImage = () => {
  const imagePath = `file://${imageFiles[index % imageFiles.length]}`
  $imageElement.src = imagePath
  $filename.textContent = imagePath.split(/[\\/]/).pop() // Extraer el nombre del archivo de la ruta

  console.log('Showing image:', imagePath.split(/[\\/]/).pop())

  index++
}
