import * as React from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"

const Message = ({ data, action, message }) => {
  return (
    <Card sx={{ width: "50%", margin: "10px", alignSelf: message.name === data.myName ? "flex-end" : "flex-start" }}>
      <CardContent>
        <Typography gutterBottom variant="body2" component="div">
          {"name: " + message.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {message.message}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Message
