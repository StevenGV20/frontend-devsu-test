import { faHand, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { getClientes } from "../api/clientes";
import { getReporte } from "../api/reportes";
import Modal from "../components/modal";
import Table from "../components/table";
import "./_.css";

export default function Reportes() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [movimientos, setMovimientos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshList, setRefreshList] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [clienteSelected, setClienteSelected] = useState({
    cliente: "",
    nombres: "",
  });
  const openModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  const header_table = [
    "Fecha",
    "Cliente",
    "Numero cuenta",
    "Tipo",
    "Saldo inicial",
    "Estado",
    "Movimiento",
    "Saldo disponible",
  ];
  const header_cliente = ["ID", "Nombres", ""];

  const initialValues = {
    fechaIni: "",
    fechaFin: "",
    nombres: "",
    cliente: "",
  };
  const validateForm = (values) => {
    const errors = {};
    if (!values.fechaIni) {
      errors.fechaIni = "Selecciona una fecha";
    }
    if (!values.fechaFin) {
      errors.fechaFin = "Selecciona una fecha";
    }
    if (!values.nombres) {
      errors.nombres = "Selecciona a un cliente";
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: initialValues,
    validate: validateForm,
    onSubmit: (values) => {
      setLoading(true);
      if (values.cliente) {
        (async () => {
          const dataReport = await getReporte(
            transformDate(values.fechaIni),
            transformDate(values.fechaFin),
            values.cliente,
            "JSON"
          );
          console.log(dataReport);
          setMovimientos(dataReport);
          setLoading(false);
        })();
      }
    },
  });

  const onGeneratePDF = () => {
    window.location.href = `${process.env.REACT_APP_HOST_API}${
      process.env.REACT_APP_API_MOVIMIENTOS
    }/reportes?fecha_ini=${transformDate(
      formik.values.fechaIni
    )}&fecha_fin=${transformDate(formik.values.fechaFin)}&cliente=${
      formik.values.cliente
    }&type=PDF`;
  };

  useEffect(() => {
    (async () => {
      /* const data = await getReporte();
      setMovimientos(data);
      console.log(data); */
      const dataClientes = await getClientes();
      setClientes(dataClientes);
    })();
  }, [refreshList]);

  useEffect(() => {
    console.log("movimientos", movimientos);
  }, [movimientos]);

  const onSearchReport = (e) => {
    (async () => {
      await formik.setValues({
        ...formik.values,
        nombres: clienteSelected.nombres,
        cliente: clienteSelected.cliente,
      });
    })();
    console.log("clicked");
    if (e) {
      e.preventDefault();
    }
    if (!clienteSelected.cliente) {
      formik.setErrors({ ...formik.errors, nombres: "Seleccione un cliente" });
    }
    formik.handleSubmit();
  };

  const transformDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
  };

  return (
    <div className="crud-container report-container">
      <h1>Reporte</h1>
      <form className="report-search-container">
        <div className="report-search-group">
          {formik.touched.fechaIni && formik.errors.fechaIni ? (
            <div className="form-error">{formik.errors.fechaIni}</div>
          ) : null}
          <input
            className={`input-search ${
              formik.touched.fechaIni && formik.errors.fechaIni
                ? "form-input-error"
                : ""
            }`}
            placeholder="Ingresa Fecha de inicio"
            type="date"
            name="fechaIni"
            value={formik.fechaIni}
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("fechaIni")}
          />
        </div>
        <div className="report-search-group">
          {formik.touched.fechaFin && formik.errors.fechaFin ? (
            <div className="form-error">{formik.errors.fechaFin}</div>
          ) : null}
          <input
            className={`input-search ${
              formik.touched.fechaFin && formik.errors.fechaFin
                ? "form-input-error"
                : ""
            }`}
            placeholder="Ingresa Fecha Final"
            type="date"
            name="fechaFin"
            value={formik.fechaFin}
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("fechaFin")}
          />
        </div>
        <div className="report-search-group">
          {formik.touched.nombres && formik.errors.nombres ? (
            <div className="form-error">{formik.errors.nombres}</div>
          ) : null}
          <input
            className={`input-search ${
              formik.touched.nombres && formik.errors.nombres
                ? "form-input-error"
                : ""
            }`}
            name="nombres"
            value={clienteSelected.nombres}
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("nombres")}
          />
          <input
            className="input-search"
            hidden
            name="cliente"
            value={clienteSelected.cliente}
            onChange={formik.handleChange}
          />
        </div>
        <div className="report-search-group">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => openModal()}
          >
            Buscar cliente
          </button>
        </div>
        <div className="btn-container-filter">
          <button
            className="btn  btn-primary"
            type="button"
            onClick={(e) => onSearchReport(e)}
          >
            Filtrar
          </button>
        </div>
      </form>
      {movimientos.length > 0 && (
        <div className="btn-container-filter">
          <button
            className="btn  btn-primary"
            type="button"
            onClick={(e) => onGeneratePDF(e)}
          >
            Descargar PDF
          </button>
        </div>
      )}
      <Modal isOpen={isOpenModal} openModal={openModal}>
        <div>
          <h1>Buscar cliente</h1>
          <input className="input-search" placeholder="Buscar..." />
          <Table headers={header_cliente}>
            {clientes.length < 1 ? (
              <tr>
                <td colSpan={header_table.length - 1}>
                  <FontAwesomeIcon icon={faSpinner} className="icon-loader" />
                </td>
              </tr>
            ) : (
              clientes.map((c) => (
                <tr key={c.idpersona}>
                  <td>{c.identificacion}</td>
                  <td>{c.nombres}</td>
                  <td>
                    <button
                      onClick={() => {
                        setClienteSelected({
                          nombres: c.nombres,
                          cliente: c.idpersona,
                        });
                        //formik.handleChange("cliente", c.idpersona);
                        console.log(formik.values);
                        openModal();
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faHand}
                        className="table-icon-edit"
                      />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </Table>
        </div>
      </Modal>
      <Table headers={header_table}>
        {movimientos.length < 1 ? (
          <tr>
            <td colSpan={header_table.length}>
              No existen registros o aun no ha realizado la consulta.
            </td>
          </tr>
        ) : (
          movimientos.map((m, index) => (
            <tr key={index}>
              <td>{m.fechaRegistro}</td>
              <td>{m.cliente}</td>
              <td>{m.numeroCuenta}</td>
              <td>{m.tipo}</td>
              <td>{m.saldoInicial}</td>
              <td>{m.estado ? "True" : "False"}</td>
              <td>{m.movimiento}</td>
              <td>{m.saldoDisponible}</td>
            </tr>
          ))
        )}
      </Table>
    </div>
  );
}
