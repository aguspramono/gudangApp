import { Spinner, Table, Button, Modal, Form, Row, Col } from "react-bootstrap";

import { useState, useEffect } from "react";

import { FaCaretDown } from "react-icons/fa";

import { getStokDistribusi } from "./../../function/Stockdistribusi";

export function Viewdata() {
  const [stokdistribusi, setStokdistribusi] = useState([]);
  const [show, setShow] = useState(false);

  const [noData, setNoData] = useState("");
  const [loadingData, setLoadingData] = useState(false);

  const [saldo, setSaldo] = useState("");
  const [beli, setBeli] = useState("");
  const [out, setOut] = useState("");
  const [instok, setInstok] = useState("");
  const [adj, setAdj] = useState("");
  const [sisa, setSisa] = useState("");
  const [gudang, setGudang] = useState("");

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  async function getDatastokdistribusi(gudang: string) {
    const response = await getStokDistribusi(gudang);
    setStokdistribusi(response);
  }

  async function getDataDetailStokDistribusi(gudang: string) {
    const response = await getStokDistribusi(gudang);
    response?.map((item: any) => {
      setGudang(item.Gudang);
      setSisa(item.Sisa);
      setAdj(item.Adj);
      setInstok(item.MutIn);
      setOut(item.Out);
      setBeli(item.Beli);
      setSaldo(item.sAwal);
    });

    handleShow();
  }

  const loadingDatas = () => {
    setLoadingData(false);
    getDatastokdistribusi("");
    setNoData("");
    setTimeout(() => {
      setLoadingData(true);
      setNoData("Data Tidak Ditemukan");
    }, 5000);
  };

  useEffect(() => {
    loadingDatas();
  }, []);

  return (
    <div>
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
            Detail Stock Distribusi
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="kodegudang">
              <Form.Label>Gudang</Form.Label>
              <Form.Control
                type="text"
                placeholder="Gudang"
                value={gudang}
                disabled={true}
                onChange={() => {}}
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="saldo">
                <Form.Label>Saldo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Saldo"
                  value={saldo}
                  disabled={true}
                  onChange={() => {}}
                />
              </Form.Group>
              <Form.Group as={Col} className="mb-3" controlId="beli">
                <Form.Label>Beli</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Beli"
                  value={beli}
                  disabled={true}
                  onChange={() => {}}
                />
              </Form.Group>
              <Form.Group as={Col} className="mb-3" controlId="out">
                <Form.Label>Out</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Out"
                  value={out}
                  disabled={true}
                  onChange={() => {}}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="in">
                <Form.Label>In</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="In"
                  value={instok}
                  disabled={true}
                  onChange={() => {}}
                />
              </Form.Group>
              <Form.Group as={Col} className="mb-3" controlId="adj">
                <Form.Label>Adj</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Adj"
                  value={adj}
                  disabled={true}
                  onChange={() => {}}
                />
              </Form.Group>
              <Form.Group as={Col} className="mb-3" controlId="sisa">
                <Form.Label>Sisa</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Sisa"
                  value={sisa}
                  disabled={true}
                  onChange={() => {}}
                />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="d-lg-none d-sm-block">
        {stokdistribusi?.length < 1 ? (
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
          stokdistribusi?.map((item, i) => {
            return (
              <div
                className="card"
                key={i}
                style={{ cursor: "pointer", marginTop: 5 }}
              >
                <div className="card-body p-0 p-2 d-flex justify-content-between">
                  <span>{i + 1 + ". " + item["Gudang"]}</span>
                  <Button variant="primary" className="btn-sm">
                    {" "}
                    <FaCaretDown
                      onClick={() =>
                        getDataDetailStokDistribusi(item["Gudang"])
                      }
                    />
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="d-lg-block d-none">
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Gudang</th>
              <th>Saldo</th>
              <th>Beli</th>
              <th>Out</th>
              <th>In</th>
              <th>Adj</th>
              <th>Sisa</th>
            </tr>
          </thead>
          <tbody>
            {stokdistribusi?.length < 1 ? (
              <tr>
                <td colSpan={8} align="center">
                  <Spinner
                    animation="border"
                    role="status"
                    variant="primary"
                    hidden={loadingData}
                  >
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  <span>{noData}</span>
                </td>
              </tr>
            ) : (
              stokdistribusi?.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item["Gudang"]}</td>
                    <td>{item["sAwal"]}</td>
                    <td>{item["Beli"]}</td>
                    <td>{item["Out"]}</td>
                    <td>{item["MutIn"]}</td>
                    <td>{item["Adj"]}</td>
                    <td>{item["Sisa"]}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>
          <small>
            <i>
              Total Data : <strong>{stokdistribusi?.length}</strong>
            </i>
          </small>
        </span>
      </div>
    </div>
  );
}
