import axios from "axios";

export const getMovimientos = async () => {
  try {
    const data = await axios
      .get(
        `${process.env.REACT_APP_HOST_API}${process.env.REACT_APP_API_MOVIMIENTOS}/`
      )
      .then((json) => {
        return json.data;
      });
    return data;
  } catch (error) {
    throw error;
  }
};

export const postMovimiento = async (movimiento) => {
  try {
    await axios
      .post(
        `${process.env.REACT_APP_HOST_API}${process.env.REACT_APP_API_MOVIMIENTOS}/`,
        movimiento
      )
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        throw error.response;
      });
  } catch (error) {
    throw error;
  }
};

export const updateMovimiento = async (id, movimiento) => {
  try {
    await axios
      .post(
        `${process.env.REACT_APP_HOST_API}${process.env.REACT_APP_API_MOVIMIENTOS}/update?id=${id}`,
        movimiento
      )
      .then(async (res) => {
        return await res.data;
      })
      .catch(async (error) => {
        return await error.response;
      });
  } catch (error) {
    throw error;
  }
};

export const deleteMovimiento = async (id) => {
  try {
    await axios
      .delete(
        `${process.env.REACT_APP_HOST_API}${process.env.REACT_APP_API_MOVIMIENTOS}/delete?id=${id}`
      )
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        throw error.response;
      });
  } catch (error) {
    throw error;
  }
};
