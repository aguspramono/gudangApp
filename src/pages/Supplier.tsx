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
} from "react-icons/fa";

import {
  getSupplier,
  getSupplierNoFilt,
  createSupplier,
  getMaxNoAcc,
  getSupplierId,
  updateSupplier,
  deleteSupplier,
} from "./../function/Supplier";
import { createMessage, createMessageConfirm } from "./../function/Alert";

export function Supplier() {
  const [show, setShow] = useState(false);
  const [supplier, setSupplier] = useState([]);
  const [suppliernoFilter, setSuppliernoFilter] = useState(0);
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
  const [nama, setNama] = useState("");
  const [noacc, setNoAcc] = useState("");
  const [optionfilter, setoptionfilter] = useState("Nama");

  //useState value data

  const [noaccval, setNoAccVal] = useState("");
  const [namaval, setNamaVal] = useState("");
  const [alamatval, setAlamatVal] = useState("");
  const [kotaval, setKotaVal] = useState("");
  const [teleponval, SetTeleponVal] = useState("");
  const [emailval, setEmailVal] = useState("");
  const [contactval, setContactval] = useState("");

  let limitPage = 0;
  let nextPageAct = 0;
  let dataCount = 0;

  const bersih = () => {
    setNoAccVal("");
    setNamaVal("");
    setAlamatVal("");
    setKotaVal("");
    SetTeleponVal("");
    setEmailVal("");
    setContactval("");
  };

  async function deleteDataSupplier() {
    createMessageConfirm(
      "Peringatan",
      "Yakin ingin menghapus data ini?",
      "question",
      "Hapus",
      "Batal"
    ).then(async (result) => {
      if (result == "confirmed") {
        setLoadDelete(false);

        const response = await deleteSupplier(noaccval);

        if (response["message"] == "success") {
          createMessage("Success", "Supplier berhasil dihapus", "success").then(
            () => {
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

  async function getDataSupplier(
    like: string,
    limitqueryprev: number,
    limitquery: number
  ) {
    const response = await getSupplier(
      like,
      limitqueryprev,
      limitquery,
      optionfilter
    );
    setSupplier(response);
  }

  async function getDataSupplierNoFilt(like: string) {
    const response = await getSupplierNoFilt(like, optionfilter);
    setSuppliernoFilter(response);
  }

  async function getDataSupplierById(id: string) {
    const response = await getSupplierId(id);

    response?.map((item: any) => {
      setNoAccVal(item.sNo_Acc);
      setNamaVal(item.Nama);
      setAlamatVal(item.Alamat);
      setKotaVal(item.Kota);
      SetTeleponVal(item.Phone);
      setEmailVal(item.Email);
      setContactval(item.Person);
    });

    handleShow();
  }

  async function getDataMaxNo() {
    const response = await getMaxNoAcc();
    setNoAcc(response[0]["noacc"]);
  }

  async function saveDataSupplier() {
    if (namaval === "") {
      createMessage("Error", "Nama tidak boleh kosong", "error").then(() => {
        setLoadSave(true);
      });
    } else if (alamatval === "") {
      createMessage("Error", "Alamat tidak boleh kosong", "error").then(() => {
        setLoadSave(true);
      });
    } else if (kotaval === "") {
      createMessage("Error", "Kota tidak boleh kosong", "error").then(() => {
        setLoadSave(true);
      });
    } else if (teleponval === "") {
      createMessage("Error", "Telepon tidak boleh kosong", "error").then(() => {
        setLoadSave(true);
      });
    } else {
      getDataMaxNo();

      let noaccount = parseInt(noacc) + 1;
      const response = await createSupplier(
        noaccount.toString(),
        namaval,
        alamatval,
        kotaval,
        teleponval,
        emailval,
        new Date(),
        "admin",
        contactval
      );

      if (response["message"] == "success") {
        createMessage("Success", "Supplier berhasil disimpan", "success").then(
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
  }

  async function updateDataSupplier() {
    if (namaval === "") {
      createMessage("Error", "Nama tidak boleh kosong", "error").then(() => {
        setLoadSave(true);
      });
    } else if (alamatval === "") {
      createMessage("Error", "Alamat tidak boleh kosong", "error").then(() => {
        setLoadSave(true);
      });
    } else if (kotaval === "") {
      createMessage("Error", "Kota tidak boleh kosong", "error").then(() => {
        setLoadSave(true);
      });
    } else if (teleponval === "") {
      createMessage("Error", "Telepon tidak boleh kosong", "error").then(() => {
        setLoadSave(true);
      });
    } else {
      const response = await updateSupplier(
        noaccval,
        namaval,
        alamatval,
        kotaval,
        teleponval,
        emailval,
        new Date(),
        "admin",
        contactval
      );

      if (response["message"] == "success") {
        createMessage("Success", "Supplier berhasil diubah", "success").then(
          () => {
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

  const saveSupplier = () => {
    if (noaccval === "") {
      saveDataSupplier();
      getDataMaxNo();
    } else {
      updateDataSupplier();
    }

    setLoadSave(false);
    setTimeout(() => {
      setLoadSave(true);
    }, 2000);
  };

  const nextPage = () => {
    limitPage = Math.ceil(suppliernoFilter / 10);

    if (page >= limitPage) {
      setPage(limitPage);
    } else {
      setPage(page + 1);
    }

    nextPageAct = limitQuery + 10;
    setLimitQuery(nextPageAct);

    if (nextPageAct >= suppliernoFilter) {
      nextPageAct = suppliernoFilter;
      setLimitQuery(nextPageAct);
    }

    getDataSupplier(nama, nextPageAct, 10);
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

    getDataSupplier(nama, nextPageAct, 10);
  };

  const firstPage = () => {
    setLimitQuery(0);
    getDataSupplier(nama, 0, 10);
    setPage(1);
  };

  const lastPage = () => {
    dataCount = suppliernoFilter - (suppliernoFilter % 10);
    limitPage = Math.ceil(suppliernoFilter / 10);

    setLimitQuery(dataCount);
    getDataSupplier(nama, suppliernoFilter - (suppliernoFilter % 10), 10);
    setPage(limitPage);
  };

  const loadingDatas = () => {
    setLoadingData(false);
    getDataSupplierNoFilt(nama);
    getDataSupplier(nama, 0, 10);
    setNoData("");
    setPage(1);
    setTimeout(() => {
      setLoadingData(true);
      setNoData("Data Tidak Ditemukan");
    }, 5000);
  };

  useEffect(() => {
    loadingDatas();
    getDataMaxNo();
  }, []);

  return (
    <div style={{ paddingLeft: 20, paddingRight: 20, marginTop: "80px" }}>
      <Breadcrumb>
        <Breadcrumb.Item href="/home">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item active>Supplier</Breadcrumb.Item>
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
            placeholder="Cari Supplier [Enter]"
            aria-label="Input group example"
            aria-describedby="btnGroupAddon2"
            onChange={(mytext) => setNama(mytext.target.value)}
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
            {noaccval === "" ? "Tambah" : "Detail"} Supplier
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="namasupplier">
              <Form.Label>Nama Supplier</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nama Supplier"
                value={namaval}
                onChange={(mytext) => setNamaVal(mytext.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="alamatsupplier">
              <Form.Label>Alamat Supplier</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Alamat Supplier"
                value={alamatval}
                onChange={(mytext) => setAlamatVal(mytext.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="kotasupplier">
              <Form.Label>Kota Supplier</Form.Label>
              <Form.Control
                type="text"
                placeholder="Kota Supplier"
                value={kotaval}
                onChange={(mytext) => setKotaVal(mytext.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="teleponsupplier">
              <Form.Label>Telepon/Fax</Form.Label>
              <Form.Control
                type="text"
                placeholder="Telepon/Fax"
                value={teleponval}
                onChange={(mytext) => SetTeleponVal(mytext.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="emailsupplier">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={emailval}
                onChange={(mytext) => setEmailVal(mytext.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="contactpersonsupplier">
              <Form.Label>Contact Person</Form.Label>
              <Form.Control
                type="text"
                placeholder="Contact Person"
                value={contactval}
                onChange={(mytext) => setContactval(mytext.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
          <Button variant="primary" onClick={() => saveSupplier()}>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              hidden={loadSave}
            />{" "}
            {noaccval === "" ? <FaRegSave /> : <FaEdit />}
            {noaccval === "" ? " Simpan" : " Simpan Edit"}
          </Button>
          {noaccval != "" ? (
            <Button variant="danger" onClick={() => deleteDataSupplier()}>
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
      {supplier?.length < 1 ? (
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
        supplier?.map((item, i) => {
          return (
            <div
              className="card"
              key={i}
              style={{ cursor: "pointer", marginTop: 5 }}
            >
              <div className="card-body p-0 p-2 d-flex justify-content-between">
                <span>{i + 1 + ". " + item["Nama"]}</span>
                <Button variant="primary" className="btn-sm">
                  {" "}
                  <FaCaretDown
                    onClick={() => getDataSupplierById(item["sNo_Acc"])}
                  />
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
              Total Data : <strong>{suppliernoFilter}</strong>
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
