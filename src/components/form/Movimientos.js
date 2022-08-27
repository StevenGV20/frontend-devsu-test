import React, { useEffect } from "react";
import { useFormik } from "formik";
import "./_.css";
import { validateFormMovimientos } from "../../utils/validateForms";
import { tipo_movimiento, valor_movimiento } from "../../utils/constantes";
import { postMovimiento } from "../../api/movimientos";

export default function MovimientosForm({
  title,
  openModal,
  movimientoSelected,
  setMovimientoSelected,
  cuentaSelected,
  setCuentaSelected,
  setRefreshList,
}) {
  const initialValues = {
    idmovimiento: movimientoSelected?.idmovimiento || "",
    tipoMovimiento: movimientoSelected?.tipoMovimiento || "",
    saldo: movimientoSelected?.saldo || "",
    valor: movimientoSelected?.valor || "",
    fechaRegistro: movimientoSelected?.fechaRegistro || "",
    idcuenta: cuentaSelected?.idcuenta || "",
    numeroCuenta: cuentaSelected?.numeroCuenta || "",
    cliente: cuentaSelected?.cliente.nombres || "",
    saldoDisponible: cuentaSelected?.saldoDisponible || "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validate: validateFormMovimientos,
    onSubmit: (values) => {
      postMovimiento(values)
        .then(() => {
          formik.setValues({});
          formik.handleReset();
          setMovimientoSelected({});
          setCuentaSelected({});
          openModal();
          setRefreshList((prev) => !prev);
        })
        .catch((err) => {
          if (err.data.detail.includes("numero_cuenta_UNIQUE")) {
            formik.setErrors({
              ...formik.errors,
              numeroCuenta: "Ya existe cuenta registrada con en este numero",
            });
          }
          if (err.data.title.includes("saldo")) {
            formik.setErrors({
              ...formik.errors,
              saldo: err.data.detail,
            });
          } else if (err.data.title.includes("tipoMovimiento")) {
            formik.setErrors({
              ...formik.errors,
              tipoMovimiento: err.data.detail,
            });
          } else if (err.data.detail) {
            formik.setErrors({
              ...formik.errors,
              numeroCuenta: err.data.detail,
            });
          }
        });
    },
  });

  const handleSave = (e) => {
    if (e) {
      e.preventDefault();
    }
    formik.setValues({
      ...formik.values,
      cuenta: { idcuenta: formik.values.idcuenta },
    });
    formik.handleSubmit();
  };

  const onCancel = (e) => {
    if (e) {
      e.preventDefault();
    }
    formik.setErrors({});
    openModal();
    setMovimientoSelected({});
    setCuentaSelected({});
  };

  useEffect(() => {
    (async () => {
      if (Object.entries(cuentaSelected).length > 0) {
        await formik.setValues(initialValues);
      }
    })();
  }, [cuentaSelected]);

  return (
    <div className="form-container">
      <h1>{title}</h1>
      <form className="">
        <div className="form-group">
          <label>Nro. Cuenta</label>
          <input
            name="numeroCuenta"
            className={`form-input`}
            disabled
            value={formik.values.numeroCuenta}
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("numeroCuenta")}
          />
        </div>
        <div className="form-group">
          <label>Cliente</label>
          <input
            name="cliente"
            className={`form-input`}
            disabled
            value={formik.values.cliente}
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("cliente")}
          />
        </div>
        <div className="form-group">
          <label>Saldo Disponible</label>
          <input
            name="saldoDisponible"
            className={`form-input`}
            disabled
            value={formik.values.saldoDisponible}
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("saldoDisponible")}
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
