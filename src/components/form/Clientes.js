import React, { useEffect } from "react";
import { useFormik } from "formik";
import "./_.css";
import { validateFormClientes } from "../../utils/validateForms";
import { estados, generos } from "../../utils/constantes";
import { postCliente } from "../../api/clientes";

export default function ClientesForm({
  title,
  openModal,
  clienteSelected,
  setClienteSelected,
  setRefreshList,
}) {
  const initialValues = {
    idpersona: clienteSelected?.idpersona || "",
    idcliente: clienteSelected?.idcliente || "",
    nombres: clienteSelected?.nombres || "",
    genero: clienteSelected?.genero || "",
    edad: clienteSelected?.edad || "",
    identificacion: clienteSelected?.identificacion || "",
    direccion: clienteSelected?.direccion || "",
    telefono: clienteSelected?.telefono || "",
    clave: clienteSelected?.clave || "",
    estado: clienteSelected?.estado || "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validate: validateFormClientes,
    onSubmit: (values) => {
      try {
        const response = postCliente(values);
        if (response != null) {
          formik.setValues({});
          formik.setValues({});
          setClienteSelected({});
          openModal();
          setRefreshList((prev) => !prev);
        }
      } catch (error) {
        console.log("error", error);
      }
    },
  });

  useEffect(() => {
    (async () => {
      if (Object.entries(clienteSelected).length > 0) {
        await formik.setValues(clienteSelected);
      }
    })();
  }, [clienteSelected]);

  const handleSave = (e) => {
    if (e) {
      e.preventDefault();
    }
    console.log("clicked", formik.values);
    formik.handleSubmit();
  };

  const onCancel = (e) => {
    if (e) {
      e.preventDefault();
    }
    formik.setValues({});
    formik.setErrors({});
    formik.handleReset();
    setClienteSelected({});
    openModal();
  };

  return (
    <div className="form-container">
      <h1>{title}</h1>
      <form className="">
        <div className="form-group">
          <label>Nombre</label>
          {formik.touched.nombres && formik.errors.nombres ? (
            <div className="form-error">{formik.errors.nombres}</div>
          ) : null}
          <input
            name="nombres"
            className={`form-input ${
              formik.touched.nombres && formik.errors.nombres
                ? "form-input-error"
                : ""
            }`}
            value={formik.values.nombres}
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("nombres")}
          />
        </div>
        <div className="form-group">
          <label>Genero</label>
          {formik.touched.genero && formik.errors.genero ? (
            <div className="form-error">{formik.errors.genero}</div>
          ) : null}
          <select
            name="genero"
            className={`form-input ${
              formik.touched.genero && formik.errors.genero
                ? "form-input-error"
                : ""
            }`}
            value={formik.values.genero}
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("genero")}
          >
            <option value="">[ Seleccione ]</option>
            {generos.map((sexo) => (
              <option key={sexo}>{sexo}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Edad</label>
          {formik.touched.edad && formik.errors.edad ? (
            <div className="form-error">{formik.errors.edad}</div>
          ) : null}
          <input
            name="edad"
            value={formik.values.edad}
            className={`form-input ${
              formik.touched.edad && formik.errors.edad
                ? "form-input-error"
                : ""
            }`}
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("edad")}
          />
        </div>
        <div className="form-group">
          <label>Identificacion</label>
          {formik.touched.identificacion && formik.errors.identificacion ? (
            <div className="form-error">{formik.errors.identificacion}</div>
          ) : null}
          <input
            name="identificacion"
            className={`form-input ${
              formik.touched.identificacion && formik.errors.identificacion
                ? "form-input-error"
                : ""
            }`}
            value={formik.values.identificacion}
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("identificacion")}
          />
        </div>
        <div className="form-group">
          <label>Direccion</label>
          {formik.touched.direccion && formik.errors.direccion ? (
            <div className="form-error">{formik.errors.direccion}</div>
          ) : null}
          <input
            name="direccion"
            className={`form-input ${
              formik.touched.direccion && formik.errors.direccion
                ? "form-input-error"
                : ""
            }`}
            value={formik.values.direccion}
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("direccion")}
          />
        </div>
        <div className="form-group">
          <label>Telefono</label>
          {formik.touched.telefono && formik.errors.telefono ? (
            <div className="form-error">{formik.errors.telefono}</div>
          ) : null}
          <input
            name="telefono"
            className={`form-input ${
              formik.touched.telefono && formik.errors.telefono
                ? "form-input-error"
                : ""
            }`}
            value={formik.values.telefono}
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("telefono")}
          />
        </div>
        <div className="form-group">
          <label>Clave</label>
          {formik.touched.clave && formik.errors.clave ? (
            <div className="form-error">{formik.errors.clave}</div>
          ) : null}
          <input
            name="clave"
            className={`form-input ${
              formik.touched.clave && formik.errors.clave
                ? "form-input-error"
                : ""
            }`}
            value={formik.values.clave}
            onChange={formik.handleChange}
            onBlur={() => formik.setFieldTouched("clave")}
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
              formik.touched.estado && formik.errors.estado
                ? "form-input-error"
                : ""
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
        <input
          hidden
          name="idcliente"
          value={formik.values.idcliente}
          onChange={formik.handleChange}
        />
        <input
          hidden
          name="idpersona"
          value={formik.values.idpersona}
          onChange={formik.handleChange}
        />
        <button className="btn btn-secondary form-button" onClick={onCancel}>
          Cancelar
        </button>
        <button
          className="btn btn-primary form-button"
          type="button"
          onClick={(e) => handleSave(e)}
        >
          Guardar
        </button>
      </form>
    </div>
  );
}
