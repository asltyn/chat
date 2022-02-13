export default ({ usersDB, jwt, secretKey }) => {
  return async (req, res) => {
    const { token } = { ...req.headers }
    try {
      const name = jwt.verify(token, secretKey).name
      const { addingContact } = { ...req.body }
      const userExist = await usersDB.findOne({ name: addingContact })
      if (!userExist) return res.json({ name: "" })
      const user = await usersDB.findOne({ name })
      const userInContacts = user.contacts.some((name) => name === addingContact)
      if (userInContacts) return res.json({ name: "" })
      await usersDB.updateOne({ name }, { $set: { contacts: [...user.contacts, addingContact] } })
      res.json({ name: addingContact })
    } catch (err) {
      console.log(err)
    }
  }
}
