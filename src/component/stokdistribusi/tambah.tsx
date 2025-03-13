import {
  Spinner,
  Table,
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
import Select from "react-select";
import {
  FaFile,
  FaFileMedical,
  FaSearch,
  FaPrint,
  FaEdit,
} from "react-icons/fa";

export function Createdata() {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedOption, setSelectedOption] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

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
            <Button variant="light">
              <FaFile /> New
            </Button>
            <Button variant="light">
              <FaPrint /> Print
            </Button>
            <Button variant="light">
              <FaEdit /> Rename
            </Button>
          </ButtonGroup>
          <Form>
            <Form.Label>
              Kode Barang <span className="text-danger">*)</span>
            </Form.Label>
            <InputGroup>
              <Form.Control aria-label="Kode Barang" />
              <Button variant="outline-secondary">
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
              <Form.Control type="text" value={""} onChange={() => {}} />
            </Form.Group>

            <Form.Group className="mt-2" controlId="perkiraanbiayad">
              <Form.Label>
                Merek Barang <span className="text-danger">*)</span>
              </Form.Label>
              <Select
                defaultValue={selectedOption}
                onChange={() => setSelectedOption}
                options={options}
              />
            </Form.Group>

            <Row className="mt-2">
              <Form.Group as={Col} className="mt-2" controlId="perkiraanbiayad">
                <Form.Label>
                  Kategori Barang <span className="text-danger">*)</span>
                </Form.Label>
                <Select
                  defaultValue={selectedOption}
                  onChange={() => setSelectedOption}
                  options={options}
                />
              </Form.Group>

              <Form.Group as={Col} className="mt-2" controlId="perkiraanbiayad">
                <Form.Label>
                  Satuan <span className="text-danger">*)</span>
                </Form.Label>
                <Select
                  defaultValue={selectedOption}
                  onChange={() => setSelectedOption}
                  options={options}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mt-2" controlId="perkiraanbiayad">
              <Form.Label>Spesifikasi</Form.Label>
              <Form.Control type="text" value={""} onChange={() => {}} />
            </Form.Group>

            <Form.Group className="mt-2" controlId="perkiraanbiayad">
              <Form.Label>Lokasi</Form.Label>
              <Form.Control type="text" value={""} onChange={() => {}} />
            </Form.Group>

            <Row className="mt-2">
              <Form.Group as={Col} className="mt-2" controlId="perkiraanbiayad">
                <Form.Label>Maximum Stock</Form.Label>
                <Form.Control type="text" value={""} onChange={() => {}} />
              </Form.Group>

              <Form.Group as={Col} className="mt-2" controlId="perkiraanbiayad">
                <Form.Label>Minimum Stock</Form.Label>
                <Form.Control type="text" value={""} onChange={() => {}} />
              </Form.Group>
            </Row>

            <Form.Check
              className="mt-2"
              type="checkbox"
              id="checkboxitem"
              label={`Don't show this item`}
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
              onClick={handleClose}
            >
              Simpan
            </Button>
            <Button variant="danger" onClick={handleClose}>
              Hapus
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
