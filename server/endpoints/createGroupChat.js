export default ({ usersDB, chatsDB, jwt, secretKey, usersOnline, getClientData, clientPush }) => {
  return async (req, res) => {
    const { token } = { ...req.headers }
    try {
      const name = jwt.verify(token, secretKey).name
      const { groupChatData } = { ...req.body }
      const newChat = {
        type: "group",
        participants: [name, ...groupChatData.checked],
        chatName: groupChatData.chatName,
        messages: [],
      }

      const { insertedId } = await chatsDB.insertOne(newChat)
      await Promise.all(newChat.participants.map(async (name) => await usersDB.updateOne({ name }, { $push: { chats: insertedId } })))

      const data = await getClientData({ name, usersDB, chatsDB })
      res.json({ ...data, insertedId })
      const userNames = newChat.participants //groupChatData.checked
      clientPush({ usersOnline, userNames })
    } catch (err) {
      console.log(err)
    }
  }
}
