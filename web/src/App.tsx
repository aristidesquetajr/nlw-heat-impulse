import { useContext } from "react";

import styles from "./App.module.scss";

import { LoginBox } from "./components/LoginBox";
import { MessageList } from "./components/MessageList";
import { AuthContext } from "./contexts/auth";
import { SendMessageForm } from "./components/SendMessageForm";

export function App() {
  const { user } = useContext(AuthContext);

  return (
    <main className={`${styles.contentWrapper} ${user ? styles.contentSigned : ''}`}>
      <MessageList />
      {!user ? <LoginBox /> : <SendMessageForm />}
    </main>
  );
}
