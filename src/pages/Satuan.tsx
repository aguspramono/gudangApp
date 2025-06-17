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
  getSatuanCount,
  getDetailSatuan,
  getSatuan,
  createSatuan,
  updateSatuan,
  deleteSatuan,
} from "./../function/Satuan";
import { createMessage, createMessageConfirm } from "./../function/Alert";

export function Satuan() {
  const [show, setShow] = useState(false);
  const [satuan, setSatuan] = useState([]);
  const [countsatuan, setCountsatuan] = useState(0);
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
  const [ketsatuan, setKetsatuan] = useState("");
  const [kodesatuan, setKodeSatuan] = useState("");

  //useState value data

  const [kodesatuanval, setKodesatuanval] = useState("");
  const [keteranganval, setKeteranganval] = useState("");

  let limitPage = 0;
  let nextPageAct = 0;
  let dataCount = 0;
  let datacountbyid = 0;

  const bersih = () => {
    setKodeSatuan("");
    setKeteranganval("");
    setKodesatuanval("");
  };

  async function deleteSatuanAct() {
    createMessageConfirm(
      "Peringatan",
      "Yakin ingin menghapus data ini?",
      "question",
      "Hapus",
      "Batal"
    ).then(async (result) => {
      if (result == "confirmed") {
        setLoadDelete(false);

        const response = await deleteSatuan(kodesatuan);

        if (response["message"] == "success") {
          createMessage("Success", "Satuan berhasil dihapus", "success").then(
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

  async function getDataSatuanAct(
    like: string,
    limitqueryprev: number,
    limitquery: number
  ) {
    const response = await getSatuan(like, limitqueryprev, limitquery);
    setSatuan(response);
  }

  async function getCountSatuanAct(like: string) {
    const response = await getSatuanCount(like);
    setCountsatuan(response);
  }

  async function getCountSatuanByIDAct(id: string) {
    const response = await getDetailSatuan(id);
    datacountbyid = response.length;
  }

  async function getDetailSatuanAct(id: string) {
    const response = await getDetailSatuan(id);

    response?.map((item: any) => {
      setKodesatuanval(item.Satuan);
      setKeteranganval(item.Keterangan);
      setKodeSatuan(item.Satuan);
    });

    handleShow();
  }

  async function saveDataSatuanAct() {
    if (kodesatuanval === "") {
      createMessage("Error", "Kode satuan tidak boleh kosong", "error").then(
        () => {
          setLoadSave(true);
        }
      );
    } else {
      getCountSatuanByIDAct(kodesatuanval);
      if (datacountbyid > 0) {
        createMessage("Error", "Kode satuan ini sudah dipakai", "error").then(
          () => {
            setLoadSave(true);
          }
        );
      } else {
        const response = await createSatuan(
          kodesatuanval,
          keteranganval,
          new Date(),
          "admin"
        );

        if (response["message"] == "success") {
          createMessage("Success", "Satuan berhasil disimpan", "success").then(
            () => {
              loadingDatas();
              bersih();
              setLoadSave(true);
            }
          );
        } else {
          createMessage(
            "Error",
            "Terjadi kesalahan, satuan sudah dipakai",
            "error"
          ).then(() => {
            setLoadSave(true);
          });
        }
      }
    }
  }

  async function updateDataSatuanAct() {
    const response = await updateSatuan(
      kodesatuanval,
      keteranganval,
      new Date(),
      "admin"
    );

    if (response["message"] == "success") {
      createMessage("Success", "Satuan berhasil diubah", "success").then(() => {
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

  const saveSatuan = () => {
    if (kodesatuan === "") {
      saveDataSatuanAct();
    } else {
      updateDataSatuanAct();
    }

    setLoadSave(false);
    setTimeout(() => {
      setLoadSave(true);
    }, 2000);
  };

  const nextPage = () => {
    limitPage = Math.ceil(countsatuan / 10);

    if (page >= limitPage) {
      setPage(limitPage);
    } else {
      setPage(page + 1);
    }

    nextPageAct = limitQuery + 10;
    setLimitQuery(nextPageAct);

    if (nextPageAct >= countsatuan) {
      nextPageAct = countsatuan;
      setLimitQuery(nextPageAct);
    }

    getDataSatuanAct(ketsatuan, nextPageAct, 10);
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

    getDataSatuanAct(ketsatuan, nextPageAct, 10);
  };

  const firstPage = () => {
    setLimitQuery(0);
    getDataSatuanAct(ketsatuan, 0, 10);
    setPage(1);
  };

  const lastPage = () => {
    dataCount = countsatuan - (countsatuan % 10);
    limitPage = Math.ceil(countsatuan / 10);

    setLimitQuery(dataCount);
    getDataSatuanAct(ketsatuan, countsatuan - (countsatuan % 10), 10);
    setPage(limitPage);
  };

  const loadingDatas = () => {
    setLoadingData(false);
    getCountSatuanAct(ketsatuan);
    getDataSatuanAct(ketsatuan, 0, 10);
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
        <Breadcrumb.Item active>Satuan</Breadcrumb.Item>
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
            placeholder="Cari Satuan [Enter]"
            aria-label="Input group example"
            aria-describedby="btnGroupAddon2"
            onChange={(mytext) => setKetsatuan(mytext.target.value)}
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
            {kodesatuan === "" ? "Tambah" : "Detail"} Satuan
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="kodesatuan">
              <Form.Label>Satuan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Satuan"
                value={kodesatuanval}
                onChange={(mytext) => setKodesatuanval(mytext.target.value)}
                disabled={kodesatuan === "" ? false : true}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="keterangansatuan">
              <Form.Label>Keterangan Satuan</Form.Label>
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
          <Button variant="primary" onClick={() => saveSatuan()}>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              hidden={loadSave}
            />{" "}
            {kodesatuan === "" ? <FaRegSave /> : <FaEdit />}
            {kodesatuan === "" ? " Simpan" : " Simpan Edit"}
          </Button>
          {kodesatuan != "" ? (
            <Button variant="danger" onClick={() => deleteSatuanAct()}>
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
      {satuan?.length < 1 ? (
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
        satuan?.map((item, i) => {
          return (
            <div
              className="card"
              key={i}
              style={{ cursor: "pointer", marginTop: 5 }}
            >
              <div className="card-body p-0 p-2 d-flex justify-content-between">
                <span>{item["Satuan"]}</span>
                <Button
                  variant="light"
                  className="btn-sm text-primary"
                  onClick={() => getDetailSatuanAct(item["Satuan"])}
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
              Total Data : <strong>{countsatuan}</strong>
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
