import * as React from "react"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"

const ChatMenu = ({ action }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => action("SWITCHTOCHATS")}>Chats</MenuItem>
        <MenuItem onClick={() => action("SWITCHTOCONTACTS")}>Contacts</MenuItem>
        <MenuItem
          onClick={() => {
            handleClose()
            action("ADDCONTACT")
          }}
        >
          Add contact
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose()
            action("CREATEGROUPCHAT")
          }}
        >
          Create group chat
        </MenuItem>
      </Menu>
    </div>
  )
}

export default ChatMenu
