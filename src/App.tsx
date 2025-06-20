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
import { Stockdistribusi } from "./pages/Stockdistribusi.tsx";
import { Pesananbarang } from "./pages/Pesananbarang.tsx";
import { Orderbarang } from "./pages/Orderbarang.tsx";
import { Penerimaanbarang } from "./pages/Penerimaanbarang.tsx";
import { Pengeluaranbarang } from "./pages/Pengeluaranbarang.tsx";

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
          <Route path="/stockdistribusi" element={<Stockdistribusi />}></Route>
          <Route path="/pesananbarang" element={<Pesananbarang />}></Route>
          <Route path="/orderbarang" element={<Orderbarang />}></Route>
          <Route
            path="/penerimaanbarang"
            element={<Penerimaanbarang />}
          ></Route>
          <Route
            path="/pengeluaranbarang"
            element={<Pengeluaranbarang />}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
