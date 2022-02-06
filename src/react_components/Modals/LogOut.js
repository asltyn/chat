import * as React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"

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
}

const LogOut = ({ action }) => (
  <Modal open={true} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Are you sure you want to exit?
      </Typography>
      <Button onClick={() => action("YES")}>YES</Button>
      <Button onClick={() => action("NO")}>NO</Button>
    </Box>
  </Modal>
)

export default LogOut
