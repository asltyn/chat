import cryptico from "cryptico"

export default ({ usersDB, chatsDB, jwt, secretKey, ObjectId, usersOnline, getClientData, clientPush }) => {
  return async (req, res) => {
    const { token } = { ...req.headers }
    try {
      const name = jwt.verify(token, secretKey).name
      const { message, activeChat } = { ...req.body }
      const _id = new ObjectId(activeChat)
      const actChat = await chatsDB.findOne({ _id })
      const contactsFromDB = await Promise.all(actChat.participants.map(async (name) => await usersDB.findOne({ name })))
      const cipherMessage = contactsFromDB.reduce((acc, { name, publicKey }) => {
        acc[name] = cryptico.encrypt(message, publicKey).cipher
        return acc
      }, {})

      await chatsDB.updateOne(actChat, { $push: { messages: { name, cipherMessage } } })
      const data = await getClientData({ name, usersDB, chatsDB })
      res.json(data)
      const userNames = actChat.participants //.filter((n) => n !== name)
      clientPush({ usersOnline, userNames })
    } catch (err) {
      console.log(err)
    }
  }
}
