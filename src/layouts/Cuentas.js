import React, { useEffect, useState } from "react";
import {
  faSpinner,
  faHand,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getClientes } from "../api/clientes";
import CuentasForm from "../components/form/Cuentas";
import Modal from "../components/modal";
import Table from "../components/table";
import { getCuentas } from "../api/cuentas";

export default function Cuentas() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [clienteSelected, setClienteSelected] = useState({});
  const [cuentaSelected, setCuentaSelected] = useState({});
  const [clientes, setClientes] = useState([]);
  const [refreshList, setRefreshList] = useState(false);
  const [cuentas, setCuentas] = useState([]);
  const openModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  const header_table = [
    "Nro. Cuenta",
    "Tipo",
    "Saldo inicial",
    "Cliente",
    "Estado",
    "Saldo actual",
  ];
  const header_cliente = ["ID", "Nombres", ""];

  useEffect(() => {
    (async () => {
      const dataClientes = await getClientes();
      const dataCuentas = await getCuentas();
      setClientes(dataClientes);
      setCuentas(dataCuentas);
      console.log(dataCuentas);
    })();
  }, [refreshList]);
  return (
    <div className="crud-container">
      <h1>Cuentas</h1>
      <input className="input-search" placeholder="Buscar..." />
      <button className="btn  btn-primary btn-new" onClick={() => openModal()}>
        Nuevo
      </button>
      <Modal isOpen={isOpenModal} openModal={openModal}>
        {Object.entries(clienteSelected).length < 1 ? (
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
                          setClienteSelected(c);
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
          <CuentasForm
            title="Cuenta"
            openModal={openModal}
            clienteSelected={clienteSelected}
            setClienteSelected={setClienteSelected}
            cuentaSelected={cuentaSelected}
            setCuentaSelected={setCuentaSelected}
            setRefreshList={setRefreshList}
          />
        )}
      </Modal>
      <Table headers={header_table}>
        {cuentas.length < 1 ? (
          <tr>
            <td colSpan={header_table.length - 1}>
              <FontAwesomeIcon icon={faSpinner} className="icon-loader" />
            </td>
          </tr>
        ) : (
          cuentas.map((c) => (
            <tr key={c.idcuenta}>
              <td>{c.numeroCuenta}</td>
              <td>{c.tipoCuenta}</td>
              <td>{c.saldoInicial}</td>
              <td>{c.cliente.nombres}</td>
              <td>{c.estado ? "Activo" : "Inactivo"}</td>
              <td>{c.saldoDisponible}</td>
              <td>
                <button
                  onClick={() => {
                    setClienteSelected(c.cliente);
                    setCuentaSelected(c);
                    openModal();
                  }}
                >
                  <FontAwesomeIcon icon={faEdit} className="table-icon-edit" />
                </button>
              </td>
              <td>
                <button onClick={() => setClienteSelected(c)}>
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
