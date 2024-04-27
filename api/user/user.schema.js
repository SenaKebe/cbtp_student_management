// import z from "zod";

// const userSchema ={
// registerParent: z.object({
//     email:z.string(),
//     password:z.string().min(6),
//     firstName:z.string(),
//     lastName:z.string(),
//     address:z.string(),
//     phone:z.number().min(14),
//     dateOfBirth:z.string(),
//     companyRoleId:z.number()
// })

// }
// export default userSchema;
import { z } from "zod";

const adminSchema = {
  registerTeacher: z.object({
    email: z.string().email(),
    password: z.string().min(6),  
    firstName: z.string(),
    middleName: z.string(),
    lastName: z.string(),
    address: z.string(),
    phone: z.string().min(10), 
    gender: z.string(),
    dateOfBirth: z.string(),  // Change this to accept date format
    role: z.string(),
    subjectId: z.number().min(1),
    classId: z.number().min(1)
  }),
  registerRegistrarStaff: z.object({
    email: z.string().email(),
    password: z.string().min(6),  
    firstName: z.string(),
    middleName: z.string(),
    lastName: z.string(),
    gender: z.string(),
    address: z.string(),
    phone: z.string().min(10), 
    dateOfBirth: z.string(),  
    role: z.string(),
    // gradetoregister:z.number().min(1)
  }),
  updateTeacher:z.object({
    //  id:z.number().min(1),
    // email: z.string(),
    // password: z.string().min(6),  
    firstName: z.string(),
    lastName: z.string(),
    address: z.string(),
    gender: z.string(),
    phone: z.string().min(10), 
    dateOfBirth: z.string(),  
    role: z.string().min(1),
    subjectId: z.number().min(1),
    classId: z.number().min(1)
  }),
  updateRegistrarStaff:z.object({
    //  id:z.number().min(1),
    email: z.string(),
    password: z.string().min(6),  
    firstName: z.string(),
    lastName: z.string(),
    address: z.string(),
    gender: z.string(),
    phone: z.string().min(10), 
    dateOfBirth: z.string(),  
    roleId: z.number().min(1),
  }),
  addClass:z.object({
    className: z.string().min(1),
    Grade: z.number(1)

  }),


  loginUser:z.object({
    //  id:z.number().min(1),
    phone: z.string().min(10),
    email: z.string().email(),
    password: z.string().min(6), }),

changePassword:z.object({
oldPassword: z.string().min(1),
newPassword:z.string().min(1),
id:z.number().min(1)
    })
}

export default adminSchema;

