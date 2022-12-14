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
        console.log(res.data);
        return res.data;
      })
      .catch((error) => {
        throw error.response;
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
      .then(async (res) => {
        console.log(res.data);
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

export const deleteCliente = async (id) => {
  try {
    await axios
      .delete(
        `${process.env.REACT_APP_HOST_API}${process.env.REACT_APP_API_CLIENTES}/delete?id=${id}`
      )
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((error) => {
        throw error.response;
      });
  } catch (error) {
    throw error;
  }
};
