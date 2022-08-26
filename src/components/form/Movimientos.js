import React from "react";
import { useFormik } from "formik";
import "./_.css";
import { validateFormMovimientos } from "../../utils/validateForms";
import { tipo_movimiento, valor_movimiento } from "../../utils/constantes";

export default function MovimientosForm({ title, openModal }) {
  const formik = useFormik({
    initialValues: {
      numeroCuenta: "",
      tipoMovimiento: "",
      saldo: "",
      valor: "",
      estado: "Activo",
    },
    validate: validateFormMovimientos,
    onSubmit: (values) => {
      const jsonToSend = {
        ...values,
        cuenta: { numeroCuenta: values.numeroCuenta },
      };
      alert(JSON.stringify(jsonToSend));
      formik.handleReset();
      openModal();
    },
  });

  const handleSave = (e) => {
    if (e) {
      e.preventDefault();
    }
    formik.handleSubmit();
  };

  const onCancel = (e) => {
    if (e) {
      e.preventDefault();
    }
    formik.setErrors({});
    openModal();
  };

  return (
    <div className="form-container">
      <h1>{title}</h1>
      <form className="">
        <div className="form-group">
          <label>Nro. Cuenta</label>
          {formik.touched.numeroCuenta && formik.errors.numeroCuenta ? (
            <div className="form-error">{formik.errors.numeroCuenta}</div>
          ) : null}
          <input
            name="numeroCuenta"
            className={`form-input ${
              formik.touched.numeroCuenta && formik.errors.numeroCuenta
                ? "form-input-error"
                : ""
            }`}
            value={formik.values.numeroCuenta}
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("numeroCuenta")}
          />
        </div>
        <div className="form-group">
          <label>Tipo del movimiento</label>
          {formik.touched.tipoMovimiento && formik.errors.tipoMovimiento ? (
            <div className="form-error">{formik.errors.tipoMovimiento}</div>
          ) : null}
          <select
            name="tipoMovimiento"
            className={`form-input ${
              formik.touched.tipoMovimiento && formik.errors.tipoMovimiento
                ? "form-input-error"
                : ""
            }`}
            value={formik.values.tipoMovimiento}
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("tipoMovimiento")}
          >
            <option value={null}>[ Seleccione ]</option>
            {tipo_movimiento.map((tipo) => (
              <option key={tipo}>{tipo}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Saldo</label>
          {formik.touched.saldo && formik.errors.saldo ? (
            <div className="form-error">{formik.errors.saldo}</div>
          ) : null}
          <input
            name="saldo"
            value={formik.values.saldo}
            className={`form-input ${
              formik.touched.saldo && formik.errors.saldo
                ? "form-input-error"
                : ""
            }`}
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("saldo")}
          />
        </div>
        <div className="form-group">
          <label>Valor</label>
          {formik.touched.valor && formik.errors.valor ? (
            <div className="form-error">{formik.errors.valor}</div>
          ) : null}
          <select
            name="valor"
            value={formik.values.valor}
            className={`form-input ${
              formik.errors.valor ? "form-input-error" : ""
            }`}
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("valor")}
          >
            <option value={null}>[ Seleccione ]</option>
            {valor_movimiento.map((valor) => (
              <option key={valor}>{valor}</option>
            ))}
          </select>
        </div>
        <button className="btn btn-secondary form-button" onClick={onCancel}>
          Cancelar
        </button>
        <button
          className="btn btn-primary form-button"
          type="button"
          onClick={handleSave}
        >
          Guardar
        </button>
      </form>
    </div>
  );
}
