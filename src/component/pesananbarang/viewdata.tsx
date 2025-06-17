import {
  Spinner,
  Table,
  Button,
  ButtonToolbar,
  InputGroup,
  Modal,
  Form,
  Row,
  Col,
  ButtonGroup,
} from "react-bootstrap";
import Select from "react-select";
import { useState, useEffect } from "react";
import {
  FaEye,
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
  FaFileMedical,
  FaFilter,
  FaCheckSquare,
  FaTrash,
  FaPrint,
} from "react-icons/fa";
import { createMessage, createMessageConfirm } from "./../../function/Alert";
import {
  getPesananBarang,
  getPesananCount,
  getPesananDetailTglClosing,
  getPesananbyID,
  deleteDatapesanan,
  deleteDatapesanandetail,
} from "./../../function/Pesananbarang";
import { getCurrentDateInput } from "./../../function/Datenow";
import { Tambahpesananbarang } from "./tambah";
import { cekStockPoDetailbyNopesanan } from "./../../function/Stock";
import { closingbulanan } from "./../../function/Closingbulanan";

export function Viewdata(props: any) {
  const [pesananbarang, setPesananbarang] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [noData, setNoData] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  const [countpesanan, setCountpesanan] = useState(0);
  const [showmodaltambah, setShowModalTambah] = useState(false);
  const [nomorpesanan, setnomorpesanan] = useState("");
  const [ketpesanan, setKetPesanan] = useState("");
  const [optionfilter, setoptionfilter] = useState("Nomor Pesanan");
  const [optionfiltertanggal, setoptionfiltertanggal] = useState("Semua");
  const [optionbulanval, setOptionBulanVal] = useState("");
  const [optiontahunval, setOptionTahunVal] = useState<any[]>([]);
  const [defaultoptiontahunval, setDefaultOptionTahunVal] = useState("");
  const [datadetailpo, setDatadetailpo] = useState<any[]>([]);
  const [datadetailpesanan, setDatadetailpesanan] = useState<any[]>([]);
  const [datadetailpesananid, setDatadetailpesananid] = useState<any[]>([]);
  const [closebulanan, setClosebulanan] = useState([]);
  const [tanggaldaily, setTanggalDaily] = useState(
    getCurrentDateInput(new Date())
  );

  const [tanggaldari, setTanggalDari] = useState(
    getCurrentDateInput(new Date())
  );
  const [tanggalsampai, setTanggalSampai] = useState(
    getCurrentDateInput(new Date())
  );

  const handleCloseFilter = () => {
    setShowFilter(false);
  };
  const handleShowFilter = () => setShowFilter(true);

  const [page, setPage] = useState(1);
  const [limitQuery, setLimitQuery] = useState(0);
  const options = [
    { value: "Nomor Pesanan", label: "Nomor Pesanan" },
    { value: "Departemen", label: "Departemen" },
  ];
  const optionsfilter = [
    { value: "Semua", label: "Semua" },
    { value: "Tanggal", label: "Berdasarkan Tanggal" },
    { value: "Bulan", label: "Berdasarkan Bulan" },
    { value: "Tahun", label: "Berdasarkan Tahun" },
  ];

  const optionsBulan = [
    { value: "01", label: "01" },
    { value: "02", label: "02" },
    { value: "03", label: "03" },
    { value: "04", label: "04" },
    { value: "05", label: "05" },
    { value: "06", label: "06" },
    { value: "07", label: "07" },
    { value: "08", label: "08" },
    { value: "09", label: "09" },
    { value: "10", label: "10" },
    { value: "11", label: "11" },
    { value: "12", label: "12" },
  ];

  const getYear = () => {
    const yeardump = [];
    for (let i = 0; i < 20; i++) {
      yeardump.push({
        value: new Date().getFullYear() - i,
        label: new Date().getFullYear() - i,
      });
    }

    setOptionTahunVal(yeardump);
  };

  let limitPage = 0;
  let nextPageAct = 0;
  let dataCount = 0;

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

  const getclosingbulanan = async (periode: string, tanggal: string) => {
    const dataclosingval = await closingbulanan(periode, tanggal);
    setClosebulanan(dataclosingval);
  };

  async function getDataPesanan(
    like: string,
    limitqueryprev: number,
    limitquery: number,
    option: string,
    filter: string,
    tanggaldari: string,
    tanggalsampai: string,
    bulan: string,
    tahun: string
  ) {
    const response = await getPesananBarang(
      like,
      limitqueryprev,
      limitquery,
      option,
      filter,
      tanggaldari,
      tanggalsampai,
      bulan,
      tahun
    );
    setPesananbarang(response);
  }

  const handlePesananBarang = (event: any) => {
    setnomorpesanan(event);
  };

  async function getDataCountPesanan(
    like: string,
    option: string,
    filter: string,
    tanggaldari: string,
    tanggalsampai: string,
    bulan: string,
    tahun: string
  ) {
    const response = await getPesananCount(
      like,
      option,
      filter,
      tanggaldari,
      tanggalsampai,
      bulan,
      tahun
    );
    setCountpesanan(response);
  }

  const prosesFilterTanggal = () => {
    loadingDatas();
    handleCloseFilter();
  };

  const nextPage = () => {
    limitPage = Math.ceil(countpesanan / 10);

    if (page >= limitPage) {
      setPage(limitPage);
    } else {
      setPage(page + 1);
    }

    nextPageAct = limitQuery + 10;
    setLimitQuery(nextPageAct);

    if (nextPageAct >= countpesanan) {
      nextPageAct = countpesanan;
      setLimitQuery(nextPageAct);
    }

    getDataPesanan(
      ketpesanan,
      nextPageAct,
      10,
      optionfilter,
      optionfiltertanggal,
      tanggaldari,
      tanggalsampai,
      optionbulanval,
      defaultoptiontahunval
    );
  };

  const prevPage = () => {
    if (page <= 1) {
      setPage(1);
    } else {
      setPage(page - 1);
    }

    if (limitQuery % 10 != 0) {
      nextPageAct = Math.floor(limitQuery / 10) * 10;
    } else {
      nextPageAct = limitQuery - 10;
    }
    setLimitQuery(nextPageAct);
    if (nextPageAct < 1) {
      nextPageAct = 0;
      setLimitQuery(nextPageAct);
    }

    getDataPesanan(
      ketpesanan,
      nextPageAct,
      10,
      optionfilter,
      optionfiltertanggal,
      tanggaldari,
      tanggalsampai,
      optionbulanval,
      defaultoptiontahunval
    );
  };

  const firstPage = () => {
    setLimitQuery(0);
    getDataPesanan(
      ketpesanan,
      0,
      10,
      optionfilter,
      optionfiltertanggal,
      tanggaldari,
      tanggalsampai,
      optionbulanval,
      defaultoptiontahunval
    );
    setPage(1);
  };

  const lastPage = () => {
    dataCount = countpesanan - (countpesanan % 10);
    limitPage = Math.ceil(countpesanan / 10);

    setLimitQuery(dataCount);
    getDataPesanan(
      ketpesanan,
      countpesanan - (countpesanan % 10),
      10,
      optionfilter,
      optionfiltertanggal,
      tanggaldari,
      tanggalsampai,
      optionbulanval,
      defaultoptiontahunval
    );
    setPage(limitPage);
  };

  const loadingDatas = () => {
    setLoadingData(false);
    getDataCountPesanan(
      ketpesanan,
      optionfilter,
      optionfiltertanggal,
      tanggaldari,
      tanggalsampai,
      optionbulanval,
      defaultoptiontahunval
    );
    getDataPesanan(
      ketpesanan,
      0,
      10,
      optionfilter,
      optionfiltertanggal,
      tanggaldari,
      tanggalsampai,
      optionbulanval,
      defaultoptiontahunval
    );
    setNoData("");
    setTimeout(() => {
      setLoadingData(true);
      setNoData("Data Tidak Ditemukan");
    }, 5000);
  };

  const handleShowTambah = (nopes: string) => {
    setnomorpesanan(nopes);
    setShowModalTambah(true);
  };

  const handleHideModalTambah = () => {
    setShowModalTambah(false);
  };

  const deletePesanan = (nomorpesanan: string) => {
    getdetailpo(nomorpesanan);
    getdetailpesanan(nomorpesanan);
    getdetailpesananid(nomorpesanan);
    createMessageConfirm(
      "Peringatan",
      "Yakin ingin menghapus data ini?",
      "question",
      "Hapus",
      "Batal"
    ).then(async (result) => {
      if (result == "confirmed") {
        if (datadetailpo.length > 0) {
          createMessage(
            "Error",
            "No. Pesanan " +
              nomorpesanan +
              " Sudah Ada PO Barang, Proses Edit diBatalkan?",
            "error"
          );
          return;
        }

        if (datadetailpesanan.length > 0) {
          createMessage(
            "Error",
            "No. Pesanan " +
              nomorpesanan +
              " Sudah diLakukan Closing Pesanan, Proses Edit diBatalkan?",
            "error"
          );
          return;
        }

        if (datadetailpesananid.length > 0) {
          getclosingbulanan("stock_periode", datadetailpesananid[0]["Tgl"]);
          if (closebulanan[0]["status"] == false) {
            createMessage("Error", closebulanan[0]["message"], "error");
            return;
          }
        }

        const response = await deleteDatapesanan(nomorpesanan);
        const response1 = await deleteDatapesanandetail(nomorpesanan);

        if (
          response["message"] == "success" &&
          response1["message"] == "success"
        ) {
          createMessage(
            "Success",
            "Order barang berhasil dihapus",
            "success"
          ).then(() => {
            loadingDatas();
          });
        } else {
          createMessage("Error", "Terjadi kesalahan", "error").then(() => {});
        }
      }
    });
  };

  useEffect(() => {
    loadingDatas();
    getYear();
    getdetailpo("*");
    getdetailpesanan("*");
    getdetailpesananid("*");
    getclosingbulanan("stock_periode", tanggaldaily);
  }, []);

  return (
    <div>
      <ButtonToolbar
        className="justify-content-between mb-3"
        aria-label="Toolbar with Button groups"
      >
        <ButtonGroup aria-label="First group" className="mt-2">
          <Button
            variant="info"
            className="text-white"
            onClick={() => handleShowTambah("")}
          >
            <FaFileMedical /> Tambah Baru
          </Button>
          <Button
            variant="secondary"
            className="text-white"
            onClick={handleShowFilter}
          >
            <FaFilter /> Filter
          </Button>
        </ButtonGroup>
        <InputGroup className="mt-2">
          <Select
            defaultValue={optionfilter}
            placeholder={"Nomor Pesanan"}
            onChange={(e: any) => setoptionfilter(e.value)}
            options={options}
          />
          <Form.Control
            placeholder={"Cari by " + optionfilter + " [Enter]"}
            aria-label=""
            onChange={(mytext) => setKetPesanan(mytext.target.value)}
            onKeyUp={(event: { key: string }) => {
              if (event.key === "Enter") {
                loadingDatas();
              }
            }}
          />
        </InputGroup>
      </ButtonToolbar>
      <Tambahpesananbarang
        show={showmodaltambah}
        onHide={handleHideModalTambah}
        onData={nomorpesanan}
      />
      <Modal
        animation={false}
        show={showFilter}
        onHide={handleCloseFilter}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Filter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Select
              defaultValue={optionfiltertanggal}
              placeholder={"Berdasarkan Tanggal"}
              onChange={(e: any) => setoptionfiltertanggal(e.value)}
              options={optionsfilter}
              value={optionsfilter.filter(function (option: any) {
                return option.value === optionfiltertanggal;
              })}
              className="mb-3"
            />

            {optionfiltertanggal == "Tanggal" || optionfiltertanggal == "" ? (
              <div>
                <Form.Label>Tanggal Dari</Form.Label>
                <Form.Control
                  aria-label="Tanggal Dari"
                  type="date"
                  value={tanggaldari}
                  onChange={(mytext) => setTanggalDari(mytext.target.value)}
                />
                <Form.Label className="mt-3">Tanggal Sampai</Form.Label>
                <Form.Control
                  aria-label="Tanggal Sampai"
                  type="date"
                  value={tanggalsampai}
                  onChange={(mytext) => setTanggalSampai(mytext.target.value)}
                />
              </div>
            ) : optionfiltertanggal == "Bulan" ? (
              <div>
                <Form.Label>Bulan</Form.Label>
                <Select
                  defaultValue={optionbulanval}
                  placeholder={"Bulan"}
                  onChange={(e: any) => setOptionBulanVal(e.value)}
                  options={optionsBulan}
                />
                <Form.Label className="mt-3">Tahun</Form.Label>
                <Select
                  defaultValue={defaultoptiontahunval}
                  placeholder={"Tahun"}
                  onChange={(e: any) => setDefaultOptionTahunVal(e.value)}
                  options={optiontahunval}
                />
              </div>
            ) : optionfiltertanggal == "Tahun" ? (
              <div>
                <Form.Label>Tahun</Form.Label>
                <Select
                  defaultValue={defaultoptiontahunval}
                  placeholder={"Tahun"}
                  onChange={(e: any) => setDefaultOptionTahunVal(e.value)}
                  options={optiontahunval}
                />
              </div>
            ) : (
              ""
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseFilter}>
            Tutup
          </Button>
          <Button variant="primary" onClick={prosesFilterTanggal}>
            Proses
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="d-lg-none d-sm-block">
        {pesananbarang?.length < 1 ? (
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
          pesananbarang?.map((item, i) => {
            return (
              <div
                className="card"
                key={i}
                style={{ cursor: "pointer", marginTop: 5 }}
              >
                <div className="card-body p-0 p-2 d-flex justify-content-between">
                  <span>
                    {item["tanggal"] + " - " + item["NoPesanan"]}
                    <br />
                    <small className="text-muted" style={{ fontSize: 11 }}>
                      {item["Departemen"] + "(" + item["Qtty"] + ")"}
                    </small>
                  </span>

                  <Button
                    variant="light"
                    className="btn-sm text-primary"
                    onClick={() => handlePesananBarang(item["NoPesanan"])}
                  >
                    <FaCheckSquare />
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
              <th>Tanggal</th>
              <th>Nomor Pesanan</th>
              <th>Departemen</th>
              <th>Jlh Qtty</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {pesananbarang?.length < 1 ? (
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
              pesananbarang?.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item["tanggal"]}</td>
                    <td>{item["NoPesanan"]}</td>
                    <td>{item["Departemen"]}</td>
                    <td>{item["Qtty"]}</td>
                    <td>
                      <Button
                        variant="light"
                        className="btn-sm text-primary"
                        onClick={() => handleShowTambah(item["NoPesanan"])}
                      >
                        <FaEye />
                      </Button>{" "}
                      <Button
                        variant="light"
                        className="btn-sm text-danger"
                        onClick={() => deletePesanan(item["NoPesanan"])}
                      >
                        <FaTrash />
                      </Button>{" "}
                      <Button
                        variant="light"
                        className="btn-sm text-secondary"
                        onClick={() => console.log(item["Nomor PO"])}
                      >
                        <FaPrint />
                      </Button>
                    </td>
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
              Total Data : <strong>{countpesanan}</strong>
            </i>
          </small>
        </span>
      </div>

      <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
        <ButtonGroup aria-label="Basic example">
          <Button variant="light" onClick={() => firstPage()}>
            <FaAngleDoubleLeft />
          </Button>
          <Button variant="light" onClick={() => prevPage()}>
            <FaAngleLeft />
          </Button>
          <Button variant="primary">{page}</Button>
          <Button variant="light" onClick={() => nextPage()}>
            <FaAngleRight />
          </Button>
          <Button variant="light" onClick={() => lastPage()}>
            <FaAngleDoubleRight />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
