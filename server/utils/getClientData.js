export default async ({ name, usersDB, chatsDB }) => {
  const user = await usersDB.findOne({ name })
  const contactsFromDB = await Promise.all(user.contacts.map(async (name) => await usersDB.findOne({ name })))
  const contactsToClient = contactsFromDB.map(({ name, photo, publicKey }) => ({ name, photo, publicKey }))
  const chatsFromDB = await Promise.all(user.chats.map(async (_id) => await chatsDB.findOne({ _id })))
  const chatsToClient = chatsFromDB.map((ch) => ({
    chatId: ch._id,
    chatName: ch.type === "single" ? ch.participants.find((p) => p !== user.name) : ch.chatName,
    messages: ch.messages.map((m) => ({ name: m.name, message: m.cipherMessage[name] })),
  }))
  return { contacts: contactsToClient, chats: chatsToClient, photo: user.photo }
}
