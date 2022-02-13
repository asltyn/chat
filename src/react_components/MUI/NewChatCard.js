import * as React from "react"
import Box from "@mui/material/Box"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"

const NewChatCard = ({ chatName }) => {
  return (
    <Box>
      <ListItemButton alignItems="flex-start" onClick={() => {}}>
        <ListItemAvatar>
          <Avatar alt={chatName} src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText primary={chatName} />
      </ListItemButton>
      <Divider variant="inset" component="li" />
    </Box>
  )
}

export default NewChatCard
