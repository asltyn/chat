const subscribe = async (event, callback) => {
  try {
    const { token } = { ...event }
    const response = await fetch("/SUBSCRIBE", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token,
      },
      method: "POST",
    })
    const reader = response.body.getReader()

    while (true) {
      const { value } = await reader.read()
      const { message } = JSON.parse(String.fromCharCode.apply(null, value))
      switch (message) {
        case "subscribed":
          callback("SUBSCRIBED")
          break
        case "heartbeat":
          callback("HEARTBEAT")
          break
        case "update":
          callback("UPDATE")
          break
        default:
          break
      }
    }
  } catch (error) {
    callback("NETWORKERROR")
  }
}

export default subscribe
