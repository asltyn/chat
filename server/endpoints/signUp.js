export default ({ usersDB, jwt, secretKey, bcrypt }) => {
  return async (req, res) => {
    const { name, password, publicKey } = { ...req.body }
    if (!(name || password)) {
      return res.json("name or password can't be empty")
    }
    const user = await usersDB.findOne({ name: name })
    if (user) {
      return res.json("user alredy exist")
    }
    console.log(publicKey)
    const salt = await bcrypt.genSalt(10)
    const passwordHash = bcrypt.hashSync(password, salt)
    await usersDB.insertOne({ name, passwordHash, publicKey, contacts: [], chats: [], photo: "" })
    const token = jwt.sign({ name }, secretKey)
    return res.json({ token, name })
  }
}
