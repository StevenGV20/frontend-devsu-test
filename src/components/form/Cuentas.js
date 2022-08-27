import React, { useEffect } from "react";
import { useFormik } from "formik";
import "./_.css";
import { validateFormCuentas } from "../../utils/validateForms";
import { estados, tipo_cuenta } from "../../utils/constantes";
import { postCuenta, updateCuenta } from "../../api/cuentas";

export default function CuentasForm({
  title,
  openModal,
  clienteSelected,
  cuentaSelected,
  setCuentaSelected,
  setClienteSelected,
  setRefreshList,
}) {
  const initialValues = {
    idpersona: clienteSelected?.idpersona || "",
    nombres: clienteSelected?.nombres || "",
    identificacion: clienteSelected?.identificacion || "",
    numeroCuenta: cuentaSelected?.numeroCuenta || "",
    tipoCuenta: cuentaSelected?.tipoCuenta || "",
    saldoInicial: cuentaSelected?.saldoInicial || "",
    saldoDisponible: cuentaSelected?.saldoDisponible || "",
    estado: cuentaSelected?.estado || "",
    idcuenta: cuentaSelected?.idcuenta || "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validate: validateFormCuentas,
    onSubmit: (values) => {
      console.log("into handle");
      console.log("newObj", values);
      postCuenta(values)
        .then(() => {
          formik.setValues({});
          formik.handleReset();
          setClienteSelected({});
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
    console.log("clciked");
    formik.setValues({
      ...formik.values,
      cliente: { idpersona: formik.values.idpersona },
    });
    formik.handleSubmit();
  };

  const onCancel = (e) => {
    if (e) {
      e.preventDefault();
    }
    formik.setErrors({});
    openModal();
    setClienteSelected({});
    setCuentaSelected({});
  };

  useEffect(() => {
    (async () => {
      if (Object.entries(clienteSelected).length > 0) {
        await formik.setValues(initialValues);
      }
    })();
  }, [clienteSelected]);

  return (
    <div className="form-container">
      <h1>{title}</h1>
      <form className="">
        <input
          hidden
          name="idpersona"
          value={formik.values.idpersona}
          onChange={formik.handleChange}
        />
        <div className="form-group">
          <label>ID del Cliente</label>
          <input
            name="identificacion"
            disabled
            className="form-input"
            value={formik.values.identificacion}
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("identificacion")}
          />
        </div>
        <div className="form-group">
          <label>Cliente</label>
          <input
            name="nombres"
            disabled
            className="form-input"
            value={formik.values.nombres}
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("nombres")}
          />
        </div>
        <div className="form-group">
          <label>Numero Cuenta</label>
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
          <label>Saldo Inicial</label>
          {formik.touched.saldoInicial && formik.errors.saldoInicial ? (
            <div className="form-error">{formik.errors.saldoInicial}</div>
          ) : null}
          <input
            name="saldoInicial"
            value={formik.values.saldoInicial}
            disabled={formik.values.idcuenta && "disabled"}
            className={`form-input ${
              formik.touched.saldoInicial && formik.errors.saldoInicial
                ? "form-input-error"
                : ""
            }`}
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("saldoInicial")}
          />
        </div>
        {formik.values.idcuenta && (
          <div className="form-group">
            <label>Saldo Disponible</label>
            {formik.touched.saldoDisponible && formik.errors.saldoDisponible ? (
              <div className="form-error">{formik.errors.saldoDisponible}</div>
            ) : null}
            <input
              name="saldoDisponible"
              value={formik.values.saldoDisponible}
              className={`form-input ${
                formik.touched.saldoDisponible && formik.errors.saldoDisponible
                  ? "form-input-error"
                  : ""
              }`}
              onChange={formik.handleChange}
              onBlur={() => formik.setFieldTouched("saldoDisponible")}
            />
          </div>
        )}

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
            <option value="">[ Seleccione ]</option>
            {estados.map((state) => (
              <option key={state.name} value={state.value}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-container-buttons">
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
        </div>
      </form>
    </div>
  );
}
