import React from "react";
import { useFormik } from "formik";
import "./_.css";
import { validateFormCuentas } from "../../utils/validateForms";
import { estados, tipo_cuenta } from "../../utils/constantes";

export default function CuentasForm({ title, openModal, cliente, setCliente }) {
  const formik = useFormik({
    initialValues: {
      clienteid: cliente,
      numeroCuenta: "",
      tipoCuenta: "",
      saldoInicial: "",
      estado: "",
    },
    validate: validateFormCuentas,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
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
    setCliente("");
  };

  return (
    <div className="form-container">
      <h1>{title}</h1>
      <form className="">
        <div className="form-group">
          <label>Cliente</label>
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
          <label>Tipo Cuenta</label>
          {formik.touched.tipoCuenta && formik.errors.tipoCuenta ? (
            <div className="form-error">{formik.errors.tipoCuenta}</div>
          ) : null}
          <select
            name="tipoCuenta"
            className={`form-input ${
              formik.touched.tipoCuenta && formik.errors.tipoCuenta
                ? "form-input-error"
                : ""
            }`}
            value={formik.values.tipoCuenta}
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("tipoCuenta")}
          >
            <option value={null}>[ Seleccione ]</option>
            {tipo_cuenta.map((sexo) => (
              <option key={sexo}>{sexo}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Saldo inicial</label>
          {formik.touched.saldoInicial && formik.errors.saldoInicial ? (
            <div className="form-error">{formik.errors.saldoInicial}</div>
          ) : null}
          <input
            name="saldoInicial"
            value={formik.values.saldoInicial}
            className={`form-input ${
              formik.touched.saldoInicial && formik.errors.saldoInicial
                ? "form-input-error"
                : ""
            }`}
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("saldoInicial")}
          />
        </div>
        <div className="form-group">
          <label>Estado</label>
          {formik.touched.estado && formik.errors.estado ? (
            <div className="form-error">{formik.errors.estado}</div>
          ) : null}
          <select
            name="estado"
            value={formik.values.estado}
            className={`form-input ${
              formik.errors.estado ? "form-input-error" : ""
            }`}
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("estado")}
          >
            <option value={null}>[ Seleccione ]</option>
            {estados.map((state) => (
              <option key={state.name} value={state.value}>
                {state.name}
              </option>
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
