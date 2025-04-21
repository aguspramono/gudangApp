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
import { useState, useEffect } from "react";
import {
  FaSearch,
  FaFileMedical,
  FaTrash,
  FaRegSave,
  FaFile,
} from "react-icons/fa";

import {
  createMessage,
  createMessageConfirm,
  msg,
} from "./../../function/Alert";
import { Optiondepartemen } from "./../global/optiondepartemen";
import { Optiongudang } from "./../global/optiongudang";
import { Viewdatasupplier } from "./../global/datasupplier";
import { Viewdataproduk } from "./../global/databarang";
import { getCurrentDateInput } from "./../../function/Datenow";
import {
  getDataPo,
  deleteDatapo,
  deleteDataDetailpo,
  insertpo,
  insertpodetail,
} from "./../../function/Orderbarang";
import {
  cekStockPurchDetailbyNopo,
  cekStockPoDetailbyNopo,
} from "./../../function/Stock";
import { closingbulanan } from "./../../function/Closingbulanan";

export const Tambahorderbarang = (props: any) => {
  const [loadSave, setLoadSave] = useState(true);
  const [showsupplier, setShowsupplier] = useState(false);
  const [showproduk, setShowproduk] = useState(false);
  const [databarang, setDatabarang] = useState<any[]>([]);
  const [purchdetail, setPurchdetail] = useState([]);
  const [stockpodetail, setStockpodetail] = useState([]);
  const [datapo, setDatapo] = useState([]);
  const [closebulanan, setClosebulanan] = useState([]);
  const [departemen, setDepartemen] = useState(null);
  const [gudang, setGudang] = useState(null);
  const [jumlahqty, setJumlahqty] = useState(0);
  const [jumlahrp, setJumlahrp] = useState(0);

  //def variabel po
  const [tanggaldaily, setTanggalDaily] = useState(
    getCurrentDateInput(new Date())
  );
  const [nomorpo, setNomorpo] = useState("");
  const [kodesupp, setKodeSupp] = useState("");
  const [namasupp, setNamaSupp] = useState("");
  const [diskongrand, setDiskongrand] = useState(0);
  const [ppngrand, setPpngrand] = useState(0);
  const [diskonnominalgrand, setDiskonnominalgrand] = useState(0);
  const [ppnnominalgrand, setPpnnominalgrand] = useState(0);
  const [grandtotal, setGrandtotal] = useState(0);
  const [grandtotalsum, setGrandtotalsum] = useState(0);
  const [keteranganval, setKeteranganVal] = useState("");
  const [nomorpesanan, setNomorpesanan] = useState("");
  const [alokasi, setAlokasi] = useState("");

  const handleCloseSupplier = () => {
    setShowsupplier(false);
  };
  const handleShowSupplier = () => setShowsupplier(true);

  const handleCloseProduk = () => {
    setShowproduk(false);
  };
  const handleShowProduk = () => setShowproduk(true);

  const handleGudang = (e: any) => {
    setGudang(e);
  };

  const handleDepartemen = (e: any) => {
    setDepartemen(e);
  };

  const handleDetailSupplier = (e: any) => {
    setKodeSupp(e[0]["sNo_Acc"]);
    setNamaSupp(e[0]["Nama"]);
    handleCloseSupplier();
  };

  const datastockpurchdetail = async () => {
    const responsstockpurchdetail = await cekStockPurchDetailbyNopo(nomorpo);
    setPurchdetail(responsstockpurchdetail);
  };

  const datastockpodetail = async (nomorpoval: string) => {
    const responsstockpodetail = await cekStockPoDetailbyNopo(nomorpoval);
    setStockpodetail(responsstockpodetail);
  };

  const getdatapofun = async (nomorpoval: string) => {
    const datapoval = await getDataPo(nomorpoval);
    setDatapo(datapoval);
  };

  const getclosingbulanan = async (periode: string, tanggal: string) => {
    const dataclosingval = await closingbulanan(periode, tanggal);
    setClosebulanan(dataclosingval);
  };

  const deletepofunc = async (nomorpoval: string) => {
    await deleteDatapo(nomorpoval);
  };

  const deletepodetailfunc = async (nomorpoval: string) => {
    await deleteDataDetailpo(nomorpoval);
  };

  const insertpofun = async (
    NoPo: string,
    Tgl: string,
    sNo_Acc: string,
    PayDueDay: number,
    Gudang: string,
    Disc: number,
    PPn: number,
    NominalPPn: number,
    NominalDisc: number,
    Keterangan: string,
    TglUbah: string,
    Username: string
  ) => {
    const response = await insertpo(
      NoPo,
      Tgl,
      sNo_Acc,
      PayDueDay,
      Gudang,
      Disc,
      PPn,
      NominalPPn,
      NominalDisc,
      Keterangan,
      TglUbah,
      Username
    );
    console.log(response);
  };

  const insertbatchdetailpo = async (
    databarangval: any,
    depart: string,
    nopo: string
  ) => {
    const response = await insertpodetail(databarangval, depart, nopo);
    console.log(response);
  };

  const handleProductDetail = (e: any) => {
    databarang.push({
      kodebarang: e[0]["Kode"],
      namabarang: e[0]["Nama"],
      qtybarang: 0,
      satuanbarang: e[0]["Satuan"],
      hargabeliend: e[0]["hBeliEnd"],
      diskonbarang: 0,
      jumlahbarang: 0,
    });

    const databaranguniq = [
      ...new Map(databarang.map((e) => [e["kodebarang"], e])).values(),
    ];

    setDatabarang(databaranguniq);
    setDiskonnominalgrand(0);
    setPpnnominalgrand(0);
    setPpngrand(0);
    setDiskongrand(0);
    setGrandtotalsum(0);
    handleCloseProduk();
  };

  const updateGrandtotal = () => {
    let jumlahgrandvaldiskon = 0;
    let jumlahgrandvalppn = 0;
    if (isNaN(diskongrand)) {
      setDiskongrand(0);
    }

    if (isNaN(ppngrand)) {
      setPpngrand(0);
    }

    if (isNaN(ppnnominalgrand)) {
      setPpnnominalgrand(0);
    }

    if (isNaN(diskonnominalgrand)) {
      setDiskonnominalgrand(0);
    }

    jumlahgrandvaldiskon = jumlahrp - (jumlahrp * diskongrand) / 100;
    jumlahgrandvalppn =
      jumlahgrandvaldiskon + (jumlahgrandvaldiskon * ppngrand) / 100;

    jumlahgrandvalppn =
      jumlahgrandvalppn + ppnnominalgrand - diskonnominalgrand;
    setGrandtotalsum(jumlahgrandvalppn);
  };

  const updateSummary = () => {
    if (databarang.length < 1) {
      setJumlahqty(0);
      setJumlahrp(0);
    } else {
      let jumlahqtyval = 0;
      let jumlahrpval = 0;
      databarang.map((item) => {
        jumlahqtyval = jumlahqtyval + parseFloat(item["qtybarang"]);
        jumlahrpval = jumlahrpval + parseFloat(item["jumlahbarang"]);
      });

      setJumlahqty(jumlahqtyval);
      setJumlahrp(jumlahrpval);
      setGrandtotal(jumlahrpval);
    }
  };

  const updateJumlahbyqty = (kode: string, qty: number, harga: number) => {
    if (isNaN(qty)) {
      qty = 0;
    }
    let jumlahharga = qty * harga;
    setDatabarang((prev) =>
      prev.map((item) =>
        item.kodebarang === kode
          ? {
              ...item,
              qtybarang: qty,
              diskonbarang: 0,
              jumlahbarang: jumlahharga,
            }
          : item
      )
    );

    updateSummary();
  };

  const updateJumlahbydiskon = (
    kode: string,
    qty: number,
    diskon: number,
    harga: number
  ) => {
    if (isNaN(qty)) {
      qty = 0;
    }
    if (isNaN(diskon)) {
      diskon = 0;
    }
    let jumlahharga = qty * harga;
    let jumlahdiskon = jumlahharga - (jumlahharga * diskon) / 100;
    setDatabarang((prev) =>
      prev.map((item) =>
        item.kodebarang === kode
          ? {
              ...item,
              qtybarang: qty,
              diskonbarang: diskon,
              jumlahbarang: jumlahdiskon,
            }
          : item
      )
    );
    updateSummary();
  };

  const handleCloseModal = () => {
    props.onHide(false);
  };

  const simpanPO = () => {
    if (nomorpo === "") {
      createMessage("Error", "Nomor PO masih kosong", "error");
      return;
    }

    if (kodesupp === "") {
      createMessage("Error", "Supplier belum dipilih", "error");
      return;
    }

    if (departemen === "") {
      createMessage("Error", "Departemen belum dipilih", "error");
      return;
    }

    if (gudang === "") {
      createMessage("Error", "Gudang belum dipilih", "error");
      return;
    }

    if (databarang.length < 1) {
      createMessage("Error", "Barang belum dipilih", "error");
      return;
    }

    if (grandtotal < 1) {
      createMessage(
        "Error",
        "Qty pada barang belum ada yang dimasukkan",
        "error"
      );
      return;
    }

    datastockpodetail(nomorpo);
    getdatapofun(nomorpo);

    if (purchdetail.length > 0) {
      createMessage(
        "Error",
        "No. PO " + nomorpo + " Sudah Ada Penerimaan Barang",
        "error"
      );
      return;
    }

    if (stockpodetail.length > 0) {
      createMessage(
        "Error",
        "No. PO " + nomorpo + " Sudah diLakukan Closing PO",
        "error"
      );
      return;
    }

    if (datapo.length > 0) {
      getclosingbulanan("stock_periode", datapo[0]["Tgl"]);
      if (closebulanan[0]["status"] == false) {
        createMessage("Error", closebulanan[0]["message"], "error");
        return;
      }
    }

    deletepofunc(nomorpo);
    deletepodetailfunc(nomorpo);
    insertpofun(
      nomorpo,
      tanggaldaily.toString(),
      kodesupp,
      0,
      gudang == null ? "" : gudang,
      diskongrand,
      ppngrand,
      ppnnominalgrand,
      diskonnominalgrand,
      keteranganval,
      getCurrentDateInput(new Date()).toString(),
      "Admin"
    );

    insertbatchdetailpo(
      databarang,
      departemen == null ? "" : departemen,
      nomorpo
    );
  };

  useEffect(() => {
    updateSummary();
    updateGrandtotal();
    datastockpurchdetail();
    datastockpodetail("");
    getdatapofun("");
    getclosingbulanan("stock_periode", "");
  }, [
    databarang,
    diskongrand,
    ppngrand,
    diskonnominalgrand,
    ppnnominalgrand,
    grandtotal,
    grandtotalsum,
  ]);

  return (
    <div>
      <Modal
        animation={false}
        size="xl"
        show={props.show}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Order Barang
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Button variant="light" onClick={handleShowProduk}>
            <FaFile /> Tambah Baru
          </Button>
          <hr />
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
                Nomor PO <span className="text-danger">*)</span>
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Nomor PO"
                  value={nomorpo}
                  onChange={(e) => {
                    setNomorpo(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalsupp"
            >
              <Form.Label column sm={2}>
                Supplier <span className="text-danger">*)</span>
              </Form.Label>
              <Col sm={10}>
                <InputGroup className="mb-3">
                  <Form.Control
                    value={namasupp}
                    placeholder="Supplier / Pemasok"
                    aria-label="Supplier / Pemasok"
                    aria-describedby="basic-addon2"
                    onChange={(e) => e.target.value}
                  />
                  <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    onClick={handleShowSupplier}
                  >
                    <FaSearch />
                  </Button>
                </InputGroup>
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
                  <th>No. Pesanan</th>
                  <th>Alokasi</th>
                  <th>Qtty</th>
                  <th>Satuan</th>
                  <th>Harga @</th>
                  <th>Diskon %</th>
                  <th>Jumlah Rp</th>
                </tr>
              </thead>
              <tbody>
                {databarang?.length < 1 ? (
                  <tr>
                    <td colSpan={10} align="center">
                      <span>Belum ada data barang</span>
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
                              updateSummary();
                              setDiskonnominalgrand(0);
                              setPpnnominalgrand(0);
                              setPpngrand(0);
                              setDiskongrand(0);
                              setGrandtotal(0);
                              setGrandtotalsum(0);
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
                        <td>
                          <Form.Control
                            type="text"
                            onChange={(e) => {
                              console.log("a");
                            }}
                            onFocus={(e) => e.target.select()}
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            onChange={(e) => {
                              console.log("b");
                            }}
                            onFocus={(e) => e.target.select()}
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="number"
                            value={item["qtybarang"]}
                            min={0}
                            onChange={(e) => {
                              updateJumlahbyqty(
                                item["kodebarang"],
                                parseFloat(e.target.value),
                                parseFloat(item["hargabeliend"])
                              );
                            }}
                            onFocus={(e) => e.target.select()}
                          />
                        </td>
                        <td>{item["satuanbarang"]}</td>
                        <td>
                          <Form.Control
                            type="text"
                            value={parseFloat(item["hargabeliend"])}
                            onChange={(e) => e.target.value}
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="number"
                            value={item["diskonbarang"]}
                            min={0}
                            max={100}
                            onChange={(e) =>
                              updateJumlahbydiskon(
                                item["kodebarang"],
                                parseFloat(item["qtybarang"]),
                                parseFloat(e.target.value),
                                parseFloat(item["hargabeliend"])
                              )
                            }
                            onFocus={(e) => e.target.select()}
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            value={parseFloat(item["jumlahbarang"])}
                            onChange={(e) => e.target.value}
                          />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan={5}></th>
                  <th>{jumlahqty}</th>
                  <th colSpan={3}></th>
                  <th>{jumlahrp}</th>
                </tr>
              </tfoot>
            </Table>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
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
                      onChange={(e) => setKeteranganVal(e.target.value)}
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
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalnopo"
                >
                  <Form.Label column sm={4}>
                    % Diskon / %PPN
                  </Form.Label>
                  <Col sm={8}>
                    <InputGroup className="">
                      <Form.Control
                        type="number"
                        min={0}
                        value={diskongrand}
                        onChange={(e) => {
                          setDiskongrand(parseFloat(e.target.value));
                          updateGrandtotal();
                        }}
                        onFocus={(e) => e.target.select()}
                      />
                      <Form.Control
                        type="number"
                        min={0}
                        value={ppngrand}
                        onChange={(e) => {
                          setPpngrand(parseFloat(e.target.value));
                          updateGrandtotal();
                        }}
                        onFocus={(e) => e.target.select()}
                      />
                    </InputGroup>
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalnopo"
                >
                  <Form.Label column sm={4}>
                    Nominal PPn
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="number"
                      min={0}
                      value={ppnnominalgrand}
                      onChange={(e) => {
                        setPpnnominalgrand(parseFloat(e.target.value));
                        updateGrandtotal();
                      }}
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
                    Nominal Disc
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="number"
                      min={0}
                      value={diskonnominalgrand}
                      onChange={(e) => {
                        setDiskonnominalgrand(parseFloat(e.target.value));
                        updateGrandtotal();
                      }}
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
                    Grand Total
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type="number"
                      min={0}
                      value={grandtotalsum}
                      onChange={(e) => e.target.value}
                      onFocus={(e) => e.target.select()}
                    />
                  </Col>
                </Form.Group>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Tutup
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              simpanPO();
            }}
          >
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              hidden={loadSave}
            />
            <FaRegSave /> Simpan PO
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        size="lg"
        animation={false}
        show={showsupplier}
        onHide={handleCloseSupplier}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Pencarian Supplier
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Viewdatasupplier onClick={handleDetailSupplier} />
        </Modal.Body>
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
