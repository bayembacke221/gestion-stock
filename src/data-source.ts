import "reflect-metadata"
import { DataSource } from "typeorm"
import { Utilisateur } from "./models/utilisateur"
import dotenv from "dotenv";


dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.HOST_DB || "localhost",
    port: Number(process.env.PORT_DB) || 3306,
    username: process.env.USER_DB || "root",
    password: process.env.PASSWORD_DB || "",
    database: process.env.DB_NAME || "gestion_stock",
    synchronize: false,
    logging: false,
    entities: [Utilisateur],
    migrations: [],
    subscribers: []
})