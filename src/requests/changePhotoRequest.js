const changePhotoRequest = async (event, callback) => {
  try {
    const { photo, token, myName } = { ...event }
    const response = await fetch("/CHANGEPHOTO", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token,
      },
      method: "POST",
      body: JSON.stringify({ photo, myName }),
    })
    const answer = await response.json()
    return callback({ type: "SUCCESS", photo: answer.photo })
  } catch (error) {
    callback("NETWORKERROR")
  }
}

export default changePhotoRequest
