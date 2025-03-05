import {
  BrowserRouter,
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Supplier } from "./pages/Supplier";

function App() {
  return (
    <BrowserRouter>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/supplier" element={<Supplier />} />
        </Routes>
      </Router>
    </BrowserRouter>
  );
}

export default App;
