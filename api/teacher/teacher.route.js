import express from 'express';
import teacherController from './teacher.controller.js';
const teacherRoute = express.Router();
import { auth,isTeacher } from '../../middleware/auth.js';

teacherRoute.post("/attendance",auth,isTeacher, teacherController.attendance);
teacherRoute.post("/midexam",auth,isTeacher, teacherController.midExam);
teacherRoute.post("/finalexam",auth,isTeacher, teacherController.finalExam);
teacherRoute.post("/test",auth,isTeacher, teacherController.testScore);
teacherRoute.post("/assignement",auth,isTeacher, teacherController.assignementScore);
teacherRoute.get("/midexam/:id",auth,isTeacher, teacherController.getMidExamResult);
teacherRoute.get("/finalexam/:id", teacherController.getFinalExamResult);
teacherRoute.get("/test/:id", teacherController.getTestResult);
teacherRoute.get("/assignment/:id", teacherController.getAssignmentResult);
teacherRoute.get("/attendance/:id", teacherController.getAttendance);
teacherRoute.get("/", teacherController.getFinalExamResult);
teacherRoute.put("/updassign/:id",auth,isTeacher, teacherController.updateAssignmentScore);
teacherRoute.put("/updmid/:id",auth,isTeacher, teacherController.updateMidExam);
teacherRoute.put("/updtest/:id",auth,isTeacher, teacherController.updateTestScore);
teacherRoute.put("/updfinal/:id",auth,isTeacher, teacherController.updateFinalExamScore);
teacherRoute.put("/updattend/:id",auth,isTeacher, teacherController.updateAttendance);


// registrarRoute.get("/findstudent", teacherController.findAllStudents);


// registrarRoute.put("/updateteacher/:id", registrarController.updateTeacher);
export default teacherRoute;