import { Sequelize } from "sequelize";
import { env } from "./env.config.js";

const { name, user, pass, host, port, dialect } = env.db

export const dbConfig = new Sequelize(name, user, pass, {
    host,
    port,
    dialect
})