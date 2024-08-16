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

// Toggle device
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
    console.error(error) // Log the error for debugging
    res
      .status(500)
      .json({ error: error.response ? error.response.data : error.message })
  }
})

// Change deivce brightness
app.post('/:ip/:key/:id/brightness', async (req, res) => {
  const bridgeIP = req.params.ip
  const key = req.params.key
  const lightId = req.params.id
  const { brightness } = req.body

  try {
    const response = await axiosInstance.put(
      `https://${bridgeIP}/clip/v2/resource/light/${lightId}`,
      {
        dimming: {
          brightness: Number(brightness),
        },
      },
      { headers: { 'hue-application-key': key } }
    )
    res.json(response.data)
  } catch (error) {
    res
      .status(500)
      .json({ error: error.response ? error.response.data : error.message })
  }
})

// Check deivce brightness
app.get('/:ip/:key/:id/check-brightness', async (req, res) => {
  const bridgeIP = req.params.ip
  const key = req.params.key
  const lightId = req.params.id

  try {
    const response = await axiosInstance.get(
      `https://${bridgeIP}/clip/v2/resource/light/${lightId}`,

      { headers: { 'hue-application-key': key } }
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
    console.error(error) // Log the error for debugging
    res
      .status(500)
      .json({ error: error.response ? error.response.data : error.message })
  }
})

// List device information
app.get('/:ip/:key/:id/device', async (req, res) => {
  const bridgeIP = req.params.ip
  const key = req.params.key
  const lightId = req.params.id

  try {
    const response = await axiosInstance.get(
      `https://${bridgeIP}/clip/v2/resource/device/${lightId}`,
      { headers: { 'hue-application-key': key } }
    )

    res.json(response.data)
  } catch (error) {
    res
      .status(500)
      .json({ error: error.response ? error.response.data : error.message })
  }
})

// Get all rooms
app.get('/:ip/:key/rooms', async (req, res) => {
  const bridgeIP = req.params.ip
  const key = req.params.key

  try {
    const response = await axiosInstance.get(
      `https://${bridgeIP}/clip/v2/resource/room`,
      { headers: { 'hue-application-key': key } }
    )
    res.json(response.data)
  } catch (error) {
    res
      .status(500)
      .json({ error: error.response ? error.response.data : error.message })
  }
})

// Get one room
app.get('/:ip/:key/room/:id', async (req, res) => {
  const bridgeIP = req.params.ip
  const key = req.params.key
  const roomId = req.params.id

  try {
    const response = await axiosInstance.get(
      `https://${bridgeIP}/clip/v2/resource/room/${roomId}`,
      { headers: { 'hue-application-key': key } }
    )
    res.json(response.data)
  } catch (error) {
    res
      .status(500)
      .json({ error: error.response ? error.response.data : error.message })
  }
})

// Get all grouped_light
app.get('/:ip/:key/grouped_light', async (req, res) => {
  const bridgeIP = req.params.ip
  const key = req.params.key

  try {
    const response = await axiosInstance.get(
      `https://${bridgeIP}/clip/v2/resource/grouped_light`,
      { headers: { 'hue-application-key': key } }
    )
    res.json(response.data)
  } catch (error) {
    res
      .status(500)
      .json({ error: error.response ? error.response.data : error.message })
  }
})

// Get grouped_light info
app.get('/:ip/:key/grouped_light/:id', async (req, res) => {
  const bridgeIP = req.params.ip
  const key = req.params.key
  const groupId = req.params.id

  try {
    const response = await axiosInstance.get(
      `https://${bridgeIP}/clip/v2/resource/grouped_light/${groupId}`,
      { headers: { 'hue-application-key': key } }
    )
    res.json(response.data)
  } catch (error) {
    res
      .status(500)
      .json({ error: error.response ? error.response.data : error.message })
  }
})

// Change gropued_light color
app.post('/:ip/:key/:id/room/color', async (req, res) => {
  const bridgeIP = req.params.ip
  const key = req.params.key
  const groupId = req.params.id
  const { color } = req.body

  try {
    const xyColor = hexToXY(color)
    const response = await axiosInstance.put(
      `https://${bridgeIP}/clip/v2/resource/grouped_light/${groupId}`,
      {
        color: {
          xy: {
            x: xyColor[0],
            y: xyColor[1],
          },
        },
      },
      { headers: { 'hue-application-key': key } }
    )
    res.json(response.data)
  } catch (error) {
    res
      .status(500)
      .json({ error: error.response ? error.response.data : error.message })
  }
})

// Change group brightness
app.post('/:ip/:key/:id/room/brightness', async (req, res) => {
  const bridgeIP = req.params.ip
  const key = req.params.key
  const groupId = req.params.id
  const { brightness } = req.body

  try {
    const response = await axiosInstance.put(
      `https://${bridgeIP}/clip/v2/resource/grouped_light/${groupId}`,
      {
        dimming: {
          brightness: Number(brightness),
        },
      },
      { headers: { 'hue-application-key': key } }
    )
    res.json(response.data)
  } catch (error) {
    res
      .status(500)
      .json({ error: error.response ? error.response.data : error.message })
  }
})

// Change device color
app.post('/:ip/:key/:id/color', async (req, res) => {
  const bridgeIP = req.params.ip
  const key = req.params.key
  const lightId = req.params.id
  const { color } = req.body

  try {
    const xyColor = hexToXY(color)
    const response = await axiosInstance.put(
      `https://${bridgeIP}/clip/v2/resource/light/${lightId}`,
      {
        color: {
          xy: {
            x: xyColor[0],
            y: xyColor[1],
          },
        },
      },
      { headers: { 'hue-application-key': key } }
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
