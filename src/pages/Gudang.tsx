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
} from "react-icons/fa";

import {
  getGudangCount,
  getDetailGudang,
  getGudang,
  createGudang,
  updateGudang,
  deleteGudang,
} from "./../function/Gudang";
import { createMessage, createMessageConfirm } from "./../function/Alert";

export function Gudang() {
  const [show, setShow] = useState(false);
  const [gudang, setGudang] = useState([]);
  const [countgudang, setCountgudang] = useState(0);
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
  const [ketgudang, setKetgudang] = useState("");
  const [kodegudang, setKodeGudang] = useState("");

  //useState value data

  const [kodegudangval, setKodegudangval] = useState("");
  const [keteranganval, setKeteranganval] = useState("");

  let limitPage = 0;
  let nextPageAct = 0;
  let dataCount = 0;
  let datacountbyid = 0;

  const bersih = () => {
    setKodeGudang("");
    setKeteranganval("");
    setKodegudangval("");
  };

  async function deleteGudangAct() {
    createMessageConfirm(
      "Peringatan",
      "Yakin ingin menghapus data ini?",
      "question",
      "Hapus",
      "Batal"
    ).then(async (result) => {
      if (result == "confirmed") {
        setLoadDelete(false);

        const response = await deleteGudang(kodegudang);

        if (response["message"] == "success") {
          createMessage("Success", "Gudang berhasil dihapus", "success").then(
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

  async function getDataGudangAct(
    like: string,
    limitqueryprev: number,
    limitquery: number
  ) {
    const response = await getGudang(like, limitqueryprev, limitquery);
    setGudang(response);
  }

  async function getCountGudangAct(like: string) {
    const response = await getGudangCount(like);
    setCountgudang(response);
  }

  async function getCountGudangByIDAct(id: string) {
    const response = await getDetailGudang(id);
    datacountbyid = response.length;
  }

  async function getDetailGudangAct(id: string) {
    const response = await getDetailGudang(id);

    response?.map((item: any) => {
      setKodegudangval(item.Gudang);
      setKeteranganval(item.Keterangan);
      setKodeGudang(item.Gudang);
    });

    handleShow();
  }

  async function saveDataGudangAct() {
    if (kodegudangval === "") {
      createMessage("Error", "Kode gudang tidak boleh kosong", "error").then(
        () => {
          setLoadSave(true);
        }
      );
    } else {
      getCountGudangByIDAct(kodegudangval);
      if (datacountbyid > 0) {
        createMessage("Error", "Kode gudang ini sudah dipakai", "error").then(
          () => {
            setLoadSave(true);
          }
        );
      } else {
        const response = await createGudang(
          kodegudangval,
          keteranganval,
          new Date(),
          "admin"
        );

        if (response["message"] == "success") {
          createMessage("Success", "Gudang berhasil disimpan", "success").then(
            () => {
              loadingDatas();
              bersih();
              setLoadSave(true);
            }
          );
        } else {
          createMessage(
            "Error",
            "Terjadi kesalahan, gudang sudah dipakai",
            "error"
          ).then(() => {
            setLoadSave(true);
          });
        }
      }
    }
  }

  async function updateDataGudangAct() {
    const response = await updateGudang(
      kodegudangval,
      keteranganval,
      new Date(),
      "admin"
    );

    if (response["message"] == "success") {
      createMessage("Success", "Gudang berhasil diubah", "success").then(() => {
        loadingDatas();
        bersih();
        setLoadSave(true);
        handleClose();
      });
    } else {
      createMessage("Error", "Terjadi kesalahan", "error").then(() => {
        setLoadSave(true);
      });
    }
  }

  const saveGudang = () => {
    if (kodegudang === "") {
      saveDataGudangAct();
    } else {
      updateDataGudangAct();
    }

    setLoadSave(false);
    setTimeout(() => {
      setLoadSave(true);
    }, 2000);
  };

  const nextPage = () => {
    limitPage = Math.ceil(countgudang / 10);

    if (page >= limitPage) {
      setPage(limitPage);
    } else {
      setPage(page + 1);
    }

    nextPageAct = limitQuery + 10;
    setLimitQuery(nextPageAct);

    if (nextPageAct >= countgudang) {
      nextPageAct = countgudang;
      setLimitQuery(nextPageAct);
    }

    getDataGudangAct(ketgudang, nextPageAct, 10);
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

    getDataGudangAct(ketgudang, nextPageAct, 10);
  };

  const firstPage = () => {
    setLimitQuery(0);
    getDataGudangAct(ketgudang, 0, 10);
    setPage(1);
  };

  const lastPage = () => {
    dataCount = countgudang - (countgudang % 10);
    limitPage = Math.ceil(countgudang / 10);

    setLimitQuery(dataCount);
    getDataGudangAct(ketgudang, countgudang - (countgudang % 10), 10);
    setPage(limitPage);
  };

  const loadingDatas = () => {
    setLoadingData(false);
    getCountGudangAct(ketgudang);
    getDataGudangAct(ketgudang, 0, 10);
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
        <Breadcrumb.Item active>Gudang</Breadcrumb.Item>
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
            placeholder="Cari Gudang [Enter]"
            aria-label="Input group example"
            aria-describedby="btnGroupAddon2"
            onChange={(mytext) => setKetgudang(mytext.target.value)}
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
            {kodegudang === "" ? "Tambah" : "Detail"} Gudang
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="kodegudang">
              <Form.Label>Gudang</Form.Label>
              <Form.Control
                type="text"
                placeholder="Gudang"
                value={kodegudangval}
                onChange={(mytext) => setKodegudangval(mytext.target.value)}
                disabled={kodegudang === "" ? false : true}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="keterangangudang">
              <Form.Label>Keterangan Gudang</Form.Label>
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
          <Button variant="primary" onClick={() => saveGudang()}>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              hidden={loadSave}
            />{" "}
            {kodegudang === "" ? <FaRegSave /> : <FaEdit />}
            {kodegudang === "" ? " Simpan" : " Simpan Edit"}
          </Button>
          {kodegudang != "" ? (
            <Button variant="danger" onClick={() => deleteGudangAct()}>
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
      <Card style={{ width: "100%" }}>
        <Card.Header>
          <b> Gudang </b>
        </Card.Header>
        <ListGroup variant="flush">
          {gudang?.length < 1 ? (
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
            gudang?.map((item, i) => {
              return (
                <div key={i}>
                  <ListGroup.Item
                    onDoubleClick={() => getDetailGudangAct(item["Gudang"])}
                    style={{ cursor: "pointer" }}
                  >
                    {i + 1 + ". " + item["Gudang"]}
                  </ListGroup.Item>
                </div>
              );
            })
          )}
        </ListGroup>
      </Card>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>
          <small>
            <i>
              Total Data : <strong>{countgudang}</strong>
            </i>
          </small>
        </span>

        <span>
          <small>
            <i>klik 2x data untuk detail</i>
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
