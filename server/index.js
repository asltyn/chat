import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import logger from "./middlewares/logger.js"
import timeout from "./middlewares/timeout.js"
import compression from "compression"
import { MongoClient, ObjectId } from "mongodb"
import signIn from "./endpoints/signIn.js"
import signUp from "./endpoints/signUp.js"
import heartbeat from "./endpoints/heartbeat.js"
import subscribe from "./endpoints/subscribe.js"
import update from "./endpoints/update.js"
import addContact from "./endpoints/addContact.js"
import createPrivateChat from "./endpoints/createPrivateChat.js"
import sendMessage from "./endpoints/sendMessage.js"
import createGroupChat from "./endpoints/createGroupChat.js"
import changePhoto from "./endpoints/changePhoto.js"
import getClientData from "./utils/getClientData.js"
import clientPush from "./utils/clientPush.js"
import onlineCheck from "./utils/onlineCheck.js"
import path from "path"

const client = new MongoClient("mongodb+srv://asltyn:<password>@cluster0.lh0wp.mongodb.net/chat-app?retryWrites=true&w=majority")
await client.connect()
const database = client.db("DB")
const usersDB = database.collection("users")
const chatsDB = database.collection("chats")
const logsDB = database.collection("logs")
const port = process.env.PORT || 8080
const heartbeatInterval = 30000
const secretKey = "sdjgbskdfb"
const app = express()
const usersOnline = {}
const subscriptionKeys = {}
const deps = { logsDB, usersDB, chatsDB, jwt, bcrypt, secretKey, subscriptionKeys, ObjectId, usersOnline, getClientData, clientPush }

app.use(compression())
app.use(express.json({ limit: "50mb" }))
//app.use(express.static(path.join(path.resolve(), "build")))
app.use(logger(deps))

setInterval(() => onlineCheck(deps), heartbeatInterval)

app.post("/SIGNIN", timeout, signIn(deps))

app.post("/SIGNUP", timeout, signUp(deps))

app.post("/HEARTBEAT", heartbeat(deps))

app.post("/ADDCONTACT", timeout, addContact(deps))

app.post("/CREATEPRIVATECHAT", createPrivateChat(deps))

app.post("/SENDMESSAGE", sendMessage(deps))

//app.get("/SUBSCRIBE", subscribe(deps))

app.post("/SUBSCRIBE", subscribe(deps))

app.get("/UPDATE", update(deps))

app.post("/CREATEGROUPCHAT", createGroupChat(deps))

app.post("/CHANGEPHOTO", timeout, changePhoto(deps))

app.listen(port, () => console.log(`server has been started on port ${port}...`))
