export default ({ usersOnline, userNames }) => {
  for (let user in usersOnline) {
    if (userNames.includes(user)) {
      const { res } = usersOnline[user]
      res.write(JSON.stringify({ message: "update" }))
    }
  }
}
