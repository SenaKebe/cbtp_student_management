import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.SERVER_PORT;
export const HOST = process.env.SERVER_HOST;
export const JWT = process.env.JWT_SECRET;