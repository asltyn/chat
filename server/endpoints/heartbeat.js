const heartbeat = ({ jwt, secretKey, usersOnline }) => {
  return async (req, res) => {
    const { token } = { ...req.headers }
    try {
      const name = jwt.verify(token, secretKey).name
      console.log(name, " ping")
      const user = usersOnline[name]
      if (!user) return res.send("")
      user.lastTimeOnline = Date.now()
      res.send()
    } catch (err) {
      console.log(err)
    }
  }
}

export default heartbeat
