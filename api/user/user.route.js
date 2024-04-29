import express from 'express';
import staffController from './usernew.controller.js';  // Ensure this path is correct
import { auth,isAdmin } from '../../middleware/auth.js';

const userRoute = express.Router();

userRoute.post("/register",staffController.registerTeacher);
userRoute.post("/register/Registrar", staffController.registerRegistrarStaff);
userRoute.put("/updateteacher/:id", staffController.updateTeacher);
// userRoute.get("/findteacher/:id", staffController.findTeacherById);
userRoute.post("/addClass", staffController.addClass);
userRoute.post("/addSubject", staffController.addSubjet);
userRoute.post("/login", staffController.loginUser);
userRoute.post("/change/password", staffController.changePassword);
userRoute.put("/updateregistrar/:id", staffController.updateRegistrarStaff);
userRoute.get("/getTeacher/:id", staffController.getTeacher);
userRoute.get("/teachers", staffController.getAllTeachers);
userRoute.get("/registrarWorker/:id", staffController.getRegistrarStaffById );
userRoute.get("/registrarworkers", staffController.getAllRegistrarStaff);
userRoute.get("/me/myinfo",[auth], staffController.getMyInfo);



// userRoute.get("/findregistrarW/:id", staffController.findRegistrarWorkerById);


export default userRoute;

