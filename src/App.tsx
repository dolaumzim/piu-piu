import "./App.css";
import { GlobalProvider } from "./context/global";
import { PiupiuRoutes } from "./routes/PiupiuRoutes";

function App() {
  return (
    <GlobalProvider>
      <PiupiuRoutes/>
    </GlobalProvider>
  )
}

export default App;
