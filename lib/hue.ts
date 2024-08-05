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

export async function getDevices(IP: string, key: string) {
  let headersList = {
    'hue-application-key': key,
    'Content-Type': 'application/json',
  }

  try {
    const response = await fetch(`https://${IP}/clip/v2/resource/device`, {
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
