export default ({ usersDB, chatsDB, jwt, secretKey, usersOnline, getClientData, clientPush }) => {
  return async (req, res) => {
    const { token } = { ...req.headers }
    try {
      const name = jwt.verify(token, secretKey).name
      const { message, activeContact } = { ...req.body }
      const chatExist = await chatsDB.findOne({ type: "single", participants: { $all: [activeContact, name] } })
      if (chatExist) return res.json({ insertedId: chatExist._id })
      const newChat = {
        type: "single",
        participants: [name, activeContact],
        chatName: null,
        messages: [],
      }
      const { insertedId } = await chatsDB.insertOne(newChat)
      await usersDB.updateOne({ name }, { $push: { chats: insertedId } })
      await usersDB.updateOne({ name: activeContact }, { $push: { chats: insertedId } })
      //const data = await getClientData({ name, usersDB, chatsDB })
      res.json({ insertedId })
      const userNames = newChat.participants
      clientPush({ usersOnline, userNames: [activeContact] })
    } catch (err) {
      console.log(err)
    }
  }
}
