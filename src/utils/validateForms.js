export const validateFormClientes = (values) => {
  const errors = {};
  if (!values.nombres) {
    errors.nombres = "Ingresa tu nombre!";
  }
  if (!values.genero) {
    errors.genero = "Selecciona una opcion";
  }
  if (!values.edad) {
    errors.edad = "Ingresa tu edad!";
  }
  if (!values.identificacion) {
    errors.identificacion = "Ingresa tu identificacion!";
  }
  if (!values.direccion) {
    errors.direccion = "Ingresa tu direccion!";
  }
  if (!values.telefono) {
    errors.telefono = "Ingresa tu telefono!";
  }
  if (!values.clave) {
    errors.clave = "Ingresa tu clave!";
  }
  if (!values.estado) {
    errors.estado = "Selecciona una opcion";
  }
  return errors;
};

export const validateFormCuentas = (values) => {
  const errors = {};
  if (!values.numeroCuenta) {
    errors.numeroCuenta = "Ingresa el numero de cuenta!";
  }
  if (!values.tipoCuenta) {
    errors.tipoCuenta = "Selecciona una opcion";
  }
  if (!values.idcuenta && (!values.saldoInicial || values.saldoInicial < 0)) {
    errors.saldoInicial = "Ingresa el saldo inicial. Debe ser minimo 0.";
  }
  if (
    values.idcuenta &&
    (!values.saldoDisponible || values.saldoDisponible < 0)
  ) {
    errors.saldoDisponible = "Ingresa el saldo. Debe ser minimo 0.";
  }
  if (!values.estado) {
    errors.estado = "Selecciona una opcion";
  }
  return errors;
};

export const validateFormMovimientos = (values) => {
  const errors = {};
  if (!values.tipoMovimiento) {
    errors.tipoMovimiento = "Selecciona una opcion";
  }
  if (!values.saldo) {
    errors.saldo = "Ingresa el saldo";
  }
  if (!values.valor) {
    errors.valor = "Selecciona una opcion";
  }
  return errors;
};
