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
} from "react-icons/fa";

import { getOrderBarang, getPoCount } from "./../../function/Orderbarang";
import { getCurrentDateInput } from "./../../function/Datenow";
import { Tambahorderbarang } from "./tambah";

export function Viewdata() {
  const [stockPo, setStockPo] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showmodaltambah, setShowModalTambah] = useState(false);

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

  const handleShowTambah = () => {
    setShowModalTambah(true);
  };

  const handleHideModalTambah = () => {
    setShowModalTambah(false);
  };

  const [noData, setNoData] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  const [countpo, setCountpo] = useState(0);
  const [ketpo, setKetPo] = useState("");
  const [optionfilter, setoptionfilter] = useState("Nomor PO");
  const [optionfiltertanggal, setoptionfiltertanggal] = useState("Semua");
  const [optionbulanval, setOptionBulanVal] = useState("");
  const [optiontahunval, setOptionTahunVal] = useState<any[]>([]);
  const [defaultoptiontahunval, setDefaultOptionTahunVal] = useState("");

  const [page, setPage] = useState(1);
  const [limitQuery, setLimitQuery] = useState(0);
  const options = [
    { value: "Nomor PO", label: "Nomor PO" },
    { value: "Nama Supplier", label: "Nama Supplier" },
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

  async function getDataPo(
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
    const response = await getOrderBarang(
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
    setStockPo(response);
  }

  async function getDataCountPo(
    like: string,
    option: string,
    filter: string,
    tanggaldari: string,
    tanggalsampai: string,
    bulan: string,
    tahun: string
  ) {
    const response = await getPoCount(
      like,
      option,
      filter,
      tanggaldari,
      tanggalsampai,
      bulan,
      tahun
    );
    setCountpo(response);
  }

  const prosesFilterTanggal = () => {
    loadingDatas();
    handleCloseFilter();
  };

  const nextPage = () => {
    limitPage = Math.ceil(countpo / 10);

    if (page >= limitPage) {
      setPage(limitPage);
    } else {
      setPage(page + 1);
    }

    nextPageAct = limitQuery + 10;
    setLimitQuery(nextPageAct);

    if (nextPageAct >= countpo) {
      nextPageAct = countpo;
      setLimitQuery(nextPageAct);
    }

    getDataPo(
      ketpo,
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

    getDataPo(
      ketpo,
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
    getDataPo(
      ketpo,
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
    dataCount = countpo - (countpo % 10);
    limitPage = Math.ceil(countpo / 10);

    setLimitQuery(dataCount);
    getDataPo(
      ketpo,
      countpo - (countpo % 10),
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
    getDataCountPo(
      ketpo,
      optionfilter,
      optionfiltertanggal,
      tanggaldari,
      tanggalsampai,
      optionbulanval,
      defaultoptiontahunval
    );
    getDataPo(
      ketpo,
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

  useEffect(() => {
    loadingDatas();
    getYear();
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
            onClick={handleShowTambah}
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
            placeholder={"Nomor PO"}
            onChange={(e: any) => setoptionfilter(e.value)}
            options={options}
          />
          <Form.Control
            placeholder={"Cari by " + optionfilter + " [Enter]"}
            aria-label=""
            onChange={(mytext) => setKetPo(mytext.target.value)}
            onKeyUp={(event: { key: string }) => {
              if (event.key === "Enter") {
                loadingDatas();
              }
            }}
          />
        </InputGroup>
      </ButtonToolbar>
      <Tambahorderbarang
        show={showmodaltambah}
        onHide={handleHideModalTambah}
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
        {stockPo?.length < 1 ? (
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
          stockPo?.map((item, i) => {
            return (
              <div
                className="card"
                key={i}
                style={{ cursor: "pointer", marginTop: 5 }}
              >
                <div className="card-body p-0 p-2 d-flex justify-content-between">
                  <span>
                    {item["Tanggal"] + " - " + item["Nomor PO"]}
                    <br />
                    <small className="text-muted" style={{ fontSize: 11 }}>
                      {item["Nama Supplier"]}
                    </small>
                  </span>

                  <Button
                    variant="light"
                    className="btn-sm text-primary"
                    onClick={() => console.log(item["Nomor PO"])}
                  >
                    <FaEye />
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
              <th>Nomor Po</th>
              <th>Nama Supplier</th>
              <th>Departemen</th>
              <th>Jlh Qtty</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {stockPo?.length < 1 ? (
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
              stockPo?.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item["Tanggal"]}</td>
                    <td>{item["Nomor PO"]}</td>
                    <td>{item["Nama Supplier"]}</td>
                    <td>{item["Departemen"]}</td>
                    <td>{item["Qtty"]}</td>
                    <td>
                      <Button
                        variant="light"
                        className="btn-sm text-primary"
                        onClick={() => console.log(item["Nomor PO"])}
                      >
                        <FaEye />
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
              Total Data : <strong>{countpo}</strong>
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
