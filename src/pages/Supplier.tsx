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
} from "react-bootstrap";
import { useState } from "react";
import { FaFileMedical } from "react-icons/fa";

export function Supplier() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div style={{ paddingLeft: 20, paddingRight: 20 }}>
        <Breadcrumb>
          <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
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
              placeholder="Cari Supplier"
              aria-label="Input group example"
              aria-describedby="btnGroupAddon2"
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
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>No Supplier</Form.Label>
                <Form.Control type="text" placeholder="No Supplier" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Nama Supplier</Form.Label>
                <Form.Control type="text" placeholder="Nama Supplier" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Alamat Supplier</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Alamat Supplier"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Kota Supplier</Form.Label>
                <Form.Control type="text" placeholder="Kota Supplier" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Telepon/Fax</Form.Label>
                <Form.Control type="text" placeholder="Telepon/Fax" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Contact Person</Form.Label>
                <Form.Control type="text" placeholder="Contact Person" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Tutup
            </Button>
            <Button variant="primary">Simpan</Button>
          </Modal.Footer>
        </Modal>
        <Card style={{ width: "100%" }}>
          <Card.Header>
            <b> Nama Supplier </b>
          </Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span> Cras justo odio</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
    </>
  );
}
