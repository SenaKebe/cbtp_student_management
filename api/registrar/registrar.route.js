import express from 'express';
import registrarController from './registrar.controller.js';
const registrarRoute = express.Router();

registrarRoute.post("/registerParent", registrarController.registerParent);
registrarRoute.post("/registerStudent", registrarController.registerStudent);
registrarRoute.get("/findstudent/:id", registrarController.findStudentById);
registrarRoute.get("/findAllstudents", registrarController.findAllStudents);
registrarRoute.get("/findparent/:id", registrarController.findParentById);
registrarRoute.get("/findAllParents", registrarController.getAllParents);


// registrarRoute.put("/updateteacher/:id", registrarController.updateTeacher);
export default registrarRoute;