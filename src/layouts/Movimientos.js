import React, { useEffect, useState } from "react";
import {
  faSpinner,
  faHand,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../components/modal";
import Table from "../components/table";
import { getCuentas } from "../api/cuentas";
import { getMovimientos } from "../api/movimientos";
import MovimientosForm from "../components/form/Movimientos";

export default function Movimientos() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [cuentaSelected, setCuentaSelected] = useState({});
  const [movimientos, setMovimientos] = useState([]);
  const [movimientoSelected, setMovimientoSelected] = useState({});
  const [refreshList, setRefreshList] = useState(false);
  const [cuentas, setCuentas] = useState([]);
  const openModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  const header_table = [
    "Fecha",
    "Tipo",
    "Saldo inicial",
    "Estado",
    "Movimiento",
    "Nro. Cuenta",
    "Cliente",
  ];
  const header_cliente = ["ID", "Nombres", ""];

  useEffect(() => {
    (async () => {
      const data = await getMovimientos();
      const dataCuentas = await getCuentas();
      setMovimientos(data);
      setCuentas(dataCuentas);
    })();
  }, [refreshList]);
  return (
    <div className="crud-container">
      <h1>Movimientos</h1>
      <input className="input-search" placeholder="Buscar..." />
      <button className="btn  btn-primary btn-new" onClick={() => openModal()}>
        Nuevo
      </button>
      <Modal isOpen={isOpenModal} openModal={openModal}>
        {Object.entries(cuentaSelected).length < 1 ? (
          <div>
            <h1>Buscar cliente</h1>
            <input className="input-search" placeholder="Buscar..." />
            <Table headers={header_cliente}>
              {cuentas.length < 1 ? (
                <tr>
                  <td colSpan={header_table.length - 1}>
                    <FontAwesomeIcon icon={faSpinner} className="icon-loader" />
                  </td>
                </tr>
              ) : (
                cuentas.map((c) => (
                  <tr key={c.cliente.idpersona}>
                    <td>{c.numeroCuenta}</td>
                    <td>{c.cliente.nombres}</td>
                    <td>
                      <button
                        onClick={() => {
                          setCuentaSelected(c);
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
        ) : (
          <MovimientosForm
            title="Movimientos"
            openModal={openModal}
            movimientoSelected={movimientoSelected}
            setMovimientoSelected={setMovimientoSelected}
            cuentaSelected={cuentaSelected}
            setCuentaSelected={setCuentaSelected}
            setRefreshList={setRefreshList}
          />
        )}
      </Modal>
      <Table headers={header_table}>
        {movimientos.length < 1 ? (
          <tr>
            <td colSpan={header_table.length - 1}>
              <FontAwesomeIcon icon={faSpinner} className="icon-loader" />
            </td>
          </tr>
        ) : (
          movimientos.map((m) => (
            <tr key={m.idmovimiento}>
              <td>{m.fechaRegistro}</td>
              <td>{m.cuenta.tipoCuenta}</td>
              <td>{m.cuenta.saldoInicial}</td>
              <td>{m.estado ? "True" : "False"}</td>
              <td>
                {m.saldo > 0
                  ? `Deposito de ${m.saldo}`
                  : `Retiro de ${Math.abs(m.saldo)}`}
              </td>
              <td>{m.cuenta.numeroCuenta}</td>
              <td>{m.cuenta.cliente.nombres}</td>
              <td>
                <button
                  onClick={() => {
                    setMovimientoSelected(m);
                    setCuentaSelected(m.cuenta);
                    openModal();
                  }}
                >
                  <FontAwesomeIcon icon={faEdit} className="table-icon-edit" />
                </button>
              </td>
              <td>
                <button onClick={() => setCuentaSelected(m)}>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="table-icon-delete"
                  />
                </button>
              </td>
            </tr>
          ))
        )}
      </Table>
    </div>
  );
}
