import express from "express";
import userRoute from "../api/user/user.route.js";
import registrarRoute from "../api/registrar/registrar.route.js"
import teacherRoute from "../api/teacher/teacher.route.js"

const appRoute = express.Router();

// all routes
appRoute.use("/user",userRoute);
appRoute.use("/user",registrarRoute);
appRoute.use("/user",teacherRoute);

export default appRoute;
