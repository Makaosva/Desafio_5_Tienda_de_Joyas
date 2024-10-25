import { pool } from "../database/connections.js";
import format from "pg-format";

const findAll = async ({ limit = 5 }) => {
  const consulta = "SELECT * FROM inventario LIMIT $1;";
  const query = [limit];
  const { rows: joyas } = await pool.query(consulta, query);
  return joyas;
};

const findByID = async (id) => {
  console.log("model id-->", id);
  const consulta = "SELECT * FROM inventario WHERE id = $1;";
  const values = [id];
  const { rows: joyas } = await pool.query(consulta, values);
  return joyas;
};

const findByOrder = async ({ limit = 5, order_by = "id_ASC" }) => {
  const [nombre, orden] = order_by.split("_");
  const formattedQuery = format(
    "SELECT * FROM inventario ORDER BY %s %s LIMIT %s;",
    nombre,
    orden,
    limit
  );
  const { rows: joyas } = await pool.query(formattedQuery);
  return joyas;
};

export const findJoyasByFilter = async (extras = "", values = []) => {
  const consulta = `SELECT * FROM inventario ${extras};`;

  const { rows: joyas } = await pool.query(consulta, values);
  return joyas;
};

export const prepareFilter = (queryString) => {
  let filters = [];
  let values = [];

  if (queryString == {}) return [(filters = ""), (values = "")];
  const addFilter = (campo, comparador, valor) => {
    values.push(valor);
    const { length } = filters;
    filters.push(`${campo} ${comparador} $${length + 1} `);
  };

  const { precio_max, precio_min, categoria, metal } = queryString;
  if (precio_max) addFilter("precio", "<=", precio_max);
  if (precio_min) addFilter("precio", ">=", precio_min);
  if (categoria) addFilter("categoria", "=", categoria);
  if (metal) addFilter("metal", "=", metal);

  filters = filters.join(" AND ");

  filters = `WHERE ${filters}`;

  return [filters, values];
};

const findByPagination = async ({ limit = 5, page = 1 }) => {
  const offset = (page - 1) * limit;
  const consulta = format(
    "SELECT * FROM inventario LIMIT %s OFFSET %s;",
    limit,
    offset
  );

  const { rows: joyas } = await pool.query(consulta);
  return joyas;
};

export const joyasModel = {
  findAll,
  findByID,
  findJoyasByFilter,
  prepareFilter,
  findByOrder,
  findByPagination,
};
