import { z } from "zod";

const teacherSchema = {
//   attendance: z.object({
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

  scoreTest: z.object({
    subjectID: z.number().min(1),
    studentID: z.number().min(1),
    classroomID: z.number().min(1),
    result : z.number().min(1)
  }),
  scoreMid: z.object({
    subjectID: z.number().min(1),
    studentID: z.number().min(1),
    classroomID: z.number().min(1),
    result : z.number().min(1)
  }),
  scoreFinal: z.object({
    subjectID: z.number().min(1),
    studentID: z.number().min(1),
    classroomID: z.number().min(1),
    result : z.number().min(1)
  }),
  scoreFinal: z.object({
    subjectID: z.number().min(1),
    studentID: z.number().min(1),
    classroomID: z.number().min(1),
    result : z.number().min(1)
  }),
  assignment: z.object({
    subjectID: z.number().min(1),
    studentID: z.number().min(1),
    classroomID: z.number().min(1),
    result : z.number().min(1)
  }),
  attendance: z.object({
    studentID: z.number().min(1),
    classroomID: z.number().min(1),
    status : z.boolean()
  }),

}

export default teacherSchema;

