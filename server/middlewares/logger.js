const logger =
  ({ logsDB }) =>
  async (req, res, next) => {
    const now = new Date()
    const hour = now.getHours()
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()
    logsDB.insertOne({ time: `${hour}:${minutes}:${seconds}`, request: `${req.method} ${req.url} ${JSON.stringify(req.headers)}` })
    next()
  }

export default logger
