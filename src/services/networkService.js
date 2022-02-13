import signInRequest from "../requests/signInRequest.js"
import signUpRequest from "../requests/signUpRequest.js"
import heartbeat from "../requests/heartbeat.js"
import addContactRequest from "../requests/addContactRequest.js"
import changePhotoRequest from "../requests/changePhotoRequest.js"
import sendMessageRequest from "../requests/sendMessageRequest.js"
import updateRequest from "../requests/updateRequest.js"
import createPrivateChatRequest from "../requests/createPrivateChatRequest.js"
import createGroupChatRequest from "../requests/createGroupChatRequest.js"
import subscribe from "../requests/subscribe.js"

const networkService = (callback, onEvent) => {
  onEvent((event) => {
    switch (event.type) {
      case "HEARTBEAT":
        heartbeat(event)
        break

      case "SIGNIN_REQUEST":
        signInRequest(event, callback)
        break

      case "SIGNUP_REQUEST":
        signUpRequest(event, callback)
        break

      case "GET_DATA":
        updateRequest(event, callback)
        break

      case "ADD_CONTACT":
        addContactRequest(event, callback)
        break

      case "SUBSCRIBE":
        subscribe(event, callback)
        break

      case "SEND_MESSAGE":
        sendMessageRequest(event, callback)
        break

      case "CREATE_NEW_CHAT":
        createPrivateChatRequest(event, callback)
        break

      case "CREATE_GROUP_CHAT":
        createGroupChatRequest(event, callback)
        break

      case "CHANGE_PHOTO":
        changePhotoRequest(event, callback)
        break

      default:
        console.log("unexpected action: ", event.type)
    }
  })
}

export default networkService
