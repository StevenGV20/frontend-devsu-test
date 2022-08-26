import React from "react";
import "./_.css";

export default function Table({ headers, children }) {
  return (
    <table className="table-container">
      {headers ? (
        <thead className="table-head">
          <tr>
            {headers.map((name, index) => (
              <th key={index}>{name}</th>
            ))}
          </tr>
        </thead>
      ) : (
        <></>
      )}
      <tbody className="table-body">{children}</tbody>
    </table>
  );
}
