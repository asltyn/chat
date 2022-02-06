const signUpRequest = async (event, callback) => {
  try {
    const { name, password, publicKey } = event
    const response = await fetch("/SIGNUP", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name, password, publicKey }),
    })

    const answer = await response.json()
    return answer.token ? callback({ type: "SUCCESS", token: answer.token, myName: answer.name, key: answer.subsKey }) : callback({ type: "ERROR", answer })
  } catch (error) {
    callback("NETWORKERROR")
  }
}

export default signUpRequest
