import React from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

const AddContact = ({ data, action }) => {
  return (
    <div>
      <Dialog open={true}>
        <DialogTitle>Add contact</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter email to add</DialogContentText>
          <TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth variant="standard" onChange={(e) => action({ type: "TYPING", data: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => action("SUBMIT")}>Search</Button>
          <Button onClick={() => action("CANCEL")}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddContact
