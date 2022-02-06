export default ({ usersDB, chatsDB, jwt, secretKey, getClientData }) => {
  return async (req, res) => {
    const { token } = { ...req.headers }
    try {
      const name = jwt.verify(token, secretKey).name
      const data = await getClientData({ name, usersDB, chatsDB })
      res.json(data)
    } catch (err) {
      console.log(err)
    }
  }
}
