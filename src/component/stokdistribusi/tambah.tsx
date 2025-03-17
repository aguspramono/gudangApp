import {
  Spinner,
  Button,
  Modal,
  Form,
  Row,
  Col,
  ButtonToolbar,
  ButtonGroup,
  InputGroup,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  FaFile,
  FaSearch,
  FaPrint,
  FaEdit,
  FaRegSave,
  FaTrash,
  FaSave,
} from "react-icons/fa";
import { createMessage, createMessageConfirm } from "./../../function/Alert";
import { Optionmerkbarang } from "./../global/optionmerekbarang";
import { Optionkategoribarang } from "./../global/optionkategoribarang";
import { Optionsatuanbarang } from "./../global/optionsatuanbarang";
import { Viewdataproduk } from "./../global/databarang";
import { createProduct, updateProduct } from "./../../function/Produk";
import { createProductDetail } from "./../../function/Produkdetail";

export function Createdata() {
  const [show, setShow] = useState(false);
  const [showproduk, setShowproduk] = useState(false);
  const [showrename, setShowRename] = useState(false);
  const [loadSave, setLoadSave] = useState(true);

  const [kodebaranglama, setKodeBarangLama] = useState("");
  const [kodebarangbaru, setKodeBarangBaru] = useState("");

  //set variable save
  const [kodebarangprimary, setKodeBarangPrimary] = useState("");
  const [kodebarang, setKodeBarang] = useState("");
  const [namabarang, setNamaBarang] = useState("");
  const [merekbarang, setMerekBarang] = useState(null);
  const [kategoribarang, setKategoriBarang] = useState(null);
  const [satuanbarang, setSatuanBarang] = useState(null);
  const [spesifikasibarang, setSpesifikasiBarang] = useState("");
  const [minbarang, setMinBarang] = useState(0);
  const [maxbarang, setMaxBarang] = useState(0);
  const [showingbarang, setShowingBarang] = useState(0);
  const [lokasibarang, setLokasiBarang] = useState("");

  const handleClose = () => {
    setShow(false);
  };

  const handleCloseProduk = () => {
    setShowproduk(false);
  };

  const handleCloseRename = () => {
    setShowRename(false);
  };

  const handleShow = () => setShow(true);
  const handleShowProduk = () => setShowproduk(true);
  const handleShowRename = () => setShowRename(true);

  const handleMerk = (e: any) => {
    setMerekBarang(e);
  };

  const handlekategori = (e: any) => {
    setKategoriBarang(e);
  };

  const handlesatuan = (e: any) => {
    setSatuanBarang(e);
  };

  const handleProductDetail = (e: any) => {
    setKodeBarangPrimary(e[0]["Kode"]);
    setKodeBarang(e[0]["Kode"]);
    setNamaBarang(e[0]["Nama"]);
    setMerekBarang(e[0]["Merek"]);
    setKategoriBarang(e[0]["Kategori"]);
    setSatuanBarang(e[0]["Satuan"]);
    setSpesifikasiBarang(e[0]["Spec"]);
    setMinBarang(e[0]["Min"]);
    setMaxBarang(e[0]["Max"]);
    setShowingBarang(e[0]["Showing"]);
    setLokasiBarang(e[0]["Lokasi"]);
    handleCloseProduk();
  };

  const bersih = () => {
    setKodeBarangPrimary("");
    setKodeBarang("");
    setNamaBarang("");
    setMerekBarang(null);
    setKategoriBarang(null);
    setSatuanBarang(null);
    setSpesifikasiBarang("");
    setMinBarang(0);
    setMaxBarang(0);
    setShowingBarang(0);
    setLokasiBarang("");
  };

  const simpanProduct = async () => {
    if (kodebarang === "") {
      createMessage(
        "Perhatian",
        "Kode Barang Belum Lengkap, Periksa Kembali...!!!",
        "error"
      ).then(() => {
        setLoadSave(true);
      });
    } else if (namabarang === "") {
      createMessage(
        "Perhatian",
        "Nama Barang Belum Lengkap, Periksa Kembali...!!!",
        "error"
      ).then(() => {
        setLoadSave(true);
      });
    } else if (merekbarang === null) {
      createMessage(
        "Perhatian",
        "Merek Barang Belum Lengkap, Periksa Kembali...!!!",
        "error"
      ).then(() => {
        setLoadSave(true);
      });
    } else if (kategoribarang === null) {
      createMessage(
        "Perhatian",
        "Kategori Barang Belum Lengkap, Periksa Kembali...!!!",
        "error"
      ).then(() => {
        setLoadSave(true);
      });
    } else if (satuanbarang === null) {
      createMessage(
        "Perhatian",
        "Satuan Barang Belum Lengkap, Periksa Kembali...!!!",
        "error"
      ).then(() => {
        setLoadSave(true);
      });
    } else {
      setLoadSave(false);
      const response = await createProduct(
        kodebarang,
        namabarang,
        merekbarang,
        kategoribarang,
        satuanbarang,
        spesifikasibarang,
        lokasibarang,
        minbarang,
        maxbarang,
        new Date(),
        "admin",
        showingbarang
      );

      await createProductDetail(kodebarang);

      if (response["message"] == "success") {
        createMessage("Success", "Barang berhasil disimpan", "success").then(
          () => {
            bersih();
            setLoadSave(true);
          }
        );
      } else {
        createMessage("Error", "Terjadi kesalahan", "error").then(() => {
          setLoadSave(true);
        });
      }
    }
  };

  const updateProductAct = () => {
    createMessageConfirm(
      "Peringatan",
      "Yakin Data Ini Akan diUpdate, Klik Batal Untuk Batal...!!!?",
      "question",
      "Ubah",
      "Batal"
    ).then(async (result) => {
      if (result == "confirmed") {
        setLoadSave(false);
        const response = await updateProduct(
          kodebarang,
          namabarang,
          String(merekbarang),
          String(kategoribarang),
          String(satuanbarang),
          spesifikasibarang,
          lokasibarang,
          minbarang,
          maxbarang,
          new Date(),
          "admin",
          showingbarang
        );

        if (response["message"] == "success") {
          createMessage("Success", "Barang berhasil diubah", "success").then(
            () => {
              handleClose();
              bersih();
            }
          );
        } else {
          createMessage("Error", "Terjadi kesalahan", "error").then(() => {});
        }
      }
    });
  };

  const ubahKode = () => {
    console.log("Aasasdasd");
  };

  const proseUpdateDataProduct = () => {
    if (kodebarangprimary === "") {
      simpanProduct();
    } else {
      updateProductAct();
    }
    setTimeout(() => {
      setLoadSave(true);
    }, 2000);
  };

  return (
    <div>
      <ButtonToolbar
        className="justify-content-between mb-3"
        aria-label="Toolbar with Button groups"
      >
        <ButtonGroup aria-label="First group">
          <Button variant="info" className="text-white" onClick={handleShow}>
            <FaFile /> Detail Stock / Barang
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
      <Modal
        animation={false}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Detail Stock / Barang
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ButtonGroup className="mb-3">
            <Button variant="light" onClick={bersih}>
              <FaFile /> New
            </Button>
            <Button variant="light">
              <FaPrint /> Print
            </Button>
            <Button variant="light" onClick={handleShowRename}>
              <FaEdit /> Rename
            </Button>
          </ButtonGroup>

          <Form>
            <Form.Label>
              Kode Barang <span className="text-danger">*)</span>
            </Form.Label>
            <InputGroup>
              <Form.Control
                aria-label="Kode Barang"
                type="text"
                value={kodebarang}
                onChange={(mytext) => setKodeBarang(mytext.target.value)}
                disabled={kodebarangprimary === "" ? false : true}
              />

              <Button variant="outline-secondary" onClick={handleShowProduk}>
                <FaSearch />
              </Button>
              <Button variant="outline-secondary">
                <FaPrint />
              </Button>
            </InputGroup>

            <Form.Group className="mt-2" controlId="perkiraanbiayad">
              <Form.Label>
                Nama Barang <span className="text-danger">*)</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={namabarang}
                onChange={(mytext) => setNamaBarang(mytext.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-2" controlId="perkiraanbiayad">
              <Form.Label>
                Merek Barang <span className="text-danger">*)</span>
              </Form.Label>
              <Optionmerkbarang state={merekbarang} onChange={handleMerk} />
            </Form.Group>

            <Row className="mt-2">
              <Form.Group as={Col} className="mt-2" controlId="perkiraanbiayad">
                <Form.Label>
                  Kategori Barang <span className="text-danger">*)</span>
                </Form.Label>
                <Optionkategoribarang
                  state={kategoribarang}
                  onChange={handlekategori}
                />
              </Form.Group>

              <Form.Group as={Col} className="mt-2" controlId="perkiraanbiayad">
                <Form.Label>
                  Satuan <span className="text-danger">*)</span>
                </Form.Label>
                <Optionsatuanbarang
                  state={satuanbarang}
                  onChange={handlesatuan}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mt-2" controlId="perkiraanbiayad">
              <Form.Label>Spesifikasi</Form.Label>
              <Form.Control
                type="text"
                value={spesifikasibarang}
                onChange={(mytext) => setSpesifikasiBarang(mytext.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-2" controlId="perkiraanbiayad">
              <Form.Label>Lokasi</Form.Label>
              <Form.Control
                type="text"
                value={lokasibarang}
                onChange={(mytext) => setLokasiBarang(mytext.target.value)}
              />
            </Form.Group>

            <Row className="mt-2">
              <Form.Group as={Col} className="mt-2" controlId="perkiraanbiayad">
                <Form.Label>Maximum Stock</Form.Label>
                <Form.Control
                  type="number"
                  value={maxbarang}
                  onChange={(mytext) =>
                    setMaxBarang(parseInt(mytext.target.value))
                  }
                />
              </Form.Group>

              <Form.Group as={Col} className="mt-2" controlId="perkiraanbiayad">
                <Form.Label>Minimum Stock</Form.Label>
                <Form.Control
                  type="text"
                  value={minbarang}
                  onChange={(mytext) =>
                    setMinBarang(parseInt(mytext.target.value))
                  }
                />
              </Form.Group>
            </Row>

            <Form.Check
              className="mt-2"
              type="checkbox"
              id="checkboxitem"
              label={`Don't show this item`}
              checked={showingbarang == 0 ? false : true}
              onChange={(e) =>
                e.target.checked == true
                  ? setShowingBarang(1)
                  : setShowingBarang(0)
              }
            />
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
          <div>
            <Button
              variant="primary"
              style={{ marginRight: 5 }}
              onClick={proseUpdateDataProduct}
            >
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                hidden={loadSave}
              />{" "}
              {kodebarangprimary === "" ? <FaRegSave /> : <FaEdit />}
              {kodebarangprimary === "" ? " Simpan" : " Simpan Edit"}
            </Button>
            {kodebarangprimary === "" ? (
              ""
            ) : (
              <Button variant="danger" onClick={handleClose}>
                <FaTrash /> Hapus
              </Button>
            )}
          </div>
        </Modal.Footer>
      </Modal>

      <Modal
        size="lg"
        animation={false}
        show={showproduk}
        onHide={handleCloseProduk}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Pencarian Product / Barang
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Viewdataproduk onClick={handleProductDetail} />
        </Modal.Body>
      </Modal>

      <Modal
        animation={false}
        show={showrename}
        onHide={handleCloseRename}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="bg-secondary"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Ubah kode Produk
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mt-2" controlId="perkiraanbiayad">
              <Form.Label>
                Kode Barang <span className="text-danger">*)</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={kodebaranglama}
                onChange={(mytext) => setKodeBarangLama(mytext.target.value)}
                className="mb-3"
              />
            </Form.Group>

            <Form.Label>
              Kode Barang Baru <span className="text-danger">*)</span>
            </Form.Label>
            <InputGroup>
              <Form.Control
                aria-label="Kode Barang"
                type="text"
                value={kodebarangbaru}
                onChange={(mytext) => setKodeBarangBaru(mytext.target.value)}
              />

              <Button variant="outline-secondary" onClick={ubahKode}>
                <FaSave />
                {" Ubah Kode"}
              </Button>
            </InputGroup>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
