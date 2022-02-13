<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
=======
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
>>>>>>> main
