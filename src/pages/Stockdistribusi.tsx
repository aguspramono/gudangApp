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
import { useState, useEffect } from "react";
import {
  FaFileMedical,
  FaRegSave,
  FaEdit,
  FaRegTrashAlt,
} from "react-icons/fa";

import {
  getDetailSatuan,
  createSatuan,
  updateSatuan,
  deleteSatuan,
} from "./../function/Satuan";

import { createMessage, createMessageConfirm } from "./../function/Alert";
import { Viewdata } from "./../component/stokdistribusi/viewdata";
import { Createdata } from "./../component/stokdistribusi/tambah";

export function Stockdistribusi() {
  return (
    <div style={{ paddingLeft: 20, paddingRight: 20, marginTop: "80px" }}>
      <Breadcrumb>
        <Breadcrumb.Item href="/home">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item active>Stock Distribusi</Breadcrumb.Item>
      </Breadcrumb>

      <Createdata />
      <Viewdata />
    </div>
  );
}
