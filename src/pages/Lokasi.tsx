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
  getLokasiCount,
  getDetailLokasi,
  getLokasi,
  createLokasi,
  updateLokasi,
  deleteLokasi,
} from "./../function/Lokasi";
import { createMessage, createMessageConfirm } from "./../function/Alert";

export function Lokasi() {
  const [show, setShow] = useState(false);
  const [lokasi, setLokasi] = useState([]);
  const [countlok, setCountlok] = useState(0);
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
  const [ketlok, setKetLok] = useState("");
  const [kodelok, setKodeLok] = useState("");

  //useState value data

  const [kodelokval, setKodelokval] = useState("");
  const [keteranganval, setKeteranganval] = useState("");

  let limitPage = 0;
  let nextPageAct = 0;
  let dataCount = 0;
  let datacountbyid = 0;

  const bersih = () => {
    setKodelokval("");
    setKeteranganval("");
    setKodeLok("");
  };

  async function deleteLokAct() {
    createMessageConfirm(
      "Peringatan",
      "Yakin ingin menghapus data ini?",
      "question",
      "Hapus",
      "Batal"
    ).then(async (result) => {
      if (result == "confirmed") {
        setLoadDelete(false);

        const response = await deleteLokasi(kodelok);

        if (response["message"] == "success") {
          createMessage("Success", "Lokasi berhasil dihapus", "success").then(
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

  async function getDataLokAct(
    like: string,
    limitqueryprev: number,
    limitquery: number
  ) {
    const response = await getLokasi(like, limitqueryprev, limitquery);
    setLokasi(response);
  }

  async function getCountLokAct(like: string) {
    const response = await getLokasiCount(like);
    setCountlok(response);
  }

  async function getCountLokByIDAct(id: string) {
    const response = await getDetailLokasi(id);
    datacountbyid = response.length;
  }

  async function getDetailLokAct(id: string) {
    const response = await getDetailLokasi(id);

    response?.map((item: any) => {
      setKodelokval(item.Lokasi);
      setKeteranganval(item.Keterangan);
      setKodeLok(item.Lokasi);
    });

    handleShow();
  }

  async function saveDataLokAct() {
    if (kodelokval === "") {
      createMessage("Error", "Kode lokasi tidak boleh kosong", "error").then(
        () => {
          setLoadSave(true);
        }
      );
    } else {
      getCountLokByIDAct(kodelokval);
      if (datacountbyid > 0) {
        createMessage("Error", "Kode lokasi ini sudah dipakai", "error").then(
          () => {
            setLoadSave(true);
          }
        );
      } else {
        const response = await createLokasi(
          kodelokval,
          keteranganval,
          new Date(),
          "admin"
        );

        if (response["message"] == "success") {
          createMessage("Success", "Lokasi berhasil disimpan", "success").then(
            () => {
              loadingDatas();
              bersih();
              setLoadSave(true);
            }
          );
        } else {
          createMessage(
            "Error",
            "Terjadi kesalahan, kode sudah dipakai",
            "error"
          ).then(() => {
            setLoadSave(true);
          });
        }
      }
    }
  }

  async function updateDataLokAct() {
    if (keteranganval === "") {
      createMessage("Error", "Keterangan tidak boleh kosong", "error").then(
        () => {
          setLoadSave(true);
        }
      );
    } else {
      const response = await updateLokasi(
        kodelokval,
        keteranganval,
        new Date(),
        "admin"
      );

      if (response["message"] == "success") {
        createMessage("Success", "Lokasi berhasil diubah", "success").then(
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
  }

  const saveLok = () => {
    if (kodelok === "") {
      saveDataLokAct();
    } else {
      updateDataLokAct();
    }

    setLoadSave(false);
    setTimeout(() => {
      setLoadSave(true);
    }, 2000);
  };

  const nextPage = () => {
    limitPage = Math.ceil(countlok / 10);

    if (page >= limitPage) {
      setPage(limitPage);
    } else {
      setPage(page + 1);
    }

    nextPageAct = limitQuery + 10;
    setLimitQuery(nextPageAct);

    if (nextPageAct >= countlok) {
      nextPageAct = countlok;
      setLimitQuery(nextPageAct);
    }

    getDataLokAct(ketlok, nextPageAct, 10);
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

    getDataLokAct(ketlok, nextPageAct, 10);
  };

  const firstPage = () => {
    setLimitQuery(0);
    getDataLokAct(ketlok, 0, 10);
    setPage(1);
  };

  const lastPage = () => {
    dataCount = countlok - (countlok % 10);
    limitPage = Math.ceil(countlok / 10);

    setLimitQuery(dataCount);
    getDataLokAct(ketlok, countlok - (countlok % 10), 10);
    setPage(limitPage);
  };

  const loadingDatas = () => {
    setLoadingData(false);
    getCountLokAct(ketlok);
    getDataLokAct(ketlok, 0, 10);
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
        <Breadcrumb.Item active>Lokasi</Breadcrumb.Item>
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
            placeholder="Cari Lokasi [Enter]"
            aria-label="Input group example"
            aria-describedby="btnGroupAddon2"
            onChange={(mytext) => setKetLok(mytext.target.value)}
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
            {kodelok === "" ? "Tambah" : "Detail"} Lokasi
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="kodelokasi">
              <Form.Label>Kode Lokasi</Form.Label>
              <Form.Control
                type="text"
                placeholder="Kode Lokasi"
                value={kodelokval}
                onChange={(mytext) => setKodelokval(mytext.target.value)}
                disabled={kodelok === "" ? false : true}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="keteranganlokasi">
              <Form.Label>Keterangan Lokasi</Form.Label>
              <Form.Control
                type="text"
                placeholder="Keterangan"
                value={keteranganval}
                onChange={(mytext) => setKeteranganval(mytext.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
          <Button variant="primary" onClick={() => saveLok()}>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              hidden={loadSave}
            />{" "}
            {kodelok === "" ? <FaRegSave /> : <FaEdit />}
            {kodelok === "" ? " Simpan" : " Simpan Edit"}
          </Button>
          {kodelok != "" ? (
            <Button variant="danger" onClick={() => deleteLokAct()}>
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
      {lokasi?.length < 1 ? (
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
        lokasi?.map((item, i) => {
          return (
            <div
              className="card"
              key={i}
              style={{ cursor: "pointer", marginTop: 5 }}
            >
              <div className="card-body p-0 p-2 d-flex justify-content-between">
                <span>{item["Lokasi"]}</span>

                <Button
                  variant="light"
                  className="btn-sm text-primary"
                  onClick={() => getDetailLokAct(item["Lokasi"])}
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
              Total Data : <strong>{countlok}</strong>
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
