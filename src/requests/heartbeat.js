const heartbeat = async (event) => {
  const { token } = event
  fetch("/HEARTBEAT", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      token,
    },
    method: "POST",
  })
}

export default heartbeat
