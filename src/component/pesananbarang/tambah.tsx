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
import { Viewdataproduk } from "./../global/databarang";
import { closingbulanan } from "./../../function/Closingbulanan";
import { cekStockPoDetailbyNopesanan } from "./../../function/Stock";
import {
  getPesananDetailTglClosing,
  getPesananbyID,
  deleteDatapesanan,
  deleteDatapesanandetail,
  insertpesanan,
  insertpesanandetail,
  getPesananDetailNopesOnly,
} from "./../../function/Pesananbarang";

import { createMessage } from "./../../function/Alert";

export const Tambahpesananbarang = (props: any) => {
  const [loadSave, setLoadSave] = useState(true);
  const [showproduk, setShowproduk] = useState(false);
  const [closebulanan, setClosebulanan] = useState([]);
  const [databarang, setDatabarang] = useState<any[]>([]);
  const [datadetailpo, setDatadetailpo] = useState<any[]>([]);
  const [datadetailpesanannopesonly, setDatadetailpesanannopesonly] = useState<
    any[]
  >([]);
  const [datadetailpesanan, setDatadetailpesanan] = useState<any[]>([]);
  const [datadetailpesananid, setDatadetailpesananid] = useState<any[]>([]);

  //def variabel po
  const [tanggaldaily, setTanggalDaily] = useState(
    getCurrentDateInput(new Date())
  );
  const [nomorpesanan, setNomorpesanan] = useState("");
  const [departemen, setDepartemen] = useState(null);
  const [gudang, setGudang] = useState(null);
  const [jumlahqty, setJumlahqty] = useState(0);
  const [keteranganval, setKeteranganval] = useState("");

  const bersih = () => {
    setDatabarang([]);
    setNomorpesanan("");
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

  const handleShowProduk = () => setShowproduk(true);
  const handleCloseProduk = () => setShowproduk(false);

  const handleProductDetail = (e: any) => {
    databarang.push({
      kodebarang: e[0]["Kode"],
      namabarang: e[0]["Nama"],
      lokasi: e[0]["Lokasi"],
      qtybarang: 0,
      satuanbarang: e[0]["Satuan"],
      tanggalbutuh: getCurrentDateInput(new Date()),
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

  const getdetailpo = async (nomorpesanan: string) => {
    const datadetailpo = await cekStockPoDetailbyNopesanan(nomorpesanan);
    setDatadetailpo(datadetailpo);
  };

  const getdetailpesanan = async (nomorpesanan: string) => {
    const datadetailpesanan = await getPesananDetailTglClosing(nomorpesanan);
    setDatadetailpesanan(datadetailpesanan);
  };

  const getdetailpesananid = async (nomorpesanan: string) => {
    const datadetailpesanan = await getPesananbyID(nomorpesanan);
    setDatadetailpesananid(datadetailpesanan);
  };

  const getdetailpesananbyidonly = async (nomorpesanan: string) => {
    const datadetailpesanan = await getPesananDetailNopesOnly(nomorpesanan);
    setDatadetailpesanannopesonly(datadetailpesanan);
  };

  //delete data
  const deletepesananfunc = async (nomorpoval: string) => {
    await deleteDatapesanan(nomorpoval);
  };

  const deletepesanandetailfunc = async (nomorpoval: string) => {
    await deleteDatapesanandetail(nomorpoval);
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

  const updatetanggal = (kode: string, tanggal: string) => {
    setDatabarang((prev) =>
      prev.map((item) =>
        item.kodebarang === kode
          ? {
              ...item,
              tanggalbutuh: getCurrentDateInput(new Date(tanggal)),
            }
          : item
      )
    );
  };

  //simpan pesanan barang
  const simpanPesananbarang = async () => {
    setLoadSave(false);
    if (nomorpesanan === "") {
      createMessage("Error", "Nomor Pesanan masih kosong", "error");
      setLoadSave(true);
      return;
    }

    if (departemen === "") {
      createMessage("Error", "Departemen belum dipilih", "error");
      setLoadSave(true);
      return;
    }

    if (gudang === "") {
      createMessage("Error", "Gudang belum dipilih", "error");
      setLoadSave(true);
      return;
    }

    getclosingbulanan("stock_periode", tanggaldaily);
    if (closebulanan[0]["status"] == false) {
      createMessage("Error", closebulanan[0]["message"], "error");
      setLoadSave(true);
      return;
    }

    if (databarang.length < 1) {
      createMessage("Error", "Barang belum dipilih", "error");
      setLoadSave(true);
      return;
    }

    databarang.map((item) => {
      if (item["qtybarang"] == "0") {
        createMessage("Error", "Qty barang ada yang belum diisi", "error");
        setLoadSave(true);
        return;
      }
    });

    getdetailpo(nomorpesanan);

    if (datadetailpo.length > 0) {
      createMessage(
        "Error",
        "No. Pesanan " +
          nomorpesanan +
          " Sudah Ada PO Barang, Proses Edit diBatalkan?",
        "error"
      );
      setLoadSave(true);
      return;
    }

    getdetailpesanan(nomorpesanan);
    if (datadetailpesanan.length > 0) {
      createMessage(
        "Error",
        "No. Pesanan " +
          nomorpesanan +
          " Sudah diLakukan Closing Pesanan, Proses Edit diBatalkan?",
        "error"
      );
      setLoadSave(true);
      return;
    }

    getdetailpesananid(nomorpesanan);

    if (datadetailpesananid.length > 0) {
      getclosingbulanan("stock_periode", datadetailpesananid[0]["Tgl"]);
      if (closebulanan[0]["status"] == false) {
        createMessage("Error", closebulanan[0]["message"], "error");
        setLoadSave(true);
        return;
      }

      if (datadetailpesananid[0]["Gudang"] != gudang) {
        createMessage(
          "Error",
          "No. Invoice " +
            nomorpesanan +
            " sudah pernah di Input dgn Gudang " +
            datadetailpesananid[0]["Gudang"],
          "error"
        );
        setLoadSave(true);
        return;
      }
    }

    deletepesananfunc(nomorpesanan);
    deletepesanandetailfunc(nomorpesanan);

    const savepesanan = await insertpesanan(
      nomorpesanan,
      tanggaldaily.toString(),
      gudang == null ? "" : gudang,
      keteranganval,
      getCurrentDateInput(new Date()).toString(),
      "Admin"
    );

    const savepesanandetail = await insertpesanandetail(
      databarang,
      departemen == null ? "" : departemen,
      nomorpesanan
    );

    if (
      savepesanan["message"] == "success" &&
      savepesanandetail["message"] == "success"
    ) {
      createMessage("Success", "Pesanan berhasil disimpan", "success").then(
        () => {
          bersih();
          handleCloseModal();
        }
      );
      setLoadSave(true);
    } else {
      createMessage(
        "Error",
        "Terjadi kesalahan, proses simpan tidak dilanjutkan",
        "error"
      ).then(() => {
        if (props["onData"] == "") {
          deletepesananfunc(nomorpesanan);
          deletepesanandetailfunc(nomorpesanan);
        }
      });
      setLoadSave(true);
    }
  };

  const handleOnData = async () => {
    bersih();
    getdetailpesananbyidonly(props["onData"]);
    getdetailpesananid(props["onData"]);

    const datapesanan = await getPesananbyID(props["onData"]);
    const datapesanandetail = await getPesananDetailNopesOnly(props["onData"]);

    setTanggalDaily(getCurrentDateInput(new Date(datapesanan[0]["Tgl"])));
    setNomorpesanan(props["onData"]);
    setDepartemen(datapesanandetail[0]["Departemen"]);
    setGudang(datapesanan[0]["Gudang"]);

    let databarangarr: SetStateAction<any[]> = [];
    datapesanandetail?.map((item: any) => {
      databarangarr.push({
        kodebarang: item["Kode"],
        namabarang: item["Nama"],
        lokasi: item["Lokasi"],
        qtybarang: item["Qtty"],
        satuanbarang: item["Satuan"],
        tanggalbutuh: getCurrentDateInput(new Date(item["TglButuh"])),
        alokasi: item["Alokasi"],
      });
    });

    setDatabarang(databarangarr);
    updateSummary;
  };

  useEffect(() => {
    updateSummary();
    getdetailpo("*");
    getdetailpesanan("*");
    getdetailpesananid("*");
    getdetailpesananbyidonly("*");
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
        onShow={() => (props["onData"] == "" ? bersih() : handleOnData())}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Pesanan Barang
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
                Nomor Pesanan <span className="text-danger">*)</span>
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Nomor Pesanan"
                  value={props["onData"] == "" ? nomorpesanan : props["onData"]}
                  onChange={(e) => {
                    setNomorpesanan(e.target.value);
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
                  <th>Tgl Butuh</th>
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
                            type="date"
                            value={item["tanggalbutuh"]}
                            onChange={(e) => {
                              updatetanggal(item["kodebarang"], e.target.value);
                            }}
                            onFocus={(e) => e.target.select()}
                          />
                        </td>
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
          <Button variant="primary" onClick={simpanPesananbarang}>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              hidden={loadSave}
            />{" "}
            <FaRegSave /> Simpan Pesanan Barang
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
