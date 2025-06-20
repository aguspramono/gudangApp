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
import { Viewdata } from "./../component/pesananbarang/viewdata";
import { Viewdatapesanandetail } from "./../component/pesananbarang/viewdatadetailpesananbarang";
export function Pesananbarang() {
  const handleDetailSupplier = (e: any) => {
    console.log(e);
  };

  return (
    <div style={{ paddingLeft: 20, paddingRight: 20, marginTop: "80px" }}>
      <Breadcrumb>
        <Breadcrumb.Item href="/home">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item active>Pesanan Barang</Breadcrumb.Item>
      </Breadcrumb>

      <Viewdata onClick={handleDetailSupplier} />
    </div>
  );
}
