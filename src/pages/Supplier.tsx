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
import { useState, useEffect, useCallback } from "react";
import {
  FaFileMedical,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaCircleNotch,
} from "react-icons/fa";

import {
  getSupplier,
  getSupplierNoFilt,
  createSupplier,
  getMaxNoAcc,
} from "./../function/Supplier";
import { msgerr, msgsucc } from "./../function/Alert";

export function Supplier() {
  const [show, setShow] = useState(false);
  const [supplier, setSupplier] = useState([]);
  const [suppliernoFilter, setSuppliernoFilter] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [noData, setNoData] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  const [page, setPage] = useState(1);
  const [limitQuery, setLimitQuery] = useState(0);
  const [nama, setNama] = useState("");
  const [noacc, setNoAcc] = useState("");
  const [namaval, setNamaVal] = useState("");
  const [alamatval, setAlamatVal] = useState("");
  const [kotaval, setKotaVal] = useState("");
  const [teleponval, SetTeleponVal] = useState("");
  const [emailval, setEmailVal] = useState("");
  const [contactval, setContactval] = useState("");

  let limitPage = 0;
  let nextPageAct = 0;
  let dataCount = 0;

  async function getDataSupplier(
    like = "",
    limitqueryprev = 0,
    limitquery = 10
  ) {
    const response = await getSupplier(like, limitqueryprev, limitquery);
    setSupplier(response);
  }

  async function getDataSupplierNoFilt(like = "") {
    const response = await getSupplierNoFilt(like);
    setSuppliernoFilter(response);
  }

  async function getDataMaxNo() {
    const response = await getMaxNoAcc();
    setNoAcc(response[0]["noacc"]);
  }

  async function saveDataSupplier() {
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
    console.log(response);
  }

  const saveSupplier = () => {
    if (namaval === "") {
      msgerr("Error", "Nama tidak boleh kosong");
      return;
    }

    if (alamatval === "") {
      msgerr("Error", "Alamat tidak boleh kosong");
      return;
    }

    if (kotaval === "") {
      msgerr("Error", "Kota tidak boleh kosong");
      return;
    }

    if (teleponval === "") {
      msgerr("Error", "Telepon tidak boleh kosong");
      return;
    }

    if (contactval === "") {
      msgerr("Error", "Contact person tidak boleh kosong");
      return;
    }
    getDataMaxNo();
    saveDataSupplier();
  };

  const nextPage = () => {
    limitPage = Math.ceil(suppliernoFilter / 10);
    setPage(page + 1);
    if (page >= limitPage) {
      setPage(limitPage);
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
    setPage(page - 1);
    if (page < 2) {
      setPage(1);
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
    setPage(1);
    setLimitQuery(0);
    getDataSupplier(nama, 0, 10);
  };

  const lastPage = () => {
    dataCount = suppliernoFilter - (suppliernoFilter % 10);
    limitPage = Math.ceil(suppliernoFilter / 10);
    setPage(limitPage);
    setLimitQuery(dataCount);
    getDataSupplier(nama, suppliernoFilter - (suppliernoFilter % 10), 10);
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
            Tambah Supplier
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="namasupplier">
              <Form.Label>Nama Supplier</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nama Supplier"
                onChange={(mytext) => setNamaVal(mytext.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="alamatsupplier">
              <Form.Label>Alamat Supplier</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Alamat Supplier"
                onChange={(mytext) => setAlamatVal(mytext.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="kotasupplier">
              <Form.Label>Kota Supplier</Form.Label>
              <Form.Control
                type="text"
                placeholder="Kota Supplier"
                onChange={(mytext) => setKotaVal(mytext.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="teleponsupplier">
              <Form.Label>Telepon/Fax</Form.Label>
              <Form.Control
                type="text"
                placeholder="Telepon/Fax"
                onChange={(mytext) => SetTeleponVal(mytext.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="emailsupplier">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(mytext) => setEmailVal(mytext.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="contactpersonsupplier">
              <Form.Label>Contact Person</Form.Label>
              <Form.Control
                type="text"
                placeholder="Contact Person"
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
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
      <Card style={{ width: "100%" }}>
        <Card.Header>
          <b> Nama Supplier </b>
        </Card.Header>
        <ListGroup variant="flush">
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
                <div key={i}>
                  <ListGroup.Item
                    onClick={() => console.log(item["sNo_Acc"])}
                    style={{ cursor: "pointer" }}
                  >
                    {i + 1 + ". " + item["Nama"]}
                  </ListGroup.Item>
                </div>
              );
            })
          )}
        </ListGroup>
      </Card>
      <div>
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
