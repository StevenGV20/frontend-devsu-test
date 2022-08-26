import axios from "axios";

export const getClientes = async () => {
  try {
    const data = await axios
      .get(
        `${process.env.REACT_APP_HOST_API}${process.env.REACT_APP_API_CLIENTES}/`
      )
      .then((json) => {
        return json.data;
      });
    return data;
  } catch (error) {
    throw error;
  }
};

export const postCliente = async (cliente) => {
  try {
    await axios
      .post(
        `${process.env.REACT_APP_HOST_API}${process.env.REACT_APP_API_CLIENTES}/`,
        cliente
      )
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
        return error.response;
      });
  } catch (error) {
    throw error;
  }
};

export const updateCliente = async (id, cliente) => {
  try {
    await axios
      .post(
        `${process.env.REACT_APP_HOST_API}${process.env.REACT_APP_API_CLIENTES}/update?id=${id}`,
        cliente
      )
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
        return error.response;
      });
  } catch (error) {
    throw error;
  }
};
