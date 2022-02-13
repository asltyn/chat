import React from "react"
import Backdrop from "@material-ui/core/Backdrop"
import CircularProgress from "@material-ui/core/CircularProgress"

const ServerRequest = () => {
  return (
    <Backdrop style={{ zIndex: 1 }} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default ServerRequest
