const updateRequest = async (event, callback) => {
  try {
    const { token } = { ...event }
    const response = await fetch("/UPDATE", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token,
      },
      method: "GET",
    })
    const answer = await response.json()
    return callback({ type: "DATARECIEVED", contacts: answer.contacts, chats: answer.chats, photo: answer.photo })
  } catch (error) {
    callback("NETWORKERROR")
  }
}

export default updateRequest
