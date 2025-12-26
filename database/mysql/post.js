import mysql2 from "mysql2/promise.js"
import dotenv from "dotenv"

export const DEFAULT_CONFIG = {
    host:"localhost",
    user: "root",
    port: 3306,
    password: "",
    database: "blog_api_rest"
}


dotenv.config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

console.log(process.env.DATABASE_URL)
export const connection = await mysql2.createConnection(connectionString)
