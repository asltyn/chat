import React from "react"
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Message from "./MUI/Message"
import ChatCard from "./MUI/ChatCard"
import Header from "./MUI/Header"

const getMessages = (data) => {
  if (!data.activeChat) return ""
  const chatId = data.chats.find((chat) => chat.chatId === data.activeChat).chatId
  if (chatId === undefined) return ""
  const arr = data.chats.find((chat) => chat.chatId === chatId).messages.map((m) => <Message data={data} message={m}></Message>)
  return arr
}

const ChatActive = ({ action, data }) => {
  const messages = getMessages(data)
  const x = document.getElementById("input-message")
  if (x) x.value = (data.chats.find((ch) => ch.chatId === data.activeChat) || {}).typingMessage || ""
  return (
    <Grid container sx={{ height: "100vh", border: "solid blue 0px" }}>
      <Header action={action} data={data}></Header>
      <Grid item xs={3} style={{ height: "90%", border: "0px solid red" }}>
        <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }} style={{ height: "92%", overflow: "auto" }}>
          {data.chats.map((chat) => (
            <ChatCard data={{ ...chat, activeChat: data.activeChat }} action={action}></ChatCard>
          ))}
        </List>
      </Grid>
      <Grid container xs={9} justifyContent="center" style={{ height: "90%", border: "0px solid red" }}>
        <Grid item xs={12} style={{ height: "80%", border: "solid 0px red" }}>
          <Paper sx={{ height: "98%", margin: "0 1% 0% 1%", border: "solid 0px blue" }}>
            <List sx={{ height: "97%" }} style={{ overflow: "auto", display: "flex", flexDirection: "column-reverse" }}>
              <Box style={{ display: "flex", flexDirection: "column", border: "0px solid red" }}>{messages}</Box>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} style={{ height: "20%", border: "solid 0px red" }}>
          <Box sx={{ height: "95%", margin: "0 1% 0% 1%", border: "solid 0px blue", display: "flex", justifyContent: "space-between" }}>
            <TextField
              id="input-message"
              disabled={data.activeChat === ""}
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
            <Button
              id="send-btn"
              disabled={x ? !x.value.trim() : true}
              variant="contained"
              style={{ height: "93%" }}
              onClick={() => {
                action("SENDMESSAGE")
                action("CLEARINPUT")
              }}
            >
              SEND
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ChatActive
