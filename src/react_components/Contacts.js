import React from "react"
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import ContactCard from "./MUI/ContactCard"
import Header from "./MUI/Header.js"

const ChoosingContact = ({ action, data }) => {
  return (
    <Grid container sx={{ height: "100vh", border: "solid blue 0px" }}>
      <Header action={action} data={data}></Header>
      <Grid item xs={3} style={{ height: "90%", border: "0px solid red" }}>
        <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }} style={{ height: "92%", overflow: "auto" }}>
          {data.contacts.map((contact) => (
            <ContactCard contact={contact} action={action}></ContactCard>
          ))}
        </List>
      </Grid>
      <Grid container xs={9} justifyContent="center" style={{ height: "90%", border: "0px solid red" }}>
        <Grid item xs={12} style={{ height: "80%", border: "solid 0px red" }}>
          <Paper sx={{ height: "98%", margin: "0 1% 0% 1%", border: "solid 0px blue" }}></Paper>
        </Grid>
        <Grid item xs={12} style={{ height: "20%", border: "solid 0px red" }}>
          <Box sx={{ height: "95%", margin: "0 1% 0% 1%", border: "solid 0px blue", display: "flex", justifyContent: "space-between" }}>
            <TextField disabled={true} label="Insert your message" multiline rows={4} focused style={{ width: "90%" }} />
            <Button disabled={true} variant="contained" style={{ height: "93%" }}>
              SEND
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ChoosingContact
