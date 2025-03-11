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
  getMerkCount,
  getDetailMerk,
  getMerk,
  createMerk,
  updateMerk,
  deleteMerk,
} from "./../function/Merk";
import { createMessage, createMessageConfirm } from "./../function/Alert";

export function Merk() {
  const [show, setShow] = useState(false);
  const [merk, setMerk] = useState([]);
  const [countmerk, setCountmerk] = useState(0);
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
  const [ketmerk, setKetmerk] = useState("");
  const [kodemerk, setKodeMerk] = useState("");

  //useState value data

  const [kodemerkval, setKodemerkval] = useState("");
  const [keteranganval, setKeteranganval] = useState("");

  let limitPage = 0;
  let nextPageAct = 0;
  let dataCount = 0;
  let datacountbyid = 0;

  const bersih = () => {
    setKodeMerk("");
    setKeteranganval("");
    setKodemerkval("");
  };

  async function deleteMerkAct() {
    createMessageConfirm(
      "Peringatan",
      "Yakin ingin menghapus data ini?",
      "question",
      "Hapus",
      "Batal"
    ).then(async (result) => {
      if (result == "confirmed") {
        setLoadDelete(false);

        const response = await deleteMerk(kodemerk);

        if (response["message"] == "success") {
          createMessage("Success", "Merk berhasil dihapus", "success").then(
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

  async function getDataMerkAct(
    like: string,
    limitqueryprev: number,
    limitquery: number
  ) {
    const response = await getMerk(like, limitqueryprev, limitquery);
    setMerk(response);
  }

  async function getCountMerkAct(like: string) {
    const response = await getMerkCount(like);
    setCountmerk(response);
  }

  async function getCountMerkByIDAct(id: string) {
    const response = await getDetailMerk(id);
    datacountbyid = response.length;
  }

  async function getDetailMerkAct(id: string) {
    const response = await getDetailMerk(id);

    response?.map((item: any) => {
      setKodemerkval(item.Merek);
      setKeteranganval(item.Keterangan);
      setKodeMerk(item.Merek);
    });

    handleShow();
  }

  async function saveDataMerkAct() {
    if (kodemerkval === "") {
      createMessage("Error", "Kode gudang tidak boleh kosong", "error").then(
        () => {
          setLoadSave(true);
        }
      );
    } else {
      getCountMerkByIDAct(kodemerkval);
      if (datacountbyid > 0) {
        createMessage("Error", "Kode gudang ini sudah dipakai", "error").then(
          () => {
            setLoadSave(true);
          }
        );
      } else {
        const response = await createMerk(
          kodemerkval,
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

  async function updateDataMerkAct() {
    const response = await updateMerk(
      kodemerkval,
      keteranganval,
      new Date(),
      "admin"
    );

    if (response["message"] == "success") {
      createMessage("Success", "Merek berhasil diubah", "success").then(() => {
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

  const saveMerk = () => {
    if (kodemerk === "") {
      saveDataMerkAct();
    } else {
      updateDataMerkAct();
    }

    setLoadSave(false);
    setTimeout(() => {
      setLoadSave(true);
    }, 2000);
  };

  const nextPage = () => {
    limitPage = Math.ceil(countmerk / 10);

    if (page >= limitPage) {
      setPage(limitPage);
    } else {
      setPage(page + 1);
    }

    nextPageAct = limitQuery + 10;
    setLimitQuery(nextPageAct);

    if (nextPageAct >= countmerk) {
      nextPageAct = countmerk;
      setLimitQuery(nextPageAct);
    }

    getDataMerkAct(ketmerk, nextPageAct, 10);
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

    getDataMerkAct(ketmerk, nextPageAct, 10);
  };

  const firstPage = () => {
    setLimitQuery(0);
    getDataMerkAct(ketmerk, 0, 10);
    setPage(1);
  };

  const lastPage = () => {
    dataCount = countmerk - (countmerk % 10);
    limitPage = Math.ceil(countmerk / 10);

    setLimitQuery(dataCount);
    getDataMerkAct(ketmerk, countmerk - (countmerk % 10), 10);
    setPage(limitPage);
  };

  const loadingDatas = () => {
    setLoadingData(false);
    getCountMerkAct(ketmerk);
    getDataMerkAct(ketmerk, 0, 10);
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
        <Breadcrumb.Item active>Merek</Breadcrumb.Item>
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
            placeholder="Cari Merek [Enter]"
            aria-label="Input group example"
            aria-describedby="btnGroupAddon2"
            onChange={(mytext) => setKetmerk(mytext.target.value)}
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
            {kodemerk === "" ? "Tambah" : "Detail"} Merk
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="kodemerk">
              <Form.Label>Merek</Form.Label>
              <Form.Control
                type="text"
                placeholder="Merek"
                value={kodemerkval}
                onChange={(mytext) => setKodemerkval(mytext.target.value)}
                disabled={kodemerk === "" ? false : true}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="keterangangudang">
              <Form.Label>Keterangan Merek</Form.Label>
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
          <Button variant="primary" onClick={() => saveMerk()}>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              hidden={loadSave}
            />{" "}
            {kodemerk === "" ? <FaRegSave /> : <FaEdit />}
            {kodemerk === "" ? " Simpan" : " Simpan Edit"}
          </Button>
          {kodemerk != "" ? (
            <Button variant="danger" onClick={() => deleteMerkAct()}>
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
          <b> Merek </b>
        </Card.Header>
        <ListGroup variant="flush">
          {merk?.length < 1 ? (
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
            merk?.map((item, i) => {
              return (
                <div key={i}>
                  <ListGroup.Item
                    onDoubleClick={() => getDetailMerkAct(item["Merek"])}
                    style={{ cursor: "pointer" }}
                  >
                    {i + 1 + ". " + item["Merek"]}
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
              Total Data : <strong>{countmerk}</strong>
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
