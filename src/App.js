import Header from "./components/Header";
import "./App.css";
import MoodChanger from "./components/MoodChanger";
import Clock from "./components/Clock";
import SettingsModal from "./components/SettingsModal";

function App() {
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
