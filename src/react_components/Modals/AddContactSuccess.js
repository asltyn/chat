import React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import DialogActions from "@mui/material/DialogActions"
import DialogContentText from "@mui/material/DialogContentText"

const AddContactSuccess = ({ action }) => (
  <Dialog open={true}>
    <DialogTitle>Contact added</DialogTitle>
    <DialogContent>
      <DialogContentText> </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        onClick={() => {
          action("OK")
        }}
      >
        OK
      </Button>
    </DialogActions>
  </Dialog>
)

export default AddContactSuccess
