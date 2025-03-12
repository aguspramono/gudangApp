import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { FaAngleRight, FaArtstation } from "react-icons/fa";

function Header() {
  return (
    <div>
      <Navbar expand="sm" className="bg-white shadow mb-3 fixed-top">
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
              <Nav className="justify-content-start flex-grow-1 pe-3">
                <NavDropdown
                  title="Transaksi"
                  id={`offcanvasNavbarDropdown-expand-sm`}
                >
                  <NavDropdown.Item href="#action5">
                    <FaAngleRight /> Pesanan Barang
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action5">
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
                  <NavDropdown.Item href="#action6">
                    <FaAngleRight /> Pindah Saldo Persediaan
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
    </div>
  );
}

export default Header;
