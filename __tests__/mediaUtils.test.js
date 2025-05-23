const fs = require('fs')
const path = require('path')
const { fetchAndSaveList } = require('../lib/mediaUtils')
const api = require('../lib/axios')

jest.mock('fs')
jest.mock('../lib/axios', () => ({
  get: jest.fn()
}))
jest.mock('../logger', () => ({
  info: jest.fn(),
  error: jest.fn()
}))

describe('fetchAndSaveList', () => {
  const mediaDir = path.join(__dirname, '../lib/media')
  const listPath = path.join(mediaDir, 'list.json')

  beforeEach(() => {
    jest.resetAllMocks()
    fs.existsSync.mockReturnValue(false)
    fs.mkdirSync.mockImplementation(() => { })
    fs.promises = { writeFile: jest.fn() }
  })

  it('you must create the directory and save the JSON', async () => {
    const mockData = [{ id: 1, download_url: 'https://example.com/1.png' }]
    api.get.mockResolvedValue({ data: mockData })

    await fetchAndSaveList()

    expect(fs.mkdirSync).toHaveBeenCalledWith(mediaDir)
    expect(fs.promises.writeFile).toHaveBeenCalledWith(
      listPath,
      JSON.stringify(mockData, null, 2)
    )
  })
})
