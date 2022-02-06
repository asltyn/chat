export default ({ usersOnline, jwt, secretKey }) => {
  return (req, res) => {
    const { token } = { ...req.headers }
    const heartbeatInterval = 5000 //ms
    try {
      const name = jwt.verify(token, secretKey).name
      // res.writeHead(200, {
      //   "Content-Type": "application/json",
      //   "Cache-Control": "no-cache",
      //   Connection: "keep-alive",
      //   "X-Accel-Buffering": "no",
      // })
      //const r = JSON.stringify({ value: "event: SUBSCRIBED\ndata:\n\n", done: false })
      usersOnline[name] = { res, lastTimeOnline: Date.now() }
      res.write(JSON.stringify({ message: "subscribed" }))
      //setInterval(() => res.write(JSON.stringify({ message: "heartbeat" })), heartbeatInterval)
      //res.flush()
    } catch (err) {
      console.log(err)
    }
  }
}
