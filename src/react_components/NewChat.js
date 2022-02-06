import React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import List from "@mui/material/List"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import NewChatMenu from "./MUI/NewChatMenu"
import NewChatCard from "./MUI/NewChatCard"

const NewChat = ({ action, data }) => {
  const x = document.getElementById("input-message")
  return (
    <Grid container sx={{ height: "100vh", border: "solid blue 0px" }}>
      <Grid item xs={12} style={{ height: "10%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <NewChatMenu action={action}></NewChatMenu>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {data.myName}
              </Typography>
              <Button color="inherit" onClick={() => action("LOGOUT_CLICK")}>
                logout
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      </Grid>
      <Grid item xs={3} style={{ height: "90%", border: "0px solid red" }}>
        <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }} style={{ height: "92%", overflow: "auto" }}>
          <NewChatCard chatName={"new chat with " + data.activeContact} action={action}></NewChatCard>
        </List>
      </Grid>
      <Grid container xs={9} justifyContent="center" style={{ height: "90%", border: "0px solid red" }}>
        <Grid item xs={12} style={{ height: "80%", border: "solid 0px red" }}>
          <Paper sx={{ height: "98%", margin: "0 1% 0% 1%", border: "solid 0px blue" }}>
            <List sx={{ height: "97%" }} style={{ overflow: "auto", display: "flex", flexDirection: "column-reverse" }}></List>
          </Paper>
        </Grid>
        <Grid item xs={12} style={{ height: "20%", border: "solid 0px red" }}>
          <Box sx={{ height: "95%", margin: "0 1% 0% 1%", border: "solid 0px blue", display: "flex", justifyContent: "space-between" }}>
            <TextField
              id="input-message"
              label="Insert your message"
              multiline
              rows={4}
              focused
              style={{ width: "90%" }}
              onChange={(e) => {
                if (e.target.value.trim().length <= 1) action("RENDER")
                action({ type: "TYPING", data: e.target.value })
              }}
            />
            <Button disabled={x ? !x.value.trim() : true} variant="contained" style={{ height: "93%" }} onClick={() => action("STARTNEWCHAT")}>
              SEND
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default NewChat
