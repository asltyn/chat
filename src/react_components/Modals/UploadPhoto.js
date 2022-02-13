import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import Button from "@mui/material/Button"

const UploadPhoto = ({ action, data }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: "50%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    //maxHeight: "50%",
    overflow: "auto",
  }

  const [photo, setPhoto] = React.useState("")

  const upload = () => {
    const preview = document.getElementById("prev")
    const file = document.getElementById("upload-photo").files[0]
    const reader = new FileReader()
    reader.addEventListener(
      "load",
      () => {
        preview.src = reader.result
        setPhoto(reader.result)
      },
      false
    )
    if (file) {
      reader.readAsDataURL(file)
    }
  }
  const emptyImgSrc = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D"
  return (
    <Modal open={true} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Box sx={{ height: "80%", border: "dashed 1px blue" }}>
          <img alt="" src={data.photo || emptyImgSrc} id="prev" style={{ height: "100%", width: "100%" }} />
        </Box>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Upload photo from your local disc
        </Typography>

        <label htmlFor="upload-photo">
          <input onChange={() => upload()} style={{ display: "none" }} id="upload-photo" name="upload-photo" type="file" />

          <Button component="span">Choose photo</Button>
        </label>

        <Button disabled={photo === ""} onClick={() => action({ type: "UPDATEPHOTO", photo })}>
          Update photo
        </Button>

        <Button disabled={data.photo === ""} onClick={() => action({ type: "DELETEPHOTO", photo })}>
          Delete photo
        </Button>

        <Button onClick={() => action("CANCEL")}>CANCEL</Button>
      </Box>
    </Modal>
  )
}

export default UploadPhoto
