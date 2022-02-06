export default ({ usersOnline, userNames }) => {
  // usersOnline
  //   .filter((u) => userNames.includes(u.name))
  //   .map((u) => {
  //     u.res.write("event: UPDATE\ndata:\n\n")
  //     u.res.flush()
  //   })

  for (let user in usersOnline) {
    if (userNames.includes(user)) {
      const { res } = usersOnline[user]
      res.write(JSON.stringify({ message: "update" }))
    }
  }
}
