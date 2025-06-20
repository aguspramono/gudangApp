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
  cekStockPoDetailbyNopoOnly,
} from "./../../function/Stock";
import { closingbulanan } from "./../../function/Closingbulanan";
import { getPesananDetailByID } from "./../../function/Pesananbarang";
import { Viewdatapesanandetail } from "./../pesananbarang/viewdatadetailpesananbarang";

export const Tambahorderbarang = (props: any) => {
  const [loadSave, setLoadSave] = useState(true);
  const [showsupplier, setShowsupplier] = useState(false);
  const [showproduk, setShowproduk] = useState(false);
  const [showpesanan, setShowpesanan] = useState(false);
  const [databarang, setDatabarang] = useState<any[]>([]);
  const [purchdetail, setPurchdetail] = useState([]);
  const [pesanandetail, setPesanandetail] = useState([]);
  const [stockpodetail, setStockpodetail] = useState([]);
  const [stockpodetailnoponly, setDataNoponly] = useState([]);

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
  const [kodebarang, setKodebarang] = useState("");
  const [nomorpo, setNomorpo] = useState("");
  const [nomorpotempval, setNomorpotempval] = useState("");
  const [kodesupp, setKodeSupp] = useState("");
  const [namasupp, setNamaSupp] = useState("");
  const [diskongrand, setDiskongrand] = useState(0);
  const [ppngrand, setPpngrand] = useState(0);
  const [diskonnominalgrand, setDiskonnominalgrand] = useState(0);
  const [ppnnominalgrand, setPpnnominalgrand] = useState(0);
  const [grandtotal, setGrandtotal] = useState(0);
  const [grandtotalsum, setGrandtotalsum] = useState(0);
  const [keteranganval, setKeteranganVal] = useState("");

  const handleCloseSupplier = () => {
    setShowsupplier(false);
  };
  const handleShowSupplier = () => setShowsupplier(true);

  const handleCloseProduk = () => {
    setShowproduk(false);
  };
  const handleClosePesanan = () => {
    setShowpesanan(false);
  };
  const handleShowProduk = () => setShowproduk(true);
  const handleShowPesanan = (kodebarang: string) => {
    setShowpesanan(true);
    setKodebarang(kodebarang);
  };

  const handleGudang = (e: any) => {
    setGudang(e);
  };

  const handleDepartemen = (e: any) => {
    setDepartemen(e);
  };

  const bersih = () => {
    setDatabarang([]);
    setNomorpo("");
    setKodeSupp("");
    setNamaSupp("");
    setKeteranganVal("");
    setDiskongrand(0);
    setPpngrand(0);
    setPpnnominalgrand(0);
    setDiskonnominalgrand(0);
    setGrandtotal(0);
    setGrandtotalsum(0);
    setJumlahqty(0);
    setJumlahrp(0);
  };

  const dataPesananByID = async (nopo: string, kodebar: string) => {
    const response = await getPesananDetailByID(nopo, kodebar);
    setPesanandetail(response);

    setDatabarang((prev) =>
      prev.map((item) =>
        item.kodebarang === kodebarang
          ? {
              ...item,
              nomorpesanan: response[0]["NoPesanan"],
              alokasi: response[0]["Alokasi"],
            }
          : item
      )
    );
    handleClosePesanan();
  };

  const handlePesananBarang = (e: any, e2: any) => {
    dataPesananByID(e, e2);
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

  const updatenopesanan = (kode: string, nopes: string) => {
    setDatabarang((prev) =>
      prev.map((item) =>
        item.kodebarang === kode
          ? {
              ...item,
              nomorpesanan: nopes,
            }
          : item
      )
    );
  };

  const handleDetailSupplier = (e: any) => {
    setKodeSupp(e[0]["sNo_Acc"]);
    setNamaSupp(e[0]["Nama"]);
    handleCloseSupplier();
  };

  const datastockpurchdetail = async (nomorpoval: string) => {
    const responsstockpurchdetail = await cekStockPurchDetailbyNopo(nomorpoval);
    setPurchdetail(responsstockpurchdetail);
  };

  const datastockpodetail = async (nomorpoval: string) => {
    const responsstockpodetail = await cekStockPoDetailbyNopo(nomorpoval);
    setStockpodetail(responsstockpodetail);
  };

  const getpodetailnonlyfunc = async (nomorpoval: string) => {
    const response = await cekStockPoDetailbyNopoOnly(nomorpoval);
    setDataNoponly(response);
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

  const handleProductDetail = (e: any) => {
    databarang.push({
      kodebarang: e[0]["Kode"],
      namabarang: e[0]["Nama"],
      qtybarang: 0,
      satuanbarang: e[0]["Satuan"],
      hargabeliend: e[0]["hBeliEnd"],
      diskonbarang: 0,
      jumlahbarang: 0,
      nomorpesanan: "",
      alokasi: "",
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

  const handleOnData = async () => {
    bersih();
    setNomorpotempval(props["onData"]);
    const datastockpodetail = await cekStockPoDetailbyNopoOnly(props["onData"]);
    const datastockpo = await getDataPo(props["onData"]);
    setNomorpo(props["onData"]);
    setKodeSupp(datastockpo[0]["sNo_Acc"]);
    setNamaSupp(datastockpo[0]["Nama"]);
    setGudang(datastockpo[0]["Gudang"]);
    setDepartemen(datastockpodetail[0]["Departemen"]);
    setTanggalDaily(getCurrentDateInput(new Date(datastockpo[0]["Tgl"])));
    setDiskongrand(datastockpo[0]["Disc"]);
    setPpngrand(datastockpo[0]["PPn"]);
    setDiskonnominalgrand(datastockpo[0]["NominalDisc"]);
    setPpnnominalgrand(datastockpo[0]["NominalPPn"]);
    setKeteranganVal(datastockpo[0]["Keterangan"]);
    let databarangarr: SetStateAction<any[]> = [];
    datastockpodetail?.map((item: any) => {
      let total = 0;
      if (parseFloat(item["Disc"]) > 0) {
        total =
          parseFloat(item["Qtty"]) * parseFloat(item["hBeliEnd"]) -
          (parseFloat(item["Qtty"]) *
            parseFloat(item["hBeliEnd"]) *
            parseFloat(item["Disc"])) /
            100;
      } else {
        total = parseFloat(item["Qtty"]) * parseFloat(item["hBeliEnd"]);
      }
      databarangarr.push({
        kodebarang: item["Kode"],
        namabarang: item["Nama"],
        qtybarang: item["Qtty"],
        satuanbarang: item["Satuan"],
        hargabeliend: item["hBeliEnd"],
        diskonbarang: item["Disc"],
        jumlahbarang: total,
        nomorpesanan: item["NoPesanan"],
        alokasi: item["Alokasi"],
      });
    });

    setDatabarang(databarangarr);

    updateSummary();
    updateGrandtotal();
    // console.log(datastockpo);
    // console.log(datastockpodetail);
  };

  const simpanPO = async () => {
    setLoadSave(false);
    if (nomorpo === "") {
      createMessage("Error", "Nomor PO masih kosong", "error");
      setLoadSave(true);
      return;
    }

    if (kodesupp === "") {
      createMessage("Error", "Supplier belum dipilih", "error");
      setLoadSave(true);
      return;
    }

    if (departemen === "" || departemen === null) {
      createMessage("Error", "Departemen belum dipilih", "error");
      setLoadSave(true);
      return;
    }

    if (gudang === "" || gudang === null) {
      createMessage("Error", "Gudang belum dipilih", "error");
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

    // if (grandtotal < 1) {
    //   createMessage(
    //     "Error",
    //     "Qty pada barang belum ada yang dimasukkan",
    //     "error"
    //   );
    //   setLoadSave(true);
    //   return;
    // }

    datastockpodetail(nomorpo);
    datastockpurchdetail(nomorpo);
    getdatapofun(nomorpo);

    if (purchdetail.length > 0) {
      createMessage(
        "Error",
        "No. PO " + nomorpo + " Sudah Ada Penerimaan Barang",
        "error"
      );
      setLoadSave(true);
      return;
    }

    if (stockpodetail.length > 0) {
      createMessage(
        "Error",
        "No. PO " + nomorpo + " Sudah diLakukan Closing PO",
        "error"
      );
      setLoadSave(true);
      return;
    }

    if (datapo.length > 0) {
      getclosingbulanan("stock_periode", datapo[0]["Tgl"]);
      if (closebulanan[0]["status"] == false) {
        createMessage("Error", closebulanan[0]["message"], "error");
        setLoadSave(true);
        return;
      }
    }

    deletepofunc(nomorpo);
    deletepodetailfunc(nomorpo);

    const responsepo = await insertpo(
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

    const responsepodetail = await insertpodetail(
      databarang,
      departemen == null ? "" : departemen,
      nomorpo
    );

    if (
      responsepo["message"] == "success" &&
      responsepodetail["message"] == "success"
    ) {
      createMessage("Success", "Po berhasil disimpan", "success").then(() => {
        bersih();
        handleCloseModal();
      });
      setLoadSave(true);
    } else {
      createMessage(
        "Error",
        "Terjadi kesalahan, proses simpan tidak dilanjutkan",
        "error"
      ).then(() => {
        if (props["onData"] == "") {
          deletepofunc(nomorpo);
          deletepodetailfunc(nomorpo);
        }
      });
      setLoadSave(true);
    }
  };

  useEffect(() => {
    updateSummary();
    updateGrandtotal();
    datastockpurchdetail("*");
    datastockpodetail("*");
    getdatapofun("*");
    getpodetailnonlyfunc("*");
    getclosingbulanan("stock_periode", tanggaldaily);
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
            Order Barang
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
                Nomor PO <span className="text-danger">*)</span>
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Nomor PO"
                  value={props["onData"] == "" ? nomorpo : props["onData"]}
                  onChange={(e) => {
                    setNomorpo(e.target.value);
                  }}
                  readOnly={props["onData"] == "" ? false : true}
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
                            value={item["nomorpesanan"]}
                            onChange={(e) => {
                              updatenopesanan(
                                item["kodebarang"],
                                e.target.value
                              );
                            }}
                            onFocus={(e) => e.target.select()}
                            onClick={() => {
                              handleShowPesanan(item["kodebarang"]);
                            }}
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
            />{" "}
            <FaRegSave /> Simpan Order Barang
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

      <Modal
        size="lg"
        animation={false}
        show={showpesanan}
        onHide={handleClosePesanan}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Pencarian Pesanan Barang
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Viewdatapesanandetail onClick={handlePesananBarang} />
        </Modal.Body>
      </Modal>
    </div>
  );
};
