import { Link } from "react-router-dom";
import {
  Breadcrumb,
  Button,
  ButtonGroup,
  ButtonToolbar,
  InputGroup,
  Form,
  Modal,
  Spinner,
} from "react-bootstrap";
import { Viewdata } from "./../component/pengeluranbarang/viewdata";
export function Pengeluaranbarang() {
  return (
    <div style={{ paddingLeft: 20, paddingRight: 20, marginTop: "80px" }}>
      <Breadcrumb>
        <Breadcrumb.Item href="/home">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item active>Pengeluaran Barang</Breadcrumb.Item>
      </Breadcrumb>

      <Viewdata />
    </div>
  );
}
