import {
  ListGroup,
  Breadcrumb,
  Card,
  Button,
  ButtonGroup,
  ButtonToolbar,
  InputGroup,
  Form,
  Modal,
  Spinner,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  FaFileMedical,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaRegSave,
  FaEdit,
  FaRegTrashAlt,
  FaCaretDown,
  FaEye,
} from "react-icons/fa";

import {
  getKategoriCount,
  getDetailKategori,
  getKategori,
  createKategori,
  updateKategori,
  deleteKategori,
} from "./../function/Kategori";
import { createMessage, createMessageConfirm } from "./../function/Alert";

export function Kategori() {
  const [show, setShow] = useState(false);
  const [kategori, setKategori] = useState([]);
  const [countkategori, setCountkategori] = useState(0);
  const handleClose = () => {
    setShow(false), bersih();
  };
  const handleShow = () => setShow(true);
  const [noData, setNoData] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  const [loadSave, setLoadSave] = useState(true);
  const [loadDelete, setLoadDelete] = useState(true);
  const [page, setPage] = useState(1);
  const [limitQuery, setLimitQuery] = useState(0);
  const [ketkategori, setKetkategori] = useState("");
  const [kodekategori, setKodeKategori] = useState("");

  //useState value data

  const [kodekategorival, setKodekategorival] = useState("");
  const [tnoakunstock, setTnoakunstock] = useState("");
  const [tnoakunkas, setTnoakunkas] = useState("");
  const [tnoakunhutang, setTnoakunhutang] = useState("");
  const [knoakunbiaya, setKnoakunbiaya] = useState("");
  const [knoakunstock, setKnoakunstock] = useState("");
  const [anoakunbiaya, setAnoakunbiaya] = useState("");
  const [anoakunstock, setAnoakunstock] = useState("");
  //const [keteranganval, setKeteranganval] = useState("");

  let limitPage = 0;
  let nextPageAct = 0;
  let dataCount = 0;
  let datacountbyid = 0;

  const bersih = () => {
    setKodeKategori("");
    setKodekategorival("");
    setTnoakunstock("");
    setTnoakunkas("");
    setTnoakunhutang("");
    setKnoakunbiaya("");
    setKnoakunstock("");
    setAnoakunbiaya("");
    setAnoakunstock("");
    //setKeteranganval("");
  };

  async function deleteKategoriAct() {
    createMessageConfirm(
      "Peringatan",
      "Yakin ingin menghapus data ini?",
      "question",
      "Hapus",
      "Batal"
    ).then(async (result) => {
      if (result == "confirmed") {
        setLoadDelete(false);

        const response = await deleteKategori(kodekategori);

        if (response["message"] == "success") {
          createMessage("Success", "Kategori berhasil dihapus", "success").then(
            () => {
              loadingDatas();
              bersih();
              handleClose();
            }
          );
        } else {
          createMessage("Error", "Terjadi kesalahan", "error").then(() => {});
        }
      }
    });

    setTimeout(() => {
      setLoadDelete(true);
    }, 2000);
  }

  async function getDataKategoriAct(
    like: string,
    limitqueryprev: number,
    limitquery: number
  ) {
    const response = await getKategori(like, limitqueryprev, limitquery);
    setKategori(response);
  }

  async function getCountKategoriAct(like: string) {
    const response = await getKategoriCount(like);
    setCountkategori(response);
  }

  async function getCountKategoriByIDAct(id: string) {
    const response = await getDetailKategori(id);
    datacountbyid = response.length;
  }

  async function getDetailKategoriAct(id: string) {
    const response = await getDetailKategori(id);

    response?.map((item: any) => {
      setKodeKategori(item.Kategori);
      setKodekategorival(item.Kategori);
      setTnoakunstock(item.t_NoAkunStock);
      setTnoakunkas(item.t_NoAkunKas);
      setTnoakunhutang(item.t_NoAkunHutang);
      setKnoakunbiaya(item.k_NoAkunBiaya);
      setKnoakunstock(item.k_NoAkunStock);
      setAnoakunbiaya(item.a_NoAkunBiaya);
      setAnoakunstock(item.a_NoAkunStock);
      //setKeteranganval(item.Keterangan);
    });

    handleShow();
  }

  async function saveDataKategorigAct() {
    if (kodekategorival === "") {
      createMessage("Error", "kategori tidak boleh kosong", "error").then(
        () => {
          setLoadSave(true);
        }
      );
    } else {
      getCountKategoriByIDAct(kodekategorival);
      if (datacountbyid > 0) {
        createMessage("Error", "kategori ini sudah dipakai", "error").then(
          () => {
            setLoadSave(true);
          }
        );
      } else {
        const response = await createKategori(
          kodekategorival,
          tnoakunstock,
          tnoakunkas,
          tnoakunhutang,
          knoakunbiaya,
          knoakunstock,
          anoakunbiaya,
          anoakunstock,
          "-",
          new Date(),
          "admin"
        );

        if (response["message"] == "success") {
          createMessage(
            "Success",
            "Kategori berhasil disimpan",
            "success"
          ).then(() => {
            loadingDatas();
            bersih();
            setLoadSave(true);
          });
        } else {
          createMessage(
            "Error",
            "Terjadi kesalahan, kategori sudah dipakai",
            "error"
          ).then(() => {
            setLoadSave(true);
          });
        }
      }
    }
  }

  async function updateDataKategoriAct() {
    const response = await updateKategori(
      kodekategorival,
      tnoakunstock,
      tnoakunkas,
      tnoakunhutang,
      knoakunbiaya,
      knoakunstock,
      anoakunbiaya,
      anoakunstock,
      "-",
      new Date(),
      "admin"
    );

    if (response["message"] == "success") {
      createMessage("Success", "Kategori berhasil diubah", "success").then(
        () => {
          loadingDatas();
          bersih();
          setLoadSave(true);
          handleClose();
        }
      );
    } else {
      createMessage("Error", "Terjadi kesalahan", "error").then(() => {
        setLoadSave(true);
      });
    }
  }

  const saveKategori = () => {
    if (kodekategori === "") {
      saveDataKategorigAct();
    } else {
      updateDataKategoriAct();
    }

    setLoadSave(false);
    setTimeout(() => {
      setLoadSave(true);
    }, 2000);
  };

  const nextPage = () => {
    limitPage = Math.ceil(countkategori / 10);

    if (page >= limitPage) {
      setPage(limitPage);
    } else {
      setPage(page + 1);
    }

    nextPageAct = limitQuery + 10;
    setLimitQuery(nextPageAct);

    if (nextPageAct >= countkategori) {
      nextPageAct = countkategori;
      setLimitQuery(nextPageAct);
    }

    getDataKategoriAct(ketkategori, nextPageAct, 10);
  };

  const prevPage = () => {
    if (page <= 1) {
      setPage(1);
    } else {
      setPage(page - 1);
    }

    if (limitQuery % 10 != 0) {
      nextPageAct = Math.floor(limitQuery / 10) * 10;
    } else {
      nextPageAct = limitQuery - 10;
    }
    setLimitQuery(nextPageAct);
    if (nextPageAct < 1) {
      nextPageAct = 0;
      setLimitQuery(nextPageAct);
    }

    getDataKategoriAct(ketkategori, nextPageAct, 10);
  };

  const firstPage = () => {
    setLimitQuery(0);
    getDataKategoriAct(ketkategori, 0, 10);
    setPage(1);
  };

  const lastPage = () => {
    dataCount = countkategori - (countkategori % 10);
    limitPage = Math.ceil(countkategori / 10);

    setLimitQuery(dataCount);
    getDataKategoriAct(ketkategori, countkategori - (countkategori % 10), 10);
    setPage(limitPage);
  };

  const loadingDatas = () => {
    setLoadingData(false);
    getCountKategoriAct(ketkategori);
    getDataKategoriAct(ketkategori, 0, 10);
    setNoData("");
    setPage(1);
    setTimeout(() => {
      setLoadingData(true);
      setNoData("Data Tidak Ditemukan");
    }, 5000);
  };

  useEffect(() => {
    loadingDatas();
  }, []);

  return (
    <div style={{ paddingLeft: 20, paddingRight: 20, marginTop: "80px" }}>
      <Breadcrumb>
        <Breadcrumb.Item href="/home">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item active>kategori</Breadcrumb.Item>
      </Breadcrumb>
      <ButtonToolbar
        className="justify-content-between mb-3"
        aria-label="Toolbar with Button groups"
      >
        <ButtonGroup aria-label="First group">
          <Button variant="info" className="text-white" onClick={handleShow}>
            <FaFileMedical /> Tambah
          </Button>
        </ButtonGroup>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Cari Kategori [Enter]"
            aria-label="Input group example"
            aria-describedby="btnGroupAddon2"
            onChange={(mytext) => setKetkategori(mytext.target.value)}
            onKeyUp={(event: { key: string }) => {
              if (event.key === "Enter") {
                loadingDatas();
              }
            }}
          />
        </InputGroup>
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
            {kodekategori === "" ? "Tambah" : "Detail"} Kategori
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="kodekategori">
              <Form.Label>Kategori</Form.Label>
              <Form.Control
                type="text"
                placeholder="Kategori"
                value={kodekategorival}
                onChange={(mytext) => setKodekategorival(mytext.target.value)}
                disabled={kodekategori === "" ? false : true}
              />
            </Form.Group>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <span style={{ color: "red" }}>
                <strong> Penerimaan Barang </strong>
              </span>
            </div>
            <Form.Group className="mb-3" controlId="perkiraanstokd">
              <Form.Label>Perkiraan Stok (D)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Perkiraan Stok"
                value={tnoakunstock}
                onChange={(mytext) => setTnoakunstock(mytext.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="perkiraankask">
              <Form.Label>Perkiraan Kas (K)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Perkiraan Kas"
                value={tnoakunkas}
                onChange={(mytext) => setTnoakunkas(mytext.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="perkiraanhutangk">
              <Form.Label>Perkiraan Hutang (K)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Perkiraan Hutang"
                value={tnoakunhutang}
                onChange={(mytext) => setTnoakunhutang(mytext.target.value)}
              />
            </Form.Group>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <span style={{ color: "red" }}>
                <strong> Pengeluaran Barang </strong>
              </span>
            </div>
            <Form.Group className="mb-3" controlId="perkiraanbiayad">
              <Form.Label>Perkiraan Biaya (D)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Perkiraan Biaya"
                value={knoakunbiaya}
                onChange={(mytext) => setKnoakunbiaya(mytext.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="perkiraanstockk">
              <Form.Label>Perkiraan Stock (K)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Perkiraan Stock"
                value={knoakunstock}
                onChange={(mytext) => setKnoakunstock(mytext.target.value)}
              />
            </Form.Group>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <span style={{ color: "red" }}>
                <strong> Adjustment</strong>
              </span>
            </div>
            <Form.Group className="mb-3" controlId="perkiraanbiayaadjd">
              <Form.Label>Perkiraan Biaya (D)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Perkiraan Biaya"
                value={anoakunbiaya}
                onChange={(mytext) => setAnoakunbiaya(mytext.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="perkiraanstockk">
              <Form.Label>Perkiraan Stock (K)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Perkiraan Stock"
                value={anoakunstock}
                onChange={(mytext) => setAnoakunstock(mytext.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
          <Button variant="primary" onClick={() => saveKategori()}>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              hidden={loadSave}
            />{" "}
            {kodekategori === "" ? <FaRegSave /> : <FaEdit />}
            {kodekategori === "" ? " Simpan" : " Simpan Edit"}
          </Button>
          {kodekategori != "" ? (
            <Button variant="danger" onClick={() => deleteKategoriAct()}>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                hidden={loadDelete}
              />{" "}
              <FaRegTrashAlt /> Hapus
            </Button>
          ) : (
            ""
          )}
        </Modal.Footer>
      </Modal>

      {kategori?.length < 1 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          <Spinner
            animation="border"
            role="status"
            variant="primary"
            hidden={loadingData}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <span>{noData}</span>
        </div>
      ) : (
        kategori?.map((item, i) => {
          return (
            <div
              className="card"
              key={i}
              style={{ cursor: "pointer", marginTop: 5 }}
            >
              <div className="card-body p-0 p-2 d-flex justify-content-between">
                <span>{item["Kategori"]}</span>

                <Button
                  variant="light"
                  className="btn-sm text-primary"
                  onClick={() => getDetailKategoriAct(item["Kategori"])}
                >
                  <FaEye />
                </Button>
              </div>
            </div>
          );
        })
      )}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>
          <small>
            <i>
              Total Data : <strong>{countkategori}</strong>
            </i>
          </small>
        </span>
      </div>
      <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
        <ButtonGroup aria-label="Basic example">
          <Button variant="light" onClick={() => firstPage()}>
            <FaAngleDoubleLeft />
          </Button>
          <Button variant="light" onClick={() => prevPage()}>
            <FaAngleLeft />
          </Button>
          <Button variant="primary">{page}</Button>
          <Button variant="light" onClick={() => nextPage()}>
            <FaAngleRight />
          </Button>
          <Button variant="light" onClick={() => lastPage()}>
            <FaAngleDoubleRight />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
