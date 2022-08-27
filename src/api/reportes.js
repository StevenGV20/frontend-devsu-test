import axios from "axios";

export const getReporte = async (fechaIni, fechaFin, cliente, type) => {
  try {
    
    const data = await axios
      .get(
        `${process.env.REACT_APP_HOST_API}${process.env.REACT_APP_API_MOVIMIENTOS}/reportes?fecha_ini=${fechaIni}&fecha_fin=${fechaFin}&cliente=${cliente}&type=${type}`
      )
      .then((json) => {
        return json.data;
      });
    return data;
  } catch (error) {
    throw error;
  }
};
