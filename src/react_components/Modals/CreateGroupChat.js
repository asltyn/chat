import * as React from "react"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Checkbox from "@mui/material/Checkbox"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"

const CreateGroupChat = ({ action, data }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    maxHeight: "50%",
    overflow: "auto",
  }

  const [checked, setChecked] = React.useState([])
  const [chatName, setChatName] = React.useState("")
  const [btnDisabled, setBtnDisabled] = React.useState(true)

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
    setBtnDisabled(newChecked.length === 0 || chatName === "")
  }
  const handleText = (value) => {
    setChatName(value)
    setBtnDisabled(checked.length === 0 || value === "")
  }

  return (
    <Modal open={true} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Enter chat name
        </Typography>
        <TextField variant="outlined" margin="normal" required fullWidth onChange={(e) => handleText(e.target.value)} />
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Choose contacts to new group chat
        </Typography>
        <List dense sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
          {data.contacts.map((cont) => {
            const labelId = `${cont.name}`
            return (
              <ListItem
                key={cont.name}
                secondaryAction={<Checkbox edge="end" onChange={handleToggle(cont.name)} checked={checked.indexOf(cont.name) !== -1} inputProps={{ "aria-labelledby": labelId }} />}
                disablePadding
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar alt={`${cont.name}`} src={cont.photo} />
                  </ListItemAvatar>
                  <ListItemText id={labelId} primary={`${cont.name}`} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
        <Button disabled={btnDisabled} onClick={() => action({ type: "SEND", data: { checked, chatName } })}>
          CREATE
        </Button>
        <Button onClick={() => action("CANCEL")}>CANCEL</Button>
      </Box>
    </Modal>
  )
}

export default CreateGroupChat
