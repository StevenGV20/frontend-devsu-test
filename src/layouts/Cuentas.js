import React, { useState } from "react";
import CuentasForm from "../components/form/Cuentas";
import Modal from "../components/modal";
import Table from "../components/table";

export default function Cuentas() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [cliente, setCliente] = useState("");
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

  return (
    <div className="crud-container">
      <h1>Cuentas</h1>
      <input className="input-search" placeholder="Buscar..." />
      <button className="btn  btn-primary btn-new" onClick={() => openModal()}>
        Nuevo
      </button>
      <Modal isOpen={isOpenModal} openModal={openModal}>
        {!cliente ? (
          <div>
            <h1>Buscar cliente</h1>
            <input className="input-search" placeholder="Buscar..." />
            <Table headers={header_cliente}>
              <tr>
                <td hidden></td>
                <td>Jose</td>
                <td>Av. 10</td>
                <td>
                  <button onClick={() => setCliente("cliente")}>view</button>
                </td>
              </tr>
            </Table>
          </div>
        ) : (
          <CuentasForm
            title="Nueva cuenta"
            openModal={openModal}
            cliente={cliente}
            setCliente={setCliente}
          />
        )}
      </Modal>
      <Table headers={header_table}>
        <tr>
          <td>Jose</td>
          <td>Av. 10</td>
        </tr>
      </Table>
    </div>
  );
}
