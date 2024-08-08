const express = require('express')
const axios = require('axios')
const https = require('https')
const cors = require('cors')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

const BRIDGE_IP = 'http://192.168.8.100'
const API_KEY = 'QeS0ULr6BoDhbcIQm40gvl8VqlqlVLc6T6AfXguU'

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
})

app.put('/lights/:id/toggle', async (req, res) => {
  const lightId = req.params.id
  const { on } = req.body

  try {
    const response = await axiosInstance.put(
      `https://${BRIDGE_IP}/clip/v2/resource/light/${lightId}`,
      { on: { on: on } },
      { headers: { 'hue-application-key': API_KEY } }
    )
    res.json(response.data)
  } catch (error) {
    res
      .status(500)
      .json({ error: error.response ? error.response.data : error.message })
  }
})

// List devices on bridge
app.post('/:ip/:key/devices', async (req, res) => {
  const bridgeIP = req.params.ip
  const key = req.params.key

  try {
    const response = await axiosInstance.get(
      `https://${bridgeIP}/clip/v2/resource/device`,
      { headers: { 'hue-application-key': key } }
    )

    res.json(response.data)
  } catch (error) {
    res
      .status(500)
      .json({ error: error.response ? error.response.data : error.message })
  }
})

app.put('/lights/:id/brightness', async (req, res) => {
  const lightId = req.params.id
  const { brightness } = req.body

  try {
    const response = await axiosInstance.put(
      `https://${BRIDGE_IP}/clip/v2/resource/light/${lightId}`,
      { bri: Math.round((brightness / 100) * 254) },
      { headers: { 'hue-application-key': API_KEY } }
    )
    res.json(response.data)
  } catch (error) {
    res
      .status(500)
      .json({ error: error.response ? error.response.data : error.message })
  }
})

// Route to change color
app.put('/lights/:id/color', async (req, res) => {
  const lightId = req.params.id
  const { color } = req.body

  try {
    const xyColor = hexToXY(color)
    const response = await axiosInstance.put(
      `https://${BRIDGE_IP}/clip/v2/resource/light/${lightId}`,
      { xy: xyColor },
      { headers: { 'hue-application-key': API_KEY } }
    )
    res.json(response.data)
  } catch (error) {
    res
      .status(500)
      .json({ error: error.response ? error.response.data : error.message })
  }
})

const hexToXY = (hex) => {
  const rgb = hexToRgb(hex)
  const red = rgb.r / 255
  const green = rgb.g / 255
  const blue = rgb.b / 255

  const r = red > 0.04045 ? Math.pow((red + 0.055) / 1.055, 2.4) : red / 12.92
  const g =
    green > 0.04045 ? Math.pow((green + 0.055) / 1.055, 2.4) : green / 12.92
  const b =
    blue > 0.04045 ? Math.pow((blue + 0.055) / 1.055, 2.4) : blue / 12.92

  const x = r * 0.649926 + g * 0.103455 + b * 0.197109
  const y = r * 0.234327 + g * 0.743075 + b * 0.022598
  const z = r * 0.0 + g * 0.053077 + b * 1.035763

  const xy = { x: x / (x + y + z), y: y / (x + y + z) }
  return [xy.x, xy.y]
}

const hexToRgb = (hex) => {
  const bigint = parseInt(hex.slice(1), 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return { r, g, b }
}

app.listen(port, () => {
  console.log(`Hue server running at http://localhost:${port}`)
})
