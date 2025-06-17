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
  getDepartmenCount,
  getDetailDepartemen,
  getDepartemen,
  createDepartemen,
  updateDepartemen,
  deleteDepartemen,
} from "./../function/Departemen";
import { createMessage, createMessageConfirm } from "./../function/Alert";

export function Departemen() {
  const [show, setShow] = useState(false);
  const [departemen, setDepartemen] = useState([]);
  const [countdepart, setCountdepart] = useState(0);
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
  const [ketdepart, setKetDepart] = useState("");
  const [kodedepart, setKodeDepart] = useState("");

  //useState value data

  const [kodedepartval, setKodedepartval] = useState("");
  const [keteranganval, setKeteranganval] = useState("");

  let limitPage = 0;
  let nextPageAct = 0;
  let dataCount = 0;
  let datacountbyid = 0;

  const bersih = () => {
    setKodedepartval("");
    setKeteranganval("");
    setKodeDepart("");
  };

  async function deleteDepartAct() {
    createMessageConfirm(
      "Peringatan",
      "Yakin ingin menghapus data ini?",
      "question",
      "Hapus",
      "Batal"
    ).then(async (result) => {
      if (result == "confirmed") {
        setLoadDelete(false);

        const response = await deleteDepartemen(kodedepart);

        if (response["message"] == "success") {
          createMessage(
            "Success",
            "Departemen berhasil dihapus",
            "success"
          ).then(() => {
            loadingDatas();
            bersih();
            handleClose();
          });
        } else {
          createMessage("Error", "Terjadi kesalahan", "error").then(() => {});
        }
      }
    });

    setTimeout(() => {
      setLoadDelete(true);
    }, 2000);
  }

  async function getDataDepartemenAct(
    like: string,
    limitqueryprev: number,
    limitquery: number
  ) {
    const response = await getDepartemen(like, limitqueryprev, limitquery);
    setDepartemen(response);
  }

  async function getCountDepartemenAct(like: string) {
    const response = await getDepartmenCount(like);
    setCountdepart(response);
  }

  async function getCountDepartemenByIDAct(id: string) {
    const response = await getDetailDepartemen(id);
    datacountbyid = response.length;
  }

  async function getDetailDepartemenAct(id: string) {
    const response = await getDetailDepartemen(id);

    response?.map((item: any) => {
      setKodedepartval(item.Departemen);
      setKeteranganval(item.Keterangan);
      setKodeDepart(item.Departemen);
    });

    handleShow();
  }

  async function saveDataDepartemenAct() {
    if (kodedepartval === "") {
      createMessage(
        "Error",
        "Kode Departemen tidak boleh kosong",
        "error"
      ).then(() => {
        setLoadSave(true);
      });
    } else if (keteranganval === "") {
      createMessage("Error", "Keterangan tidak boleh kosong", "error").then(
        () => {
          setLoadSave(true);
        }
      );
    } else {
      getCountDepartemenByIDAct(kodedepartval);
      if (datacountbyid > 0) {
        createMessage(
          "Error",
          "Kode departemen ini sudah dipakai",
          "error"
        ).then(() => {
          setLoadSave(true);
        });
      } else {
        const response = await createDepartemen(
          kodedepartval,
          keteranganval,
          new Date(),
          "admin"
        );

        if (response["message"] == "success") {
          createMessage(
            "Success",
            "Departemen berhasil disimpan",
            "success"
          ).then(() => {
            loadingDatas();
            bersih();
            setLoadSave(true);
          });
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

  async function updateDataDepartemenAct() {
    if (keteranganval === "") {
      createMessage("Error", "Nama tidak boleh kosong", "error").then(() => {
        setLoadSave(true);
      });
    } else {
      const response = await updateDepartemen(
        kodedepartval,
        keteranganval,
        new Date(),
        "admin"
      );

      if (response["message"] == "success") {
        createMessage("Success", "Departemen berhasil diubah", "success").then(
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

  const saveDepartemen = () => {
    if (kodedepart === "") {
      saveDataDepartemenAct();
    } else {
      updateDataDepartemenAct();
    }

    setLoadSave(false);
    setTimeout(() => {
      setLoadSave(true);
    }, 2000);
  };

  const nextPage = () => {
    limitPage = Math.ceil(countdepart / 10);

    if (page >= limitPage) {
      setPage(limitPage);
    } else {
      setPage(page + 1);
    }

    nextPageAct = limitQuery + 10;
    setLimitQuery(nextPageAct);

    if (nextPageAct >= countdepart) {
      nextPageAct = countdepart;
      setLimitQuery(nextPageAct);
    }

    getDataDepartemenAct(ketdepart, nextPageAct, 10);
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

    getDataDepartemenAct(ketdepart, nextPageAct, 10);
  };

  const firstPage = () => {
    setLimitQuery(0);
    getDataDepartemenAct(ketdepart, 0, 10);
    setPage(1);
  };

  const lastPage = () => {
    dataCount = countdepart - (countdepart % 10);
    limitPage = Math.ceil(countdepart / 10);

    setLimitQuery(dataCount);
    getDataDepartemenAct(ketdepart, countdepart - (countdepart % 10), 10);
    setPage(limitPage);
  };

  const loadingDatas = () => {
    setLoadingData(false);
    getCountDepartemenAct(ketdepart);
    getDataDepartemenAct(ketdepart, 0, 10);
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
        <Breadcrumb.Item active>Departemen</Breadcrumb.Item>
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
            placeholder="Cari Departemen [Enter]"
            aria-label="Input group example"
            aria-describedby="btnGroupAddon2"
            onChange={(mytext) => setKetDepart(mytext.target.value)}
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
            {kodedepart === "" ? "Tambah" : "Detail"} Departemen
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="namadepartemen">
              <Form.Label>Kode Departemen</Form.Label>
              <Form.Control
                type="text"
                placeholder="Kode Departemen"
                value={kodedepartval}
                onChange={(mytext) => setKodedepartval(mytext.target.value)}
                disabled={kodedepart === "" ? false : true}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="keterangandepartemen">
              <Form.Label>Keterangan Departemen</Form.Label>
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
          <Button variant="primary" onClick={() => saveDepartemen()}>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              hidden={loadSave}
            />{" "}
            {kodedepart === "" ? <FaRegSave /> : <FaEdit />}
            {kodedepart === "" ? " Simpan" : " Simpan Edit"}
          </Button>
          {kodedepart != "" ? (
            <Button variant="danger" onClick={() => deleteDepartAct()}>
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

      {departemen?.length < 1 ? (
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
        departemen?.map((item, i) => {
          return (
            <div
              className="card"
              key={i}
              style={{ cursor: "pointer", marginTop: 5 }}
            >
              <div className="card-body p-0 p-2 d-flex justify-content-between">
                <span>{item["Keterangan"]}</span>
                <Button
                  variant="light"
                  className="btn-sm text-primary"
                  onClick={() => getDetailDepartemenAct(item["Departemen"])}
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
              Total Data : <strong>{countdepart}</strong>
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
