import { createMachine, assign, send, sendParent, spawn } from "xstate"
import renderService from "../services/renderService.js"
import networkService from "../services/networkService"
import cryptico from "cryptico"

const chatMachine = createMachine(
  {
    id: "chatMachine",
    initial: "loading",
    entry: [
      assign({
        renderServiceRef: () => spawn(renderService, "render"),
      }),
      assign({
        networkServiceRef: () => spawn(networkService, "network"),
      }),
    ],
    on: {
      UPDATE: { actions: "getData" },
      DATARECIEVED: { actions: ["updateContacts", "updateChats", "updatePhoto"] },
      HEARTBEAT: { actions: "sendHeartBeat" },
    },
    states: {
      loading: {
        entry: ["renderLoadingPage", "subscribeToServerEvents"],
        on: {
          SUBSCRIBED: { actions: "getData" },
          DATARECIEVED: { target: "main", actions: ["updateContacts", "updateChats", "updatePhoto"] },
        },
      },
      main: {
        initial: "choosingChat",
        on: {
          ADDCONTACT: "addContactState",
          CREATEGROUPCHAT: "createGroupChat",
          LOGOUT_CLICK: "logOut",
          CHANGEAVATAR: "uploadPhoto",
        },
        states: {
          choosingChat: {
            entry: ["renderChat", "clearActiveContact"],
            on: {
              CHANGEACTIVE: { target: "choosingChat", actions: [assign({ activeChat: (c, e) => e.chatId })] },
              SWITCHTOCONTACTS: "choosingContact",
              TYPING: {
                actions: [
                  assign({
                    chats: (c, e) => {
                      c.chats.find((ch) => ch.chatId === c.activeChat).typingMessage = e.data
                      return c.chats
                    },
                  }),
                ],
              },
              RENDER: { actions: "renderChat" },
              SENDMESSAGE: { actions: "sendMessage" },
              UPDATE: { actions: "getData" },
              OK: { actions: ["updateContacts", "updateChats", "updatePhoto", "renderChat"] },
              DATARECIEVED: { actions: ["updateContacts", "updateChats", "updatePhoto", "renderChat"] },
              CLEARINPUT: { actions: ["clearMessage", "renderChat"] },
            },

            exit: "resetMessage",
          },
          choosingContact: {
            entry: "renderContacts",
            on: {
              CHANGEACTIVE: { target: "choosingContact", actions: [assign({ activeContact: (c, e) => e.contact })] },
              SWITCHTOCHATS: "choosingChat",
              STARTCHAT: [
                {
                  target: "choosingChat",
                  actions: assign({ activeChat: (c) => c.chats.find((ch) => ch.chatName === c.activeContact).chatId }),
                  cond: (c) => c.chats.some((chat) => chat.chatName === c.activeContact),
                },
                { target: "newChat" },
              ],
            },
          },
          newChat: {
            entry: "renderNewChat",
            initial: "idle",
            states: {
              idle: {
                on: {
                  CANCEL: "#chatMachine.main.choosingChat",
                  TYPING: { actions: assign({ message: (c, e) => e.data }) },
                  RENDER: { actions: "renderNewChat" },
                  STARTNEWCHAT: "creatingNewChat",
                },
              },

              creatingNewChat: {
                entry: ["renderSerwerWait", "createChat"],
                on: {
                  SUCCESS: { target: "sendingMessage", actions: ["updateActiveChatId"] },
                  ERROR: "errorState",
                },
              },
              sendingMessage: {
                entry: [
                  assign({
                    chats: (c, e) => {
                      c.chats.push({ chatId: c.activeChat, typingMessage: c.message, messages: [] })
                      return c.chats
                    },
                  }),
                  "sendMessage",
                ],
                on: {
                  OK: "#chatMachine.main.choosingChat",
                  NETWORKERROR: "errorState",
                },
              },
              errorState: {
                entry: "serverError",
                type: "final",
              },
            },
            exit: ["resetMessage"],
          },
          hist: {
            type: "history",
          },
        },
      },
      addContactState: {
        initial: "idle",
        states: {
          idle: {
            entry: ["resetContact", "renderAddContact"],

            on: {
              TYPING: { actions: assign({ addingContact: (c, e) => e.data }) },
              CANCEL: "#chatMachine.main.choosingChat",
              SUBMIT: "waitingForServer",
            },
          },
          waitingForServer: {
            entry: [send((ctx) => ({ type: "ADD_CONTACT_WAIT", ...ctx }), { to: "render" }), send((ctx) => ({ type: "ADD_CONTACT", ...ctx }), { to: "network" })],
            exit: "resetContact",
            on: {
              OK: { target: "sucessState", actions: "getData" },
              ERROR: "errorState",
            },
          },
          sucessState: {
            entry: send((ctx) => ({ type: "ADD_CONTACT_SUCCESS", ...ctx }), { to: "render" }),
            on: {
              OK: "#chatMachine.main.choosingContact",
            },
          },
          errorState: {
            entry: send((ctx) => ({ type: "ADD_CONTACT_ERROR", ...ctx }), { to: "render" }),
            on: {
              OK: "#chatMachine.main.choosingChat",
              TRYAGAIN: "idle",
            },
          },
        },
      },
      uploadPhoto: {
        initial: "upload",
        states: {
          upload: {
            entry: send((ctx) => ({ type: "UPLOAD_PHOTO", ...ctx }), { to: "render" }),
            on: {
              UPDATEPHOTO: {
                target: "waitingForServer",
              },
              DELETEPHOTO: {
                target: "waitingForServer",
                actions: [assign({ photo: "" })],
              },
              CANCEL: "#chatMachine.main.hist",
            },
          },
          waitingForServer: {
            entry: [send((ctx, e) => ({ type: "CHANGE_PHOTO", ...ctx, photo: e.photo }), { to: "network" })],
            on: {
              SUCCESS: {
                target: "#chatMachine.main.hist",
                actions: assign({ photo: (c, e) => e.photo }),
              },
            },
          },
          sucessState: {
            entry: "#chatMachine.main.choosingChat",
          },
          errorState: {
            entry: "serverError",
            type: "final",
          },
        },
      },
      logOut: {
        entry: ["renderLogOut"],
        on: {
          YES: "exit",
          NO: "main.hist",
        },
      },
      createGroupChat: {
        initial: "idle",
        states: {
          idle: {
            entry: ["renderCreateGroupChat"],
            on: {
              SEND: { target: "waitingForServer", actions: assign({ groupChatData: (c, e) => e.data }) },
              CANCEL: "#chatMachine.main.hist",
            },
          },
          waitingForServer: {
            entry: [send((ctx) => ({ type: "CREATE_GROUP_CHAT_WAIT", ...ctx }), { to: "render" }), send((ctx) => ({ type: "CREATE_GROUP_CHAT", ...ctx }), { to: "network" })],
            on: {
              SUCCSESS: { actions: ["updateContacts", "updateChats", "updatePhoto", "updateActiveChatId"], target: "#chatMachine.main.choosingChat" },
            },
          },
        },
      },
      exit: {
        entry: [sendParent(() => ({ type: "FINISH" }))],
        type: "final",
      },
    },
  },
  {
    actions: {
      subscribeToServerEvents: send((ctx) => ({ type: "SUBSCRIBE", ...ctx }), { to: "network" }),
      sendHeartBeat: send((ctx) => ({ type: "HEARTBEAT", ...ctx }), { to: "network" }),
      contextlog: (ctx) => console.log("actual context: ", ctx),
      setContacts: assign({ contacts: true }),
      setChats: assign({ chats: true }),
      renderChat: send((ctx) => ({ type: "CHATS", ...ctx }), { to: "render" }),
      resetContact: assign({ addingContact: "" }),
      resetMessage: assign({ message: "" }),
      getData: send((ctx) => ({ type: "GET_DATA", ...ctx }), { to: "network" }),
      sendMessage: send((ctx) => ({ type: "SEND_MESSAGE", ...ctx }), { to: "network" }),
      createChat: send((ctx) => ({ type: "CREATE_NEW_CHAT", ...ctx }), { to: "network" }),
      renderLoadingPage: send((ctx) => ({ type: "START_CHAT", ...ctx }), { to: "render" }),
      renderNewChat: send((ctx) => ({ type: "NEW_CHAT", ...ctx }), { to: "render" }),
      renderAddContact: send((ctx) => ({ type: "ADD_CONTACT", ...ctx }), { to: "render" }),
      renderCreateGroupChat: send((ctx) => ({ type: "CREATE_GROUP_CHAT", ...ctx }), { to: "render" }),
      updateContacts: assign({ contacts: (c, e) => e.contacts }),
      updateChats: assign({
        chats: (ctx, e) => {
          return e.chats.map(({ chatId, chatName, messages, photo }) => ({
            chatId,
            chatName,
            messages: messages.map(({ name, message }) => ({ name, message: cryptico.decrypt(message, ctx.RSAkey).plaintext })),
            photo,
          }))
        },
      }),
      updatePhoto: assign({ photo: (c, e) => e.photo }),
      updateActiveChatId: assign({ activeChat: (c, e) => e.insertedId }),
      renderContacts: send((ctx) => ({ type: "CONTACTS", ...ctx }), { to: "render" }),
      clearActiveContact: assign({ activeContact: (c, e) => "" }),
      clearActiveChat: assign({ activeChat: (c, e) => "" }),
      clearMessage: assign({
        chats: (c, e) => {
          c.chats.find((ch) => ch.chatId === c.activeChat).typingMessage = ""
          return c.chats
        },
      }),
      renderSerwerWait: send((ctx) => ({ type: "SERVER_WAIT", ...ctx }), { to: "render" }),
      renderLogOut: send((ctx) => ({ type: "LOGOUT", ...ctx }), { to: "render" }),
      serverError: send(() => ({ type: "SERVERERROR" }), { to: "render" }),
    },
  }
)

export default chatMachine
