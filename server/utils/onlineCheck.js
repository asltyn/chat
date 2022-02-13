const onlineCheck = ({ usersOnline }) => {
  for (let user in usersOnline) {
    const { res, lastTimeOnline } = usersOnline[user]
    res.write(JSON.stringify({ message: "heartbeat" }))
    console.log(user, lastTimeOnline)
    if (Date.now() - lastTimeOnline > 60000) {
      res.send()
      delete usersOnline[user]
    }
  }
}

export default onlineCheck
