# Visor de Imágenes Aleatorias con Electron

Esta es una aplicación de escritorio desarrollada con **Electron** y **Node.js** que descarga imágenes desde una API pública y las reproduce en bucle. También guarda logs por día y organiza los archivos descargados localmente.

---

## 📦 Requisitos Previos

Antes de ejecutar la aplicación, asegúrate de tener instalado:

- Node.js (versión 14 o superior)
- npm (Node Package Manager)

---

## 🚀 Instalación

Clona este repositorio y navega al directorio del proyecto:

```bash
git clone https://github.com/tuusuario/tu-repo.git
cd tu-repo
```

Instala las dependencias necesarias:

```bash
npm install
```

---

## 🧪 Ejecutar en modo desarrollo

Para lanzar la aplicación en modo desarrollo:

```bash
npx run dev
```

La ventana se abrirá en modo pantalla completa y sin borde. Las imágenes comenzarán a descargarse automáticamente desde la API `https://picsum.photos/v2/list` y se mostrarán una por una cada 10 segundos.

## 📂 Estructura de Carpetas

```bash
.
├── media/                 # Carpeta donde se guardan las imágenes descargadas
├── logs/                  # Archivos de log por fecha
├── lib/
│   ├── axios.js           # Cliente API de Axios
│   └── mediaUtils.js      # Funciones para descargar y guardar imágenes
├── renderer/
│   └── index.html         # Interfaz gráfica
│   └── renderer.js        # Actualizar UI
│   └── style.css          # Estilos UI
├── preload.js             # Exposición segura del API de Electron
├── main.js                # Proceso principal de Electron
├── logger.js              # Logger personalizado
├── __tests__
│   └── mediaUtils.test.js # Pruebas con Jest
```

## 🧪 Testing

Para ejecutar los tests unitarios con Jest:

```bash
npm test
```

## 👨‍💻 Autor

Desarrollado por [Tu Nombre].
