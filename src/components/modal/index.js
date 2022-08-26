import React from "react";
import "./_.css";

export default function Modal({ children, isOpen, openModal }) {
  return (
    <>
      <div className={`${isOpen ? "modal-open" : "modal"}`} id="modal">
        <div className="modal-backdrop"></div>
        <div className="modal-body">
          <button
            className="modal-close"
            id="close"
            onClick={() => openModal()}
          >
            Close
          </button>
          {children}
        </div>
      </div>
    </>
  );
}
