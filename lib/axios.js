const axios = require('axios')

const api = axios.create({
  baseURL: 'https://picsum.photos/v2/list'
})

module.exports = api
