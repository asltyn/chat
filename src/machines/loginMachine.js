import { createMachine, assign, send, sendParent, spawn } from "xstate"
import renderService from "../services/renderService.js"
import networkService from "../services/networkService.js"
import cryptico from "cryptico"

const loginMachine = createMachine(
  {
    id: "Login",
    initial: "signIn",
    context: {},
    entry: [
      assign({
        renderServiceRef: () => spawn(renderService, "render"),
      }),
      assign({
        networkServiceRef: () => spawn(networkService, "network"),
      }),
    ],
    states: {
      signIn: {
        initial: "notFilled",
        entry: ["resetName", "resetPassword"],
        on: {
          SIGNUP_CLICK: "signUp",
          SIGNIN_CLICK: "signInRequest",
        },

        states: {
          notFilled: {
            entry: [send((ctx) => ({ type: "SIGNIN", ...ctx, filled: false }), { to: "render" })],
            on: {
              FILLNAME: { actions: ["fillName", send("CHANGESTATE")] },
              FILLPASSWORD: { actions: ["fillPassword", send("CHANGESTATE")] },
              CHANGESTATE: { target: "filled", cond: ({ name, password }) => name && password },
            },
          },
          filled: {
            entry: [send((ctx) => ({ type: "SIGNIN", ...ctx, filled: true }), { to: "render" })],
            on: {
              FILLNAME: { actions: ["fillName", send("CHANGESTATE")] },
              FILLPASSWORD: { actions: ["fillPassword", send("CHANGESTATE")] },
              CHANGESTATE: { target: "notFilled", cond: ({ name, password }) => !(name && password) },
            },
          },
        },
      },

      signInRequest: {
        entry: ["generateRSAKey", "getPublicKey", send(() => ({ type: "SIGNIN_REQUEST" }), { to: "render" }), send((ctx) => ({ type: "SIGNIN_REQUEST", ...ctx }), { to: "network" })],
        on: {
          SUCCESS: {
            target: "finish",
            actions: [assign({ token: (c, e) => e.token }), assign({ myName: (c, e) => e.myName }), assign({ key: (c, e) => e.key })],
          },
          ERROR: "signInError",
          NETWORKERROR: "serverError",
        },
      },

      signUp: {
        entry: ["resetName", "resetPassword", send((ctx) => ({ type: "SIGNUP", ...ctx }), { to: "render" })],
        on: {
          CANCEL_CLICK: "signIn",
          SUBMIT_CLICK: "signUpRequest",
        },
        initial: "notFilled",
        states: {
          notFilled: {
            entry: [send((ctx) => ({ type: "SIGNUP", ...ctx, filled: false }), { to: "render" })],
            on: {
              FILLNAME: { actions: ["fillName", send("CHANGESTATE")] },
              FILLPASSWORD: { actions: ["fillPassword", send("CHANGESTATE")] },
              CHANGESTATE: { target: "filled", cond: ({ name, password }) => name && password },
            },
          },
          filled: {
            entry: [send((ctx) => ({ type: "SIGNUP", ...ctx, filled: true }), { to: "render" })],
            on: {
              FILLNAME: { actions: ["fillName", send("CHANGESTATE")] },
              FILLPASSWORD: { actions: ["fillPassword", send("CHANGESTATE")] },
              CHANGESTATE: { target: "notFilled", cond: ({ name, password }) => !(name && password) },
            },
          },
        },
      },

      signUpRequest: {
        entry: ["generateRSAKey", "getPublicKey", send(() => ({ type: "SIGNUP_REQUEST" }), { to: "render" }), send((ctx) => ({ type: "SIGNUP_REQUEST", ...ctx }), { to: "network" })],
        on: {
          SUCCESS: { target: "finish", actions: [assign({ token: (c, e) => e.token }), assign({ myName: (c, e) => e.myName }), assign({ key: (c, e) => e.key })] },
          ERROR: "signUpError",
          NETWORKERROR: "serverError",
        },
      },

      signInError: {
        entry: [send(() => ({ type: "SIGNINERROR" }), { to: "render" })],
        on: {
          OK: "signIn",
        },
      },

      signUpError: {
        entry: send((ctx, e) => ({ type: "SIGNUPERROR", answer: e.answer }), { to: "render" }),
        on: {
          OK: "signUp",
        },
      },

      finish: {
        entry: [sendParent((ctx) => ({ type: "FINISH", ...ctx }))],
        type: "final",
      },

      serverError: {
        entry: send((cxt) => ({ type: "SERVERERROR" }), { to: "render" }),
        type: "final",
      },
    },
  },
  {
    actions: {
      generateRSAKey: assign({ RSAkey: (ctx) => cryptico.generateRSAKey(ctx.password, 1024) }),
      getPublicKey: assign({ publicKey: (ctx) => cryptico.publicKeyString(ctx.RSAkey) }),
      fillName: assign({ name: (context, event) => event.data || "" }),
      fillPassword: assign({ password: (context, event) => event.data || "" }),
      contextlog: (ctx) => console.log("actual context: ", ctx),
      resetName: assign({ name: "" }),
      resetPassword: assign({ password: "" }),
      renderSignInPage: send((ctx) => ({ type: "SIGNIN", ...ctx }), { to: "render" }),
      renderFinisWithError: send((cxt) => ({ type: "FINISHWITHERROR", ...cxt }), { to: (context) => context.renderServiceRef }),
    },
  }
)

export default loginMachine
