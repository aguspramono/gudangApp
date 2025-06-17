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
import { Optiongudang } from "./../global/optiongudang";
import { Viewdatasupplier } from "./../global/datasupplier";
import { Viewdataproduk } from "./../global/databarang";
import { getCurrentDateInput } from "./../../function/Datenow";
import Select from "react-select";

import {
  getRpurchbyivnum,
  getHutanglunasbyivnum,
  getCekRpurchbyivnum,
  insertpurch,
  insertpurchdetail,
  deletePurch,
  deleteDetailPurch,
  getPurchbyivnum,
  getPurchdetailbyivnum,
} from "./../../function/Penerimaanbarang";

import { updatebatchproduct } from "./../../function/Produk";

import { Viewdataitemorderbarang } from "./../orderbarang/viewitemorderbarang";
import { closingbulanan } from "./../../function/Closingbulanan";

export const Tambahpenerimaanbarang = (props: any) => {
  const [metodepembayaranval, setMetodepembayaranval] = useState("Cash/Tunai");
  const [datarpurch, setDatarpurch] = useState([]);
  const [datahutanglunas, setDatahutanglunas] = useState([]);
  const [cekpurch, setCekPurch] = useState([]);

  const [loadSave, setLoadSave] = useState(true);
  const [showsupplier, setShowsupplier] = useState(false);
  const [showproduk, setShowproduk] = useState(false);
  const [kredit, setShowkredit] = useState("d-none");
  const [kreditval, setKreditval] = useState(0);

  const [showitempo, setShowItemPo] = useState(false);
  const [databarang, setDatabarang] = useState<any[]>([]);
  const [closebulanan, setClosebulanan] = useState([]);

  const [gudang, setGudang] = useState(null);
  const [jumlahqty, setJumlahqty] = useState(0);
  const [jumlahrp, setJumlahrp] = useState(0);

  //def variabel po
  const [tanggaldaily, setTanggalDaily] = useState(
    getCurrentDateInput(new Date())
  );
  const [kodebarang, setKodebarang] = useState("");
  const [nomorinv, setNoInv] = useState("");
  const [kodesupp, setKodeSupp] = useState("");
  const [namasupp, setNamaSupp] = useState("");
  const [diskongrand, setDiskongrand] = useState(0);
  const [ppngrand, setPpngrand] = useState(0);
  const [diskonnominalgrand, setDiskonnominalgrand] = useState(0);
  const [ppnnominalgrand, setPpnnominalgrand] = useState(0);
  const [grandtotal, setGrandtotal] = useState(0);
  const [grandtotalsum, setGrandtotalsum] = useState(0);
  const [keteranganval, setKeteranganVal] = useState("");

  //handle
  const handlePembayaran = () => {
    if (metodepembayaranval == "Cash/Tunai") {
      setShowkredit("d-none");
      setKreditval(0);
    } else {
      setShowkredit("d-block");
    }
  };

  const handleCloseModal = () => {
    props.onHide(false);
  };

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

  const handleDetailSupplier = (e: any) => {
    setKodeSupp(e[0]["sNo_Acc"]);
    setNamaSupp(e[0]["Nama"]);
    handleCloseSupplier();
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
    handleCloseProduk();
  };

  const handleShowItemPO = (kodebarang: string) => {
    setShowItemPo(true);
    setKodebarang(kodebarang);
  };

  const handleCloseItemPo = () => {
    setShowItemPo(false);
  };

  const handleSetItemPo = (e: any) => {
    setDatabarang((prev) =>
      prev.map((item) =>
        item.kodebarang === e[0]["Kode"]
          ? {
              ...item,
              nomorpesanan: e[0]["NoPo"],
              alokasi: e[0]["Alokasi"],
            }
          : item
      )
    );

    handleCloseItemPo();
  };

  const handleUpdateAlokasi = (kodebarang: string, alokasival: string) => {
    setDatabarang((prev) =>
      prev.map((item) =>
        item.kodebarang === kodebarang
          ? {
              ...item,
              alokasi: alokasival,
            }
          : item
      )
    );
  };

  const handleQty = (kodebarang: string, qty: number, harga: number) => {
    if (isNaN(qty)) {
      qty = 0;
    }
    let jumlahharga = qty * harga;
    setDatabarang((prev) =>
      prev.map((item) =>
        item.kodebarang === kodebarang
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

  const handleHarga = (kodebarang: string, harga: number) => {
    if (isNaN(harga)) {
      harga = 0;
    }
    setDatabarang((prev) =>
      prev.map((item) =>
        item.kodebarang === kodebarang
          ? {
              ...item,
              qtybarang: 0,
              hargabeliend: harga,
              diskonbarang: 0,
              jumlahbarang: 0,
            }
          : item
      )
    );

    //updateSummary();
  };

  const handleDiskon = (
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

  //update summary
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

  //Grand Total
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

  //option
  const optionmetodepay = [
    { value: "Cash/Tunai", label: "Cash/Tunai" },
    { value: "Kredit", label: "Kredit" },
  ];

  //bypass
  const getclosingbulanan = async (periode: string, tanggal: string) => {
    const dataclosingval = await closingbulanan(periode, tanggal);
    setClosebulanan(dataclosingval);
  };

  const cekRpuch = async (ivnum: string) => {
    const response = await getRpurchbyivnum(ivnum);
    setDatarpurch(response);
  };

  const cekHutanglunas = async (ivnum: string) => {
    const response = await getHutanglunasbyivnum(ivnum);
    setDatahutanglunas(response);
  };

  const getCekRpurchbyivnumFun = async (ivnum: string) => {
    const response = await getCekRpurchbyivnum(ivnum);
    setCekPurch(response);
  };

  //bersih
  const bersih = () => {
    setDatabarang([]);
    setNoInv("");
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

  //save
  const saveData = async () => {
    setLoadSave(false);
    if (nomorinv == "") {
      createMessage("Error", "Nomor Invoice masih kosong", "error");
      setLoadSave(true);
      return;
    }

    if (kodesupp == "") {
      createMessage("Error", "Supplier masih kosong", "error");
      setLoadSave(true);
      return;
    }

    if (metodepembayaranval == "Kredit" && kreditval <= 0) {
      createMessage("Error", "Lama Kredit Belum Lengkap", "error");
      setLoadSave(true);
      return;
    }

    if (gudang == null) {
      createMessage("Error", "Gudang belum dipilih", "error");
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

    databarang.map((item) => {
      if (item["qtybarang"] == "0") {
        createMessage("Error", "Qty barang ada yang belum diisi", "error");
        setLoadSave(true);
        return;
      }
    });

    cekRpuch(nomorinv);

    if (datarpurch.length > 0) {
      createMessage("Error", "No.Invoice Ini Sudah Ada Proses Retur", "error");
      setLoadSave(true);
      return;
    }

    cekHutanglunas(nomorinv);

    if (datahutanglunas.length > 0) {
      createMessage(
        "Error",
        "No.Invoice Ini Sudah diLakukan Pelunasan",
        "error"
      );
      setLoadSave(true);
      return;
    }

    getCekRpurchbyivnumFun(nomorinv);

    if (cekpurch.length > 0) {
      getclosingbulanan("stock_periode", cekpurch[0]["Tgl"]);
      if (closebulanan[0]["status"] == false) {
        createMessage("Error", closebulanan[0]["message"], "error");
        setLoadSave(true);
        return;
      }

      if (gudang != cekpurch[0]["Gudang"]) {
        createMessage(
          "Error",
          "No. Invoice ( " +
            nomorinv +
            " ) sudah pernah di Input dgn Gudang : " +
            cekpurch[0]["Gudang"],
          "error"
        );
        setLoadSave(true);
        return;
      }
    }

    await deletePurch(nomorinv);
    await deleteDetailPurch(nomorinv);

    const responsepurch = await insertpurch(
      nomorinv,
      tanggaldaily.toString(),
      kodesupp,
      kreditval,
      diskonnominalgrand,
      ppnnominalgrand,
      diskongrand,
      ppngrand,
      keteranganval,
      getCurrentDateInput(new Date()).toString(),
      "Admin"
    );

    const responsepurchdetail = await insertpurchdetail(
      databarang,
      gudang == null ? "" : gudang,
      nomorinv
    );

    await updatebatchproduct(databarang);

    if (
      responsepurch["message"] == "success" &&
      responsepurchdetail["message"] == "success"
    ) {
      createMessage(
        "Success",
        "Penerimaan barang berhasil disimpan",
        "success"
      ).then(() => {
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
          deletePurch(nomorinv);
          deleteDetailPurch(nomorinv);
        }
      });
      setLoadSave(true);
    }
  };

  const handleOnData = async () => {
    bersih();
    const datastockpurchdetail = await getPurchdetailbyivnum(props["onData"]);
    const datastockpurch = await getPurchbyivnum(props["onData"]);

    setNoInv(props["onData"]);
    setKodeSupp(datastockpurch[0]["sNo_Acc"]);
    setNamaSupp(datastockpurch[0]["Nama"]);
    setGudang(datastockpurchdetail[0]["Gudang"]);
    setTanggalDaily(getCurrentDateInput(new Date(datastockpurch[0]["Tgl"])));
    setDiskongrand(datastockpurch[0]["Disc"]);
    setPpngrand(datastockpurch[0]["PPn"]);
    setDiskonnominalgrand(datastockpurch[0]["NominalDisc"]);
    setPpnnominalgrand(datastockpurch[0]["NominalPPn"]);
    setKeteranganVal(datastockpurch[0]["Keterangan"]);
    let databarangarr: SetStateAction<any[]> = [];
    datastockpurchdetail?.map((item: any) => {
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
        nomorpesanan: item["NoPo"],
        alokasi: item["Alokasi"],
      });
    });

    setDatabarang(databarangarr);

    updateSummary();
    updateGrandtotal();
    // console.log(datastockpurch);
    // console.log(datastockpurchdetail);
  };

  useEffect(() => {
    handlePembayaran();
    updateSummary();
    updateGrandtotal();
    getclosingbulanan("stock_periode", tanggaldaily);
    cekRpuch("*");
    cekHutanglunas("*");
    getCekRpurchbyivnumFun("*");
  }, [
    metodepembayaranval,
    kredit,
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
            Penerimaan Barang
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
                  placeholder="Nomor Invoice"
                  value={props["onData"] == "" ? nomorinv : props["onData"]}
                  onChange={(e) => {
                    setNoInv(e.target.value);
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
                  Metode Pembayaran <span className="text-danger">*)</span>
                </Form.Label>
                <Select
                  defaultValue={metodepembayaranval}
                  placeholder={"Cash/Tunai"}
                  onChange={(e: any) => {
                    setMetodepembayaranval(e.value);
                    handlePembayaran();
                  }}
                  options={optionmetodepay}
                  value={optionmetodepay.filter(function (option: any) {
                    return option.value === metodepembayaranval;
                  })}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridCity" className={kredit}>
                <Form.Label>
                  Lama Kredit <span className="text-danger">*)</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  value={kreditval}
                  min={0}
                  onChange={(e) => {
                    setKreditval(parseFloat(e.target.value));
                  }}
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
                  <th>#</th>
                  <th>Kode Barang</th>
                  <th>Description</th>
                  <th>Lokasi</th>
                  <th>No. Po</th>
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
                    <td colSpan={11} align="center">
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
                        {/* Hapus */}
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
                        <td></td>
                        {/* nomor po */}
                        <td>
                          <Form.Control
                            type="text"
                            value={item["nomorpesanan"]}
                            onClick={() => {
                              handleShowItemPO(item["kodebarang"]);
                            }}
                            onChange={(e) => console.log(e.target.value)}
                            onFocus={(e) => e.target.select()}
                            readOnly={true}
                          />
                        </td>
                        {/* Alokasi */}
                        <td>
                          <Form.Control
                            type="text"
                            value={item["alokasi"]}
                            onChange={(e) => {
                              handleUpdateAlokasi(
                                item["kodebarang"],
                                e.target.value
                              );
                            }}
                            onFocus={(e) => e.target.select()}
                          />
                        </td>
                        {/* Qtty */}
                        <td>
                          <Form.Control
                            type="number"
                            min={0}
                            value={item["qtybarang"]}
                            onChange={(e) => {
                              handleQty(
                                item["kodebarang"],
                                parseFloat(e.target.value),
                                item["hargabeliend"]
                              );
                            }}
                            onFocus={(e) => e.target.select()}
                          />
                        </td>
                        {/* Satuan */}
                        <td>{item["satuanbarang"]}</td>
                        {/* harga barang */}
                        <td>
                          <Form.Control
                            type="number"
                            min={0}
                            value={item["hargabeliend"]}
                            onChange={(e) => {
                              handleHarga(
                                item["kodebarang"],
                                parseFloat(e.target.value)
                              );
                            }}
                            onFocus={(e) => e.target.select()}
                          />
                        </td>
                        {/* Diskon */}
                        <td>
                          {" "}
                          <Form.Control
                            type="number"
                            min={0}
                            max={100}
                            value={item["diskonbarang"]}
                            onChange={(e) =>
                              handleDiskon(
                                item["kodebarang"],
                                parseFloat(item["qtybarang"]),
                                parseFloat(e.target.value),
                                parseFloat(item["hargabeliend"])
                              )
                            }
                            onFocus={(e) => e.target.select()}
                          />
                        </td>
                        {/* Jumlah */}
                        <td>
                          {" "}
                          <Form.Control
                            type="number"
                            min={0}
                            value={item["jumlahbarang"]}
                            onChange={(e) => {
                              console.log(e.target.value);
                            }}
                            onFocus={(e) => e.target.select()}
                            readOnly={true}
                          />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan={6}></th>
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
              saveData();
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
            <FaRegSave /> Simpan Penerimaan Barang
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
        show={showitempo}
        onHide={handleCloseItemPo}
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
          <Viewdataitemorderbarang
            onClick={handleSetItemPo}
            datakodebarang={kodebarang}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};
