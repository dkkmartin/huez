export async function getHueKey(IP: string) {
  let headersList = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  let bodyContent = JSON.stringify({
    devicetype: 'app_name#instance_name',
    generateclientkey: true,
  })

  try {
    const response = await fetch(`http://${IP}/api`, {
      method: 'POST',
      body: bodyContent,
      headers: headersList,
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}

// DEVICE --------------------------------------

export async function getDevices(IP: string, key: string) {
  try {
    const response = await fetch(`http://localhost:3000/${IP}/${key}/devices`, {
      method: 'POST',
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function getDeviceInfo(IP: string, key: string, ID: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/${IP}/${key}/${ID}/device`
    )

    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function changeColor(
  IP: string,
  key: string,
  ID: string,
  hex: string
) {
  let bodyContent = JSON.stringify({
    color: hex,
  })

  let headersList = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  try {
    const response = await fetch(
      `http://localhost:3000/${IP}/${key}/${ID}/color`,
      {
        method: 'POST',
        body: bodyContent,
        headers: headersList,
      }
    )

    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function changeBrightness(
  IP: string,
  key: string,
  ID: string,
  brightness: number
) {
  let bodyContent = JSON.stringify({
    brightness: brightness,
  })

  let headersList = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  try {
    const response = await fetch(
      `http://localhost:3000/${IP}/${key}/${ID}/brightness`,
      {
        method: 'POST',
        body: bodyContent,
        headers: headersList,
      }
    )

    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function getBrightness(IP: string, key: string, ID: string) {
  let headersList = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  try {
    const response = await fetch(
      `http://localhost:3000/${IP}/${key}/${ID}/check-brightness`,
      {
        method: 'GET',
        headers: headersList,
      }
    )

    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}

// ROOM, GROUPS --------------------------------------------------

export async function changeRoomBrightness(
  IP: string,
  key: string,
  ID: string,
  brightness: number
) {
  let bodyContent = JSON.stringify({
    brightness: brightness,
  })

  let headersList = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  try {
    const response = await fetch(
      `http://localhost:3000/${IP}/${key}/${ID}/room/brightness`,
      {
        method: 'POST',
        body: bodyContent,
        headers: headersList,
      }
    )

    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function changeRoomColor(
  IP: string,
  key: string,
  ID: string,
  hex: string
) {
  let bodyContent = JSON.stringify({
    color: hex,
  })

  let headersList = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  try {
    const response = await fetch(
      `http://localhost:3000/${IP}/${key}/${ID}/room/color`,
      {
        method: 'POST',
        body: bodyContent,
        headers: headersList,
      }
    )

    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function getRooms(IP: string, key: string) {
  let headersList = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  try {
    const response = await fetch(`http://localhost:3000/${IP}/${key}/rooms`, {
      method: 'GET',
      headers: headersList,
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function getGroupedLights(IP: string, key: string) {
  let headersList = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  try {
    const response = await fetch(
      `http://localhost:3000/${IP}/${key}/grouped_light`,
      {
        method: 'GET',
        headers: headersList,
      }
    )

    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function getGroupedLight(IP: string, key: string, ID: string) {
  let headersList = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  try {
    const response = await fetch(
      `http://localhost:3000/${IP}/${key}/grouped_light/${ID}`,
      {
        method: 'GET',
        headers: headersList,
      }
    )

    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function getRoom(IP: string, key: string, ID: string) {
  let headersList = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  try {
    const response = await fetch(
      `http://localhost:3000/${IP}/${key}/room/${ID}`,
      {
        method: 'GET',
        headers: headersList,
      }
    )

    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}
