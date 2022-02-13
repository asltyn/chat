import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"

const AddContactWait = () => {
  return (
    <Dialog open={true}>
      <DialogTitle>Add contact</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex" }}>
          <CircularProgress color="inherit" />
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default AddContactWait
