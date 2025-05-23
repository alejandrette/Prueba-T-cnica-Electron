const fs = require('fs')
const path = require('path')

const logsDir = path.join(__dirname, 'logs')
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir)
}

// Obtener nombre de archivo segun el dia
const getLogFileName = () => {
  const date = new Date()
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return path.join(logsDir, `${year}-${month}-${day}.txt`)
}

// Formato mensaje
const formatMessage = (level, message) => {
  const now = new Date()
  const date = now.toISOString().split('T')[0]
  const time = now.toTimeString().split(' ')[0]
  return `[${date} ${time}] [${level}] ${message}\n`
}

// Guardar mensaje en el archivo
const saveLog = (level, message) => {
  const logFileName = getLogFileName()
  const formattedMessage = formatMessage(level, message)
  fs.appendFile(logFileName, formattedMessage, (err) => {
    if (err) {
      console.error('Error writing to log file:', err)
    }
  })
}

// Exportar funciones para registrar mensajes
module.exports = {
  info: (message) => {
    saveLog('INFO', message)
  },
  error: (message) => {
    saveLog('ERROR', message)
  },
  warn: (message) => {
    saveLog('WARN', message)
  }
}
