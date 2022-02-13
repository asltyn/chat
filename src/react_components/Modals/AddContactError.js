import React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import DialogActions from "@mui/material/DialogActions"
import DialogContentText from "@mui/material/DialogContentText"

const AddContactError = ({ action }) => (
  <Dialog open={true}>
    <DialogTitle>Can't add contact</DialogTitle>
    <DialogContent>
      <DialogContentText> </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => action("OK")}>OK</Button>
      <Button onClick={() => action("TRYAGAIN")}>Try again</Button>
    </DialogActions>
  </Dialog>
)

export default AddContactError
