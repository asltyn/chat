import React from "react"
import Box from "@mui/material/Box"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import CircularProgress from "@mui/material/CircularProgress"

const ServerWait = () => (
  <Dialog open={true}>
    <DialogContent>
      <Box sx={{ display: "flex" }}>
        <CircularProgress color="inherit" />
      </Box>
    </DialogContent>
  </Dialog>
)

export default ServerWait
