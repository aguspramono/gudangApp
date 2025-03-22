import Select from "react-select";
import {
  Spinner,
  Button,
  Modal,
  Form,
  Row,
  Col,
  ButtonToolbar,
  ButtonGroup,
  InputGroup,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  FaFile,
  FaSearch,
  FaPrint,
  FaEdit,
  FaRegSave,
  FaTrash,
  FaSave,
} from "react-icons/fa";
import { createMessage, createMessageConfirm } from "./../function/Alert";
import { getCurrentDateInput } from "./../function/Datenow";
import { getPeriodeAktif } from "./../function/Periode";
import { getAktifday, updateAktifDay } from "./../function/Aktifday";
import { format, compareAsc, nextDay } from "date-fns";

export const Pindahsaldo = (props: any) => {
  const [tanggaldaily, setTanggalDaily] = useState(
    getCurrentDateInput(new Date())
  );
  const [tanggalperiodesekarangdari, setTanggalperiodesekarangdari] = useState(
    getCurrentDateInput(new Date())
  );
  const [tanggalperiodesekarangsampai, setTanggalperiodesekarangsampai] =
    useState(getCurrentDateInput(new Date()));
  const [tanggalperiodeberikutdari, setTanggalperiodeberikutdari] = useState(
    getCurrentDateInput(new Date())
  );
  const [tanggalperiodeberikutsampai, setTanggalperiodeberikutsampai] =
    useState(getCurrentDateInput(new Date()));
  const [periodesekarang, setPeriodesekarang] = useState(0);
  const [periodeberikut, setPeriodeberikut] = useState(0);

  const handleCloseModal = () => {
    props.onHide(false);
  };

  const getDataAktifDay = async () => {
    const response = await getAktifday();
    setTanggalDaily(response[0]["Tgl"]);
  };

  const getPeriodeActive = async () => {
    const response = await getPeriodeAktif();

    setTanggalperiodesekarangdari(response[0]["Tgl"]);
    setTanggalperiodesekarangsampai(response[0]["Tgl1"]);

    setPeriodesekarang(response[0]["Periode"]);
    setPeriodeberikut(parseFloat(response[0]["Periode"]) + 1);
    //console.log(getCurrentDateInput(new Date(tanggalperiodesekarangsampai)));
    //console.log(tanggalperiodesekarangsampai);
  };

  const closingDialyAct = () => {
    createMessageConfirm(
      "Peringatan",
      "Yakin proses closing day akan dilanjutkan?!",
      "question",
      "Ya, Lanjutkan",
      "Batal"
    ).then(async (result) => {
      if (result == "confirmed") {
        if (
          tanggaldaily === getCurrentDateInput(new Date("0001-01-01T00:00:00Z"))
        ) {
          createMessage(
            "Error",
            "Tanggal aktif belum lengkap, periksa kembali...!!!",
            "error"
          );
          return;
        }

        const response = await updateAktifDay(
          0,
          new Date(tanggaldaily),
          new Date(),
          "Admin"
        );

        if (response["message"] == "success") {
          createMessage(
            "Success",
            "Proses Closing Day Berhasil.",
            "success"
          ).then(() => {});
        } else {
          createMessage("Error", "Terjadi kesalahan", "error").then(() => {});
        }
      }
    });
  };

  useEffect(() => {
    getPeriodeActive();
    getDataAktifDay();
  }, []);

  return (
    <div>
      <Modal
        animation={false}
        show={props.show}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Pindah Saldo Persediaan
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <p>
              <b>1. Closing Dialy</b>
            </p>
            <Form.Label>Aktifkan Tanggal</Form.Label>
            <InputGroup>
              <Form.Control
                aria-label="Kode Barang"
                type="date"
                value={tanggaldaily}
                onChange={(mytext) => setTanggalDaily(mytext.target.value)}
              />

              <Button variant="primary" onClick={() => closingDialyAct()}>
                Aktifkan
              </Button>
            </InputGroup>

            <p className="mt-4">
              <b>2. Closing Monthly</b>
            </p>
            <Form.Label>Periode Sekarang</Form.Label>
            <InputGroup>
              <Form.Control
                aria-label="Kode Barang"
                type="text"
                value={periodesekarang}
                onChange={(mytext) =>
                  setPeriodesekarang(parseInt(mytext.target.value))
                }
                readOnly={true}
              />
              <Form.Control
                aria-label="Kode Barang"
                type="date"
                value={tanggalperiodesekarangdari}
                onChange={(mytext) =>
                  setTanggalperiodesekarangdari(mytext.target.value)
                }
                readOnly={true}
              />
              <Form.Control
                aria-label="Kode Barang"
                type="date"
                value={tanggalperiodesekarangsampai}
                onChange={(mytext) =>
                  setTanggalperiodesekarangsampai(mytext.target.value)
                }
                readOnly={true}
              />
            </InputGroup>

            <Form.Label className="mt-2">Periode Berikut</Form.Label>
            <InputGroup>
              <Form.Control
                aria-label="Kode Barang"
                type="text"
                value={periodeberikut}
                onChange={(mytext) =>
                  setPeriodeberikut(parseInt(mytext.target.value))
                }
                readOnly={true}
              />
              <Form.Control
                aria-label="Kode Barang"
                type="date"
                value={tanggalperiodeberikutdari}
                onChange={(mytext) =>
                  setTanggalperiodeberikutdari(mytext.target.value)
                }
                readOnly={true}
              />
              <Form.Control
                aria-label="Kode Barang"
                type="date"
                value={tanggalperiodeberikutsampai}
                onChange={(mytext) =>
                  setTanggalperiodeberikutsampai(mytext.target.value)
                }
                readOnly={true}
              />
            </InputGroup>
            <div className="d-flex justify-content-end mt-2">
              <Button>Pindahkan</Button>
            </div>

            <div className="mt-2">
              <small className="text-danger">
                *) Proses ini akan menutup periode sekarang & aktifkan periode
                berikutnya
              </small>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
