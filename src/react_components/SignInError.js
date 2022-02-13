import React from "react"
import Modal from "@material-ui/core/Modal"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"

const SignInError = ({ action, data }) => {
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

  return (
    <Modal open={true} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Username or password is incorrect
        </Typography>
        <Button onClick={() => action("OK")}>OK</Button>
      </Box>
    </Modal>
  )
}

export default SignInError
