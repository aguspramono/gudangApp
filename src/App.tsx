import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./component/Header.tsx";
import { Home } from "./pages/Home.tsx";
import { Supplier } from "./pages/Supplier.tsx";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/supplier" element={<Supplier />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
