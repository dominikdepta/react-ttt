import styles from "./App.module.css";
import { Board } from "./components/board";

function App() {
  return (
    <div className={styles.wrapper}>
      <h1>Tic-Tac-Toe</h1>
      <Board />
    </div>
  );
}

export default App;
