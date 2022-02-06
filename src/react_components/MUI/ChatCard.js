import * as React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"

const ChatCard = ({ data, action }) => {
  const { chatName, chatId, messages, activeChat } = data
  const photo = ""
  let lastMessage = ""
  if (messages.length > 0) {
    const { name, message } = messages.slice(-1)[0]
    lastMessage = `${name}: ${message}`
  }
  return (
    <Box>
      <ListItemButton sx={{ backgroundColor: chatId === activeChat ? "rgba(0, 0, 0, 0.05)" : "" }} alignItems="flex-start" onClick={() => action({ type: "CHANGEACTIVE", chatId })}>
        <ListItemAvatar>
          <Avatar alt={chatName} src={photo} />
        </ListItemAvatar>
        <ListItemText
          primary={chatName}
          secondary={
            <React.Fragment>
              <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                {lastMessage}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItemButton>
      <Divider variant="inset" component="li" />
    </Box>
  )
}

export default ChatCard
