import ServerError from "../react_components/ServerError.js"
import ServerRequest from "../react_components/ServerRequest.js"
import StartChat from "../react_components/StartChat.js"
import Chats from "../react_components/Chats.js"
import Contacts from "../react_components/Contacts.js"
import LogOut from "../react_components/Modals/LogOut.js"
import AddContact from "../react_components/Modals/AddContact.js"
import SignIn from "../react_components/SignIn.js"
import SignUp from "../react_components/SignUp.js"
import SignInError from "../react_components/SignInError.js"
import SignUpError from "../react_components/SignUpError.js"
//import RecoveryForm from "../react_components/RecoveryForm.js"
//import RecoveryRequest from "../react_components/RecoveryRequest.js"
import AddContactSuccess from "../react_components/Modals/AddContactSuccess.js"
import AddContactError from "../react_components/Modals/AddContactError.js"
import AddContactWait from "../react_components/Modals/AddContactWait.js"
import NewChat from "../react_components/NewChat.js"
import CreateGroupChat from "../react_components/Modals/CreateGroupChat.js"
import UploadPhoto from "../react_components/Modals/UploadPhoto.js"
import CreateGroupChatWait from "../react_components/Modals/CreateGroupChatWait.js"
import ServerWait from "../react_components/Modals/ServerWait"
import ReactDOM from "react-dom"
import React from "react"

const renderService = (callback, onEvent) => {
  onEvent((e) => {
    ReactDOM.render(null, document.getElementById("modal"))
    switch (e.type) {
      case "SIGNIN": {
        ReactDOM.render(<SignIn action={callback} data={e} />, document.getElementById("root"))
        ReactDOM.render("", document.getElementById("modal"))
        break
      }
      case "SIGNIN_REQUEST": {
        ReactDOM.render(<ServerRequest action={callback} data={e} />, document.getElementById("modal"))
        break
      }
      case "SIGNINERROR": {
        ReactDOM.render(<SignInError action={callback} data={e} />, document.getElementById("modal"))
        break
      }
      case "SERVERERROR": {
        ReactDOM.render(<ServerError action={callback} data={e} />, document.getElementById("root"))
        ReactDOM.render("", document.getElementById("modal"))
        break
      }
      case "SIGNUP": {
        ReactDOM.render(<SignUp action={callback} data={e} />, document.getElementById("root"))
        ReactDOM.render("", document.getElementById("modal"))
        break
      }
      case "SIGNUP_REQUEST": {
        ReactDOM.render(<ServerRequest action={callback} data={e} />, document.getElementById("modal"))
        break
      }
      case "SIGNUPERROR": {
        ReactDOM.render(<SignUpError action={callback} data={e} />, document.getElementById("modal"))
        break
      }
      // case "RECOVERYFORM": {
      //   ReactDOM.render(<RecoveryForm action={callback} data={e} />, document.getElementById("root"))
      //   break
      // }
      // case "RECOVERYREQUEST": {
      //   ReactDOM.render(<RecoveryRequest action={callback} data={e} />, document.getElementById("root"))
      //   break
      // }
      case "START_CHAT": {
        ReactDOM.render(<StartChat action={callback} data={e} />, document.getElementById("root"))
        break
      }
      case "CHATS": {
        ReactDOM.render(<Chats action={callback} data={e} />, document.getElementById("root"))
        ReactDOM.render("", document.getElementById("modal"))
        break
      }
      case "CONTACTS": {
        ReactDOM.render(<Contacts action={callback} data={e} />, document.getElementById("root"))
        break
      }
      case "LOGOUT": {
        ReactDOM.render(<LogOut action={callback} data={e} />, document.getElementById("modal"))
        break
      }
      case "ADD_CONTACT": {
        ReactDOM.render(<AddContact action={callback} data={e} />, document.getElementById("modal"))
        break
      }
      case "ADD_CONTACT_WAIT": {
        ReactDOM.render(<AddContactWait action={callback} data={e} />, document.getElementById("modal"))
        break
      }
      case "ADD_CONTACT_SUCCESS": {
        ReactDOM.render(<AddContactSuccess action={callback} data={e} />, document.getElementById("modal"))
        break
      }
      case "ADD_CONTACT_ERROR": {
        ReactDOM.render(<AddContactError action={callback} data={e} />, document.getElementById("modal"))
        break
      }
      case "NEW_CHAT": {
        ReactDOM.render(<NewChat action={callback} data={e} />, document.getElementById("root"))
        break
      }
      case "CREATE_GROUP_CHAT": {
        ReactDOM.render(<CreateGroupChat action={callback} data={e} />, document.getElementById("modal"))
        break
      }
      case "CREATE_GROUP_CHAT_WAIT": {
        ReactDOM.render(<CreateGroupChatWait action={callback} data={e} />, document.getElementById("modal"))
        break
      }
      case "UPLOAD_PHOTO": {
        ReactDOM.render(<UploadPhoto action={callback} data={e} />, document.getElementById("modal"))
        break
      }
      case "SERVER_WAIT": {
        ReactDOM.render(<ServerWait />, document.getElementById("modal"))
        break
      }
      default:
        console.log("unknown state: ", e.type)
    }
  })
}

export default renderService
