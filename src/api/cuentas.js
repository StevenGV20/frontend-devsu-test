import axios from "axios";

export const getCuentas = async () => {
  try {
    const data = await axios
      .get(
        `${process.env.REACT_APP_HOST_API}${process.env.REACT_APP_API_CUENTAS}/`
      )
      .then((json) => {
        return json.data;
      });
    return data;
  } catch (error) {
    throw error;
  }
};

export const postCuenta = async (cuenta) => {
  try {
    await axios
      .post(
        `${process.env.REACT_APP_HOST_API}${process.env.REACT_APP_API_CUENTAS}/`,
        cuenta
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

export const updateCuenta = async (id, cuenta) => {
  try {
    await axios
      .post(
        `${process.env.REACT_APP_HOST_API}${process.env.REACT_APP_API_CUENTAS}/update?id=${id}`,
        cuenta
      )
      .then(async (res) => {
        console.log(res);
        return await res.data;
      })
      .catch(async (error) => {
        console.log(error);
        return await error.response;
      });
  } catch (error) {
    throw error;
  }
};

export const deleteCuenta = async (id) => {
  try {
    await axios
      .delete(
        `${process.env.REACT_APP_HOST_API}${process.env.REACT_APP_API_CUENTAS}/delete?id=${id}`
      )
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch((error) => {
        throw error.response;
      });
  } catch (error) {
    throw error;
  }
};
