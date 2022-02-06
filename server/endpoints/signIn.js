export default ({ usersDB, jwt, secretKey, bcrypt }) => {
  return async (req, res) => {
    const { name, password } = { ...req.body }
    const user = await usersDB.findOne({ name })
    if (user) {
      console.log(password)
      console.log(user.passwordHash)
      const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
      console.log(isPasswordValid)
      if (isPasswordValid) {
        const token = jwt.sign({ name }, secretKey)
        return res.send({ token, name })
      }
    }
    return res.json("")
  }
}
