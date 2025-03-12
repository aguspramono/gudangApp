import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./component/Header.tsx";
import { Home } from "./pages/Home.tsx";
import { Supplier } from "./pages/Supplier.tsx";
import { Departemen } from "./pages/Departemen.tsx";
import { Lokasi } from "./pages/Lokasi.tsx";
import { Satuan } from "./pages/Satuan.tsx";
import { Gudang } from "./pages/Gudang.tsx";
import { Merk } from "./pages/Merk.tsx";
import { Kategori } from "./pages/Kategori.tsx";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/supplier" element={<Supplier />}></Route>
          <Route path="/departemen" element={<Departemen />}></Route>
          <Route path="/lokasitransfer" element={<Lokasi />}></Route>
          <Route path="/satuan" element={<Satuan />}></Route>
          <Route path="/gudang" element={<Gudang />}></Route>
          <Route path="/merek" element={<Merk />}></Route>
          <Route path="/kategori" element={<Kategori />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
