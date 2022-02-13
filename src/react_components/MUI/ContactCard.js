import * as React from "react"
import Box from "@mui/material/Box"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"

const ContactCard = ({ contact, action }) => {
  return (
    <Box>
      <ListItemButton
        onClick={() => {
          action({ type: "CHANGEACTIVE", contact: contact.name })
          action("STARTCHAT")
        }}
        alignItems="flex-start"
      >
        <ListItemAvatar>
          <Avatar alt={contact.name} src={contact.photo} />
        </ListItemAvatar>
        <ListItemText primary={contact.name} />
      </ListItemButton>
      <Divider variant="inset" component="li" />
    </Box>
  )
}

export default ContactCard
