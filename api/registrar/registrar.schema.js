import { z } from "zod";

const registrarSchema = {
  registerStudent: z.object({
    parentId:z.number().min(1),
    classroomID:z.number().min(1),
    firstName: z.string(),
    middleName: z.string(),
    lastName: z.string(),
    gender: z.string(),
    address: z.string(),
    phone: z.string().min(10), 
    dateOfBirth: z.string(),  
    roleId: z.number().min(1),
  }),
  registerParent: z.object({
    email: z.string().email(),
    password: z.string().min(6),  
    firstName: z.string(),
    lastName: z.string(),
    gender: z.string(),
    address: z.string(),
    phone: z.string().min(10), 
    dateOfBirth: z.string(),  
    roleId: z.number().min(1),
    relationship:z.string(),
  }),
//   updateTeacher:z.object({
//     id:z.number().min(1),
//     email: z.string().email(),
//     password: z.string().min(6),  
//     firstName: z.string(),
//     lastName: z.string(),
//     address: z.string(),
//     phone: z.string().min(10), 
//     dateOfBirth: z.string(),  
//     roleId: z.number().min(1),
//     subjectId: z.number().min(1),
//     classId: z.number().min(1)
//   }),


}

export default registrarSchema;