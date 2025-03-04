import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";

function Header() {
  return (
    <>
      <Navbar expand="sm" className="bg-body-tertiary mb-3">
        <Container fluid>
          <Navbar.Brand href="#">GDG</Navbar.Brand>
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
                  <NavDropdown.Item href="#action3">
                    Pesanan Barang
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Order Barang
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action5">
                    Penerimaan Barang
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action6">
                    Pengeluaran Barang
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action6">
                    Penerimaan Mutasi Stok
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action6">
                    Closingan Pesanan Barang
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action6">
                    Closingan Orderan Barang
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action6">
                    Retur Penerimaan
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action6">
                    Stock Adjustment
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action6">
                    Pelunasan Hutang Usaha
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  title="Laporan"
                  id={`offcanvasNavbarDropdown-expand-sm`}
                >
                  <NavDropdown.Item href="#action3">
                    Pesanan Barang
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Order Barang
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action5">
                    Penerimaan
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action6">
                    Retur Penerimaan
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action6">
                    Pengeluaran
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action6">
                    Pengeluaran Mutasi Stock
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action6">
                    Penerimaan Mutasi Stock
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action6">
                    Stock Adjustment
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action6">
                    Posisi Stock/Barang
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action6">
                    Rincian Stock/Barang
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action6">
                    Pelunasan Hutang Usaha
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action6">
                    Pembayaran Hutang
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  title="Data Master"
                  id={`offcanvasNavbarDropdown-expand-sm`}
                >
                  <NavDropdown.Item href="#action3">
                    Setup Stock Distribusi
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Setup Merek Barang
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action5">
                    Setup Kategori Barang
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action6">
                    Setup Gudang Barang
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action6">
                    Setup Satuan Barang
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action6">
                    Setup Lokasi Transfer
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action6">
                    Setup Customer/Pelanggan
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action6">
                    Setup Supplier/Pemasok
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action6">
                    Setup Departemen
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action6">
                    Pindah Saldo Persediaan
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
    </>
  );
}

export default Header;
