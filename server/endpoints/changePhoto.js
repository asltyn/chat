export default ({ usersDB, jwt, secretKey, usersOnline }) => {
  return async (req, res) => {
    const { token } = { ...req.headers }
    try {
      const name = jwt.verify(token, secretKey).name
      const { photo } = { ...req.body }
      const user = await usersDB.findOne({ name })
      await usersDB.updateOne(user, { $set: { photo } })
      res.json({ photo })
      userNames = user.contacts
      clientPush({ usersOnline, userNames })
    } catch (err) {
      console.log(err)
    }
  }
}
