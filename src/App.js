import { createMachine, interpret, assign } from "xstate"
import loginMachine from "./machines/loginMachine.js"
import chatMachine from "./machines/chatMachine.js"

function app() {
  const appMachine = createMachine({
    id: "app",
    initial: "login",
    context: {},
    states: {
      login: {
        invoke: {
          id: "loginMachine",
          src: loginMachine,
        },
        on: {
          FINISH: {
            target: "chat",
            actions: [assign({ token: (context, event) => event.token }), assign({ myName: (context, event) => event.myName }), assign({ RSAkey: (c, e) => e.RSAkey })],
          },
        },
      },
      chat: {
        invoke: {
          id: "chatMachine",
          src: chatMachine,
          data: {
            token: (context) => context.token,
            myName: (context) => context.myName,
            RSAkey: (context) => context.RSAkey,
            activeChat: "",
          },
        },
        on: {
          FINISH: {
            target: "login",
            actions: [assign({ token: "" }), assign({ myName: "" }), assign({ RSAkey: "" })],
          },
        },
      },
    },
  })

  interpret(appMachine).start()
}

export default app
