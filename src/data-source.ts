import "reflect-metadata"
import { DataSource } from "typeorm"
import { Utilisateur } from "./models/utilisateur"
import dotenv from "dotenv";
import { Entreprise } from "./models/entreprise";
import { Adresse } from "./models/adresse";
import { Role } from "./models/role";


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
    entities: [Utilisateur,Entreprise,Adresse,Role],
    migrations: [],
    subscribers: []
})