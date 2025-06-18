import {
  Button,
  Modal,
  Form,
  InputGroup,
  Col,
  Row,
  Table,
  ButtonGroup,
  Spinner,
} from "react-bootstrap";
import { useState, useEffect, SetStateAction } from "react";
import { FaFileMedical, FaTrash, FaRegSave, FaFile } from "react-icons/fa";

import { getCurrentDateInput } from "./../../function/Datenow";
import { Optiondepartemen } from "./../global/optiondepartemen";
import { Optiongudang } from "./../global/optiongudang";
import { Optionstatus } from "./../global/optionstatus";
import { Viewdataproduk } from "./../global/databarang";
import { closingbulanan } from "./../../function/Closingbulanan";

import { insertStockOut } from "./../../function/Pengeluaranbarang";

import { createMessage } from "./../../function/Alert";

export const Tambahpengeluaranbarang = (props: any) => {
  const [loadSave, setLoadSave] = useState(true);
  const [showproduk, setShowproduk] = useState(false);
  const [closebulanan, setClosebulanan] = useState([]);
  const [databarang, setDatabarang] = useState<any[]>([]);

  //def variabel po
  const [tanggaldaily, setTanggalDaily] = useState(
    getCurrentDateInput(new Date())
  );
  const [nomorivoice, setNomorinvoice] = useState("");
  const [invcheck, setInvcheck] = useState(false);
  const [departemen, setDepartemen] = useState(null);
  const [gudang, setGudang] = useState(null);
  const [status, setStatus] = useState(null);
  const [kegudang, setKegudang] = useState(null);
  const [jumlahqty, setJumlahqty] = useState(0);
  const [keteranganval, setKeteranganval] = useState("");

  const bersih = () => {
    setDatabarang([]);
    setNomorinvoice("");
    setJumlahqty(0);
    setKeteranganval("");
  };

  //def handle

  const handleCloseModal = () => {
    props.onHide(false);
  };

  const handleGudang = (e: any) => {
    setGudang(e);
  };

  const handleDepartemen = (e: any) => {
    setDepartemen(e);
  };

  const handleStatus = (e: any) => {
    setStatus(e);
  };

  const handleKegudang = (e: any) => {
    setKegudang(e);
  };

  const handleShowProduk = () => setShowproduk(true);
  const handleCloseProduk = () => setShowproduk(false);

  const handleProductDetail = (e: any) => {
    databarang.push({
      kodebarang: e[0]["Kode"],
      namabarang: e[0]["Nama"],
      lokasi: e[0]["Lokasi"],
      qtybarang: 0,
      satuanbarang: e[0]["Satuan"],
      alokasi: "",
    });

    const databaranguniq = [
      ...new Map(databarang.map((e) => [e["kodebarang"], e])).values(),
    ];

    setDatabarang(databaranguniq);
    handleCloseProduk();
  };

  //load data other
  const getclosingbulanan = async (periode: string, tanggal: string) => {
    const dataclosingval = await closingbulanan(periode, tanggal);
    setClosebulanan(dataclosingval);
  };

  //update more array
  const updateSummary = () => {
    if (databarang.length < 1) {
      setJumlahqty(0);
    } else {
      let jumlahqtyval = 0;
      databarang.map((item) => {
        jumlahqtyval = jumlahqtyval + parseFloat(item["qtybarang"]);
      });

      setJumlahqty(jumlahqtyval);
    }
  };

  const updateJumlahbyqty = (kode: string, qty: number) => {
    if (isNaN(qty)) {
      qty = 0;
    }
    setDatabarang((prev) =>
      prev.map((item) =>
        item.kodebarang === kode
          ? {
              ...item,
              qtybarang: qty,
            }
          : item
      )
    );

    updateSummary();
  };

  const updatealokasi = (kode: string, alokasival: string) => {
    setDatabarang((prev) =>
      prev.map((item) =>
        item.kodebarang === kode
          ? {
              ...item,
              alokasi: alokasival,
            }
          : item
      )
    );
  };

  //simpan pesanan barang
  const simpanPengeluaranbarang = async () => {
    if (nomorivoice == "") {
      createMessage(
        "Error",
        "Nomor Invoice masih kosong, harap isi nomor invoice",
        "error"
      );
      setLoadSave(true);
      return;
    }

    if (gudang === "" || gudang == null) {
      createMessage("Error", "Gudang belum dipilih", "error");
      setLoadSave(true);
      return;
    }

    if (departemen === "" || departemen == null) {
      createMessage("Error", "Departemen belum dipilih", "error");
      setLoadSave(true);
      return;
    }

    if (status === "" || status == null) {
      createMessage("Error", "Status Pengeluaran belum dipilih", "error");
      setLoadSave(true);
      return;
    }

    if (kegudang === "" || kegudang == null) {
      createMessage("Error", "Ke gudang belum dipilih", "error");
      setLoadSave(true);
      return;
    }

    if (databarang.length < 1) {
      createMessage("Error", "Barang belum dipilih", "error");
      setLoadSave(true);
      return;
    }

    getclosingbulanan("stock_periode", tanggaldaily);
    if (closebulanan[0]["status"] == false) {
      createMessage("Error", closebulanan[0]["message"], "error");
      setLoadSave(true);
      return;
    }

    const simpanpengeluaran = await insertStockOut(
      databarang,
      gudang,
      tanggaldaily,
      nomorivoice,
      departemen,
      keteranganval,
      status,
      kegudang,
      getCurrentDateInput(new Date()).toString(),
      "Admin"
    );

    if (simpanpengeluaran["status"] == "success") {
      createMessage("Success", "Berhasil disimpan", "success").then(() => {
        bersih();
        handleCloseModal();
      });
      setLoadSave(true);
    } else {
      createMessage("Error", simpanpengeluaran["message"], "error").then(
        () => {}
      );
      setLoadSave(true);
    }
  };

  //   const handleOnData = async () => {
  //     bersih();
  //     getdetailpesananbyidonly(props["onData"]);
  //     getdetailpesananid(props["onData"]);

  //     const datapesanan = await getPesananbyID(props["onData"]);
  //     const datapesanandetail = await getPesananDetailNopesOnly(props["onData"]);

  //     setTanggalDaily(getCurrentDateInput(new Date(datapesanan[0]["Tgl"])));
  //     setNomorpesanan(props["onData"]);
  //     setDepartemen(datapesanandetail[0]["Departemen"]);
  //     setGudang(datapesanan[0]["Gudang"]);

  //     let databarangarr: SetStateAction<any[]> = [];
  //     datapesanandetail?.map((item: any) => {
  //       databarangarr.push({
  //         kodebarang: item["Kode"],
  //         namabarang: item["Nama"],
  //         lokasi: item["Lokasi"],
  //         qtybarang: item["Qtty"],
  //         satuanbarang: item["Satuan"],
  //         tanggalbutuh: getCurrentDateInput(new Date(item["TglButuh"])),
  //         alokasi: item["Alokasi"],
  //       });
  //     });

  //     setDatabarang(databarangarr);
  //     updateSummary;
  //   };

  useEffect(() => {
    updateSummary();
    getclosingbulanan("stock_periode", tanggaldaily);
  }, [databarang]);

  return (
    <div>
      <Modal
        animation={false}
        // fullscreen={true}
        size="xl"
        show={props.show}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        //onShow={() => (props["onData"] == "" ? bersih() : handleOnData())}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Pengeluaran Barang
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {props["onData"] == "" ? (
            <>
              <Button variant="light" onClick={bersih}>
                <FaFile /> Tambah Baru
              </Button>
              <hr />
            </>
          ) : (
            ""
          )}

          <Form>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalTanggal"
            >
              <Form.Label column sm={2}>
                Tanggal <span className="text-danger">*)</span>
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="date"
                  placeholder="Tanggal"
                  value={tanggaldaily}
                  onChange={(mytext) => setTanggalDaily(mytext.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalnopo"
            >
              <Form.Label column sm={2}>
                Nomor Invoice <span className="text-danger">*)</span>
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder=" Nomor Invoice"
                  value={props["onData"] == "" ? nomorivoice : props["onData"]}
                  onChange={(e) => {
                    setNomorinvoice(e.target.value);
                  }}
                  readOnly={props["onData"] == "" ? false : true}
                />
              </Col>
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>
                  Departemen <span className="text-danger">*)</span>
                </Form.Label>
                <Optiondepartemen
                  state={departemen}
                  onChange={handleDepartemen}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>
                  Gudang <span className="text-danger">*)</span>
                </Form.Label>
                <Optiongudang state={gudang} onChange={handleGudang} />
              </Form.Group>
            </Row>
            <hr />
            <ButtonGroup aria-label="First group" className="mb-2">
              <Button
                variant="info"
                className="text-white"
                onClick={handleShowProduk}
              >
                <FaFileMedical /> Tambah Barang
              </Button>
            </ButtonGroup>
            <Table responsive striped bordered>
              <thead>
                <tr>
                  <th></th>
                  <th>Kode Barang</th>
                  <th>Description</th>
                  <th>Lokasi</th>
                  <th>Qtty</th>
                  <th>Satuan</th>
                  <th>Alokasi</th>
                </tr>
              </thead>
              <tbody>
                {databarang?.length < 1 ? (
                  <tr>
                    <td colSpan={10} align="center">
                      {props["onData"] == "" ? (
                        <span>Belum ada data barang</span>
                      ) : (
                        <Spinner
                          animation="border"
                          role="status"
                          variant="primary"
                          hidden={false}
                        >
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      )}
                    </td>
                  </tr>
                ) : (
                  databarang?.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          <FaTrash
                            className="text-danger"
                            onClick={() => {
                              setDatabarang(
                                databarang.filter(
                                  (a) => a.kodebarang !== item.kodebarang
                                )
                              );
                            }}
                          />
                        </td>
                        <td>{item["kodebarang"]}</td>
                        <td>{item["namabarang"]}</td>
                        <td>{item["lokasi"]}</td>
                        <td>
                          <Form.Control
                            type="number"
                            value={item["qtybarang"]}
                            min={0}
                            onChange={(e) => {
                              updateJumlahbyqty(
                                item["kodebarang"],
                                parseFloat(e.target.value)
                              );
                            }}
                            onFocus={(e) => e.target.select()}
                          />
                        </td>
                        <td>{item["satuanbarang"]}</td>
                        <td>
                          <Form.Control
                            type="text"
                            value={item["alokasi"]}
                            onChange={(e) => {
                              updatealokasi(item["kodebarang"], e.target.value);
                            }}
                            onFocus={(e) => e.target.select()}
                          />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan={4}></th>
                  <th>{jumlahqty}</th>
                  <th colSpan={2}></th>
                </tr>
              </tfoot>
            </Table>

            <Row className="mb-3">
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>
                    Status Pengeluaran <span className="text-danger">*)</span>
                  </Form.Label>
                  <Optionstatus state={status} onChange={handleStatus} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>
                    Ke Gudang <span className="text-danger">*)</span>
                  </Form.Label>
                  <Optiongudang state={kegudang} onChange={handleKegudang} />
                </Form.Group>
              </Row>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalnopo"
              >
                <Form.Label column sm={4}>
                  Keterangan
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={keteranganval}
                    onChange={(e) => setKeteranganval(e.target.value)}
                    onFocus={(e) => e.target.select()}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalnopo"
              >
                <Form.Label column sm={4}>
                  Operator ID
                </Form.Label>
                <Col sm={8}>
                  <InputGroup className="">
                    <Form.Control
                      type="text"
                      value={"Admin"}
                      onChange={(e) => e.target.value}
                      onFocus={(e) => e.target.select()}
                    />
                    <Form.Control
                      type="text"
                      value={getCurrentDateInput(new Date())}
                      onChange={(e) => e.target.value}
                      onFocus={(e) => e.target.select()}
                    />
                  </InputGroup>
                </Col>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Tutup
          </Button>
          <Button variant="primary" onClick={simpanPengeluaranbarang}>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              hidden={loadSave}
            />{" "}
            <FaRegSave /> Simpan Pengeluaran Barang
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        size="lg"
        animation={false}
        show={showproduk}
        onHide={handleCloseProduk}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Pencarian Product / Barang
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Viewdataproduk onClick={handleProductDetail} />
        </Modal.Body>
      </Modal>
    </div>
  );
};
