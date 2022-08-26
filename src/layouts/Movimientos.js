import React, { useState } from "react";
import MovimientosForm from "../components/form/Movimientos";
import Modal from "../components/modal";
import Table from "../components/table";

export default function Movimientos() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const openModal = () => {
    console.log("click", isOpenModal);
    setIsOpenModal(!isOpenModal);
  };
  const header_table = [
    "Fecha",
    "Nro Cuenta",
    "Tipo",
    "Saldo Inicial",
    "Movimiento",
    "Saldo Disponible",
  ];
  return (
    <div className="crud-container">
      <h1>Movimientos</h1>
      <input className="input-search" placeholder="Buscar..." />
      <button className="btn  btn-primary btn-new" onClick={() => openModal()}>
        Nuevo
      </button>
      <Modal isOpen={isOpenModal} openModal={openModal}>
        <MovimientosForm title="Nuevo Movimiento" openModal={openModal} />
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
