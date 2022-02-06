import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import Menu from "./Menu"

const header = ({ data, action }) => (
  <Grid item xs={12} style={{ height: "10%" }}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Menu action={action}></Menu>
          <ListItemAvatar>
            <Avatar style={{ cursor: "pointer" }} onClick={() => action("CHANGEAVATAR")} src={data.photo} />
          </ListItemAvatar>
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
)

export default header
