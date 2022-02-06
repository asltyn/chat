const addContactRequest = async (event, callback) => {
  try {
    const { token, addingContact } = { ...event }
    const response = await fetch("/ADDCONTACT", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token,
      },
      method: "POST",
      body: JSON.stringify({ addingContact }),
    })
    const answer = await response.json()
    return answer.name ? callback("OK") : callback("ERROR")
  } catch (error) {
    callback("NETWORKERROR")
  }
}

export default addContactRequest
