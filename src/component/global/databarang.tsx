import {
  Spinner,
  Table,
  Button,
  ButtonGroup,
  InputGroup,
  Form,
} from "react-bootstrap";
import Select from "react-select";

import { useState, useEffect } from "react";

import {
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
  FaCheckSquare,
} from "react-icons/fa";

import {
  getProduk,
  getProdukCount,
  getProdukById,
} from "./../../function/Produk";

export function Viewdataproduk(props: any) {
  const [produk, setProduk] = useState([]);
  const [countproduk, setCountproduk] = useState(0);
  const [ketproduk, setKetProduk] = useState("");
  const [optionfilter, setoptionfilter] = useState("Kode Barang");

  const [page, setPage] = useState(1);
  const [limitQuery, setLimitQuery] = useState(0);
  const options = [
    { value: "Nama", label: "Nama" },
    { value: "Kode Barang", label: "Kode Barang" },
    { value: "Merek", label: "Merek" },
    { value: "Kategori", label: "Kategori" },
    { value: "Satuan", label: "Satuan" },
  ];

  const [noData, setNoData] = useState("");
  const [loadingData, setLoadingData] = useState(false);

  const handleDetailBarang = async (event: any) => {
    const response = await getProdukById(event);
    props.onClick(response);
  };

  let limitPage = 0;
  let nextPageAct = 0;
  let dataCount = 0;

  async function getDataProduk(
    like: string,
    limitqueryprev: number,
    limitquery: number,
    option: string
  ) {
    const response = await getProduk(like, limitqueryprev, limitquery, option);
    setProduk(response);
  }

  async function getDataCountProduk(like: string, option: string) {
    const response = await getProdukCount(like, option);
    setCountproduk(response);
  }

  const nextPage = () => {
    limitPage = Math.ceil(countproduk / 10);

    if (page >= limitPage) {
      setPage(limitPage);
    } else {
      setPage(page + 1);
    }

    nextPageAct = limitQuery + 10;
    setLimitQuery(nextPageAct);

    if (nextPageAct >= countproduk) {
      nextPageAct = countproduk;
      setLimitQuery(nextPageAct);
    }

    getDataProduk(ketproduk, nextPageAct, 10, optionfilter);
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

    getDataProduk(ketproduk, nextPageAct, 10, optionfilter);
  };

  const firstPage = () => {
    setLimitQuery(0);
    getDataProduk(ketproduk, 0, 10, optionfilter);
    setPage(1);
  };

  const lastPage = () => {
    dataCount = countproduk - (countproduk % 10);
    limitPage = Math.ceil(countproduk / 10);

    setLimitQuery(dataCount);
    getDataProduk(
      ketproduk,
      countproduk - (countproduk % 10),
      10,
      optionfilter
    );
    setPage(limitPage);
  };

  const loadingDatas = () => {
    setLoadingData(false);
    getDataCountProduk(ketproduk, optionfilter);
    getDataProduk(ketproduk, 0, 10, optionfilter);
    setNoData("");
    setTimeout(() => {
      setLoadingData(true);
      setNoData("Data Tidak Ditemukan");
    }, 5000);
  };

  useEffect(() => {
    loadingDatas();
  }, []);

  return (
    <div>
      <InputGroup className="mb-3">
        <Select
          defaultValue={optionfilter}
          onChange={(e: any) => setoptionfilter(e.value)}
          options={options}
        />
        <Form.Control
          placeholder={"Cari berdasarkan " + optionfilter + " [Enter]"}
          aria-label=""
          onChange={(mytext) => setKetProduk(mytext.target.value)}
          onKeyUp={(event: { key: string }) => {
            if (event.key === "Enter") {
              loadingDatas();
            }
          }}
        />
      </InputGroup>
      <div className="d-lg-none d-sm-block">
        {produk?.length < 1 ? (
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
          produk?.map((item, i) => {
            return (
              <div
                className="card"
                key={i}
                style={{ cursor: "pointer", marginTop: 5 }}
              >
                <div className="card-body p-0 p-2 d-flex justify-content-between">
                  <span>{item["Nama"]}</span>
                  <Button
                    variant="light"
                    className="btn-sm text-primary"
                    onClick={() => handleDetailBarang(item["Kode"])}
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
              <th>Kode Barang</th>
              <th>Nama Barang</th>
              <th>Merek</th>
              <th>Kategori</th>
              <th>Satuan</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {produk?.length < 1 ? (
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
              produk?.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item["Kode"]}</td>
                    <td>{item["Nama"]}</td>
                    <td>{item["Merek"]}</td>
                    <td>{item["Kategori"]}</td>
                    <td>{item["Satuan"]}</td>
                    <td>
                      <Button
                        variant="light"
                        className="btn-sm text-primary"
                        onClick={() => handleDetailBarang(item["Kode"])}
                      >
                        <FaCheckSquare />
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
              Total Data : <strong>{countproduk}</strong>
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
