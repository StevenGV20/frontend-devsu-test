import Clientes from "../layouts/Clientes";
import Cuentas from "../layouts/Cuentas";
import Movimientos from "../layouts/Movimientos";
import Reportes from "../layouts/Reportes";

export const routes_menu = [
  /* {
    name: "Home",
    url: "/",
    component: <Home />,
  }, */
  {
    name: "Clientes",
    url: "/clientes",
    component: <Clientes />,
  },
  {
    name: "Cuentas",
    url: "/cuentas",
    component: <Cuentas />,
  },
  {
    name: "Movimientos",
    url: "/movimientos",
    component: <Movimientos />,
  },
  {
    name: "Reportes",
    url: "/reportes",
    component: <Reportes />,
  },
];
