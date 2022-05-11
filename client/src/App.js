import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./components/Chat/Chat";
import Join from "./components/Join/Join";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="chat" exact element={<Chat />} />
          <Route path="/" element={<Join />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
