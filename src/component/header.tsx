import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { FaAngleRight, FaArtstation } from "react-icons/fa";
import { getPeriode, updatePeriode } from "./../function/Periode";
import { createMessage, createMessageConfirm } from "./../function/Alert";
import { Pindahsaldo } from "./../pages/Pindahsaldo";
import { useState, useEffect } from "react";

function Header() {
  const [showmodal, setShowModal] = useState(false);
  const reopenperiode = async () => {
    const cekperiode = await getPeriode();
    if (cekperiode?.length > 0) {
      createMessageConfirm(
        "Peringatan",
        "Yakin Periode : " +
          cekperiode[0]["Periode"] +
          " dari " +
          cekperiode[0]["Tgl"] +
          " s/d " +
          cekperiode[0]["Tgl1"] +
          " akan diaktifkan kembali?",
        "question",
        "Ya, Aktifkan",
        "Batal"
      ).then(async (result) => {
        if (result == "confirmed") {
          const updateperiode = await updatePeriode(
            parseInt(cekperiode[0]["Periode"])
          );

          if (updateperiode["message"] == "success") {
            createMessage(
              "Success",
              "Proses Re-Open Periode Selesai",
              "success"
            ).then(() => {});
          } else {
            createMessage("Error", "Terjadi kesalahan", "error").then(() => {});
          }
        }
      });
    }
  };

  const handleShowPindahSaldo = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Navbar expand="sm" className="bg-white shadow fixed-top mb-3">
        <Container fluid>
          <Navbar.Brand href="/home">
            <FaArtstation /> <span style={{ fontWeight: "bold" }}>GDG</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-sm`}
            aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                Master Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-grow-1 justify-content-start pe-3">
                <NavDropdown
                  title="Transaksi"
                  id={`offcanvasNavbarDropdown-expand-sm`}
                >
                  <NavDropdown.Item href="/pesananbarang">
                    <FaAngleRight /> Pesanan Barang
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/orderbarang">
                    <FaAngleRight /> Order Barang
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action5">
                    <FaAngleRight /> Penerimaan Barang
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action6">
                    <FaAngleRight /> Pengeluaran Barang
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action6">
                    <FaAngleRight /> Penerimaan Mutasi Stok
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action6">
                    <FaAngleRight /> Closingan Pesanan Barang
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action6">
                    <FaAngleRight /> Closingan Orderan Barang
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action6">
                    <FaAngleRight /> Retur Penerimaan
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action6">
                    <FaAngleRight /> Stock Adjustment
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action6">
                    <FaAngleRight /> Pelunasan Hutang Usaha
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  title="Laporan"
                  id={`offcanvasNavbarDropdown-expand-sm`}
                >
                  <NavDropdown.Item href="#action3">
                    <FaAngleRight /> Pesanan Barang
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    <FaAngleRight /> Order Barang
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action5">
                    <FaAngleRight /> Penerimaan
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action6">
                    <FaAngleRight /> Retur Penerimaan
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action6">
                    <FaAngleRight /> Pengeluaran
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action6">
                    <FaAngleRight /> Pengeluaran Mutasi Stock
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action6">
                    <FaAngleRight /> Penerimaan Mutasi Stock
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action6">
                    <FaAngleRight /> Stock Adjustment
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action6">
                    <FaAngleRight /> Posisi Stock/Barang
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action6">
                    <FaAngleRight /> Rincian Stock/Barang
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action6">
                    <FaAngleRight /> Pelunasan Hutang Usaha
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action6">
                    <FaAngleRight /> Pembayaran Hutang
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  title="Data Master"
                  id={`offcanvasNavbarDropdown-expand-sm`}
                >
                  <NavDropdown.Item href="/stockdistribusi">
                    <FaAngleRight /> Setup Stock Distribusi
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/merek">
                    <FaAngleRight /> Setup Merek Barang
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/kategori">
                    <FaAngleRight /> Setup Kategori Barang
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/gudang">
                    <FaAngleRight /> Setup Gudang Barang
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/satuan">
                    <FaAngleRight /> Setup Satuan Barang
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/lokasitransfer">
                    <FaAngleRight /> Setup Lokasi Transfer
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/supplier">
                    <FaAngleRight /> Setup Supplier/Pemasok
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/departemen">
                    <FaAngleRight /> Setup Departemen
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => handleShowPindahSaldo()}>
                    <FaAngleRight /> Pindah Saldo Persediaan
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() =>
                      createMessage(
                        "Info",
                        "Fitur Belum Tersedia",
                        "info"
                      ).then(() => {})
                    }
                  >
                    <FaAngleRight /> Reupdate HPP (Mutasi & Adjustment)
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => reopenperiode()}>
                    <FaAngleRight /> Reopen Periode
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              {/* <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form> */}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Pindahsaldo show={showmodal} onHide={handleHideModal} />
    </div>
  );
}

export default Header;
