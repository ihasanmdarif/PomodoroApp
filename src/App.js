import Header from "./components/Header";
import "./App.css";
import { useContext } from "react";
import { AppContext } from "./AppProvider";
import MoodChanger from "./components/MoodChanger";
import Clock from "./components/Clock";
import SettingsModal from "./components/SettingsModal";

function App() {
  const { toggleTheme, currentTheme } = useContext(AppContext);
  return (
    <div className="App">
      <Header />
      <MoodChanger />
      <Clock />
      <SettingsModal />
    </div>
  );
}

export default App;
