import React, { useEffect, useState } from "react";
import { getClientes } from "../api/clientes";
import ClientesForm from "../components/form/Clientes";
import Modal from "../components/modal";
import Table from "../components/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faDeleteLeft,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./_.css";

export default function Clientes() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [clienteSelected, setClienteSelected] = useState({});
  const [refreshList, setRefreshList] = useState(false);
  const openModal = () => setIsOpenModal(!isOpenModal);

  const header_table = [
    "ID",
    "Nombres",
    "Telefono",
    "Contraseña",
    "Estado",
    "",
    "",
  ];

  useEffect(() => {
    (async () => {
      const data = await getClientes();
      setClientes(data);
    })();
  }, [refreshList]);

  return (
    <div className="crud-container">
      <h1>Clientes</h1>
      <input className="input-search" placeholder="Buscar..." />
      <button className="btn  btn-primary btn-new" onClick={() => openModal()}>
        Nuevo
      </button>
      <Modal isOpen={isOpenModal} openModal={openModal}>
        <ClientesForm
          title="Nuevo cliente"
          openModal={openModal}
          clienteSelected={clienteSelected}
          setClienteSelected={setClienteSelected}
          setRefreshList={setRefreshList}
        />
      </Modal>
      <Table headers={header_table}>
        {clientes.length < 0 ? (
          <></>
        ) : (
          clientes.map((c) => (
            <tr key={c.idcliente}>
              <td>{c.identificacion}</td>
              <td>{c.nombres}</td>
              <td>{c.telefono}</td>
              <td>{c.clave}</td>
              <td>{c.estado ? "Activo" : "Inactivo"}</td>
              <td>
                <button
                  onClick={() => {
                    setClienteSelected(c);
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
