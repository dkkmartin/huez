export async function getHueKey(IP: string) {
  let headersList = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  let bodyContent = JSON.stringify({
    devicetype: 'app_name#instance_name',
    generateclientkey: true,
  });

  try {
    const response = await fetch(`http://${IP}/api`, {
      method: 'POST',
      body: bodyContent,
      headers: headersList,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
