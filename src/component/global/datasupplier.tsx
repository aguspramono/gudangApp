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
  getSupplier,
  getSupplierNoFilt,
  getSupplierId,
} from "./../../function/Supplier";

export function Viewdatasupplier(props: any) {
  const [supplier, setSupplier] = useState([]);
  const [countsupplier, setCountsupplier] = useState(0);
  const [ketSupplier, setKetSupllier] = useState("");
  const [optionfilter, setoptionfilter] = useState("Nama");

  const [page, setPage] = useState(1);
  const [limitQuery, setLimitQuery] = useState(0);
  const options = [
    { value: "Nama", label: "Nama" },
    { value: "Kota", label: "Kota" },
  ];

  const [noData, setNoData] = useState("");
  const [loadingData, setLoadingData] = useState(false);

  const handleDetailSupplier = async (event: any) => {
    const response = await getSupplierId(event);
    props.onClick(response);
  };

  let limitPage = 0;
  let nextPageAct = 0;
  let dataCount = 0;

  async function getDataSupplier(
    like: string,
    limitqueryprev: number,
    limitquery: number,
    option: string
  ) {
    const response = await getSupplier(
      like,
      limitqueryprev,
      limitquery,
      option
    );
    setSupplier(response);
  }

  async function getDataCountSupplier(like: string, option: string) {
    const response = await getSupplierNoFilt(like, option);
    setCountsupplier(response);
  }

  const nextPage = () => {
    limitPage = Math.ceil(countsupplier / 10);

    if (page >= limitPage) {
      setPage(limitPage);
    } else {
      setPage(page + 1);
    }

    nextPageAct = limitQuery + 10;
    setLimitQuery(nextPageAct);

    if (nextPageAct >= countsupplier) {
      nextPageAct = countsupplier;
      setLimitQuery(nextPageAct);
    }

    getDataSupplier(ketSupplier, nextPageAct, 10, optionfilter);
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

    getDataSupplier(ketSupplier, nextPageAct, 10, optionfilter);
  };

  const firstPage = () => {
    setLimitQuery(0);
    getDataSupplier(ketSupplier, 0, 10, optionfilter);
    setPage(1);
  };

  const lastPage = () => {
    dataCount = countsupplier - (countsupplier % 10);
    limitPage = Math.ceil(countsupplier / 10);

    setLimitQuery(dataCount);
    getDataSupplier(
      ketSupplier,
      countsupplier - (countsupplier % 10),
      10,
      optionfilter
    );
    setPage(limitPage);
  };

  const loadingDatas = () => {
    setLoadingData(false);
    getDataCountSupplier(ketSupplier, optionfilter);
    getDataSupplier(ketSupplier, 0, 10, optionfilter);
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
          onChange={(mytext) => setKetSupllier(mytext.target.value)}
          onKeyUp={(event: { key: string }) => {
            if (event.key === "Enter") {
              loadingDatas();
            }
          }}
        />
      </InputGroup>
      <div className="d-lg-none d-sm-block">
        {supplier?.length < 1 ? (
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
          supplier?.map((item, i) => {
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
                    onClick={() => handleDetailSupplier(item["sNo_Acc"])}
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
              <th>No.Supplier</th>
              <th>Nama Supplier</th>
              <th>Alamat Supplier</th>
              <th>Kota Supplier</th>
              <th>Telepon</th>
              <th>Email</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {supplier?.length < 1 ? (
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
              supplier?.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item["sNo_Acc"]}</td>
                    <td>{item["Nama"]}</td>
                    <td>{item["Alamat"]}</td>
                    <td>{item["Kota"]}</td>
                    <td>{item["Phone"]}</td>
                    <td>{item["Email"]}</td>
                    <td>
                      <Button
                        variant="light"
                        className="btn-sm text-primary"
                        onClick={() => handleDetailSupplier(item["sNo_Acc"])}
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
              Total Data : <strong>{countsupplier}</strong>
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
