import teacherSchema from "./teacher.schema.js";
import prisma from '../../config/prisma.js';
import { auth, isAdmin } from '../../middleware/auth.js'

// import { hashPassword } from '../utils/security'; // Utility function for hashing passwords

const teacherController ={
    attendance: async (req, res, next) => {
        try {
            const validatedData = teacherSchema.attendance.parse(req.body);
    
            const attendanceS = await prisma.attendance.create({
                data: {
                    status: validatedData.status,
                    student: {connect: { id: validatedData.studentID }},
                    classroom: {connect: { id: validatedData.classroomID }}
                },
                
            });
    
            res.status(200).json(attendanceS);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    midExam: async (req, res, next) => {
        try {
            const validatedData = teacherSchema.scoreMid.parse(req.body);
    
            const midExam = await prisma.midExam.create({
                data: {
                    result: validatedData.result,
                    student: {connect: { id: validatedData.studentID }},
                    classroom: {connect: { id: validatedData.classroomID }},
                    subject: {connect: { id: validatedData.subjectID }},

                },
                
            });
    
            res.status(200).json(midExam);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    testScore: async (req, res, next) => {
        try {
            const validatedData = teacherSchema.scoreTest.parse(req.body);
    
            const test = await prisma.test.create({
                data: {
                    result: validatedData.result,
                    student: {connect: { id: validatedData.studentID }},
                    classroom: {connect: { id: validatedData.classroomID }},
                    subject: {connect: { id: validatedData.subjectID }},

                },
                
            });
    
            res.status(200).json(test);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },

    assignementScore: async (req, res, next) => {
        try {
            const validatedData = teacherSchema.assignment.parse(req.body);
    
            const assignement  = await prisma.assignment.create({
                data: {
                    result: validatedData.result,
                    student: {connect: { id: validatedData.studentID }},
                    classroom: {connect: { id: validatedData.classroomID }},
                    subject: {connect: { id: validatedData.subjectID }},

                },
                
            });
    
            res.status(200).json(assignement);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },

    finalExam: async (req, res, next) => {
        try {
            const validatedData = teacherSchema.scoreFinal.parse(req.body);
    
            const finalExam = await prisma.finalExam.create({
                data: {
                    result: validatedData.result,
                    student: {connect: { id: validatedData.studentID }},
                    classroom: {connect: { id: validatedData.classroomID }},
                    subject: {connect: { id: validatedData.subjectID }},

                },
                
            });
    
            res.status(200).json(finalExam);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
//get 
getMidExamResult: async (req, res, next) => {
    try {
        // Extracting the student ID from the URL parameters.
        const studentId = parseInt(req.params.id.substring(1)); 
        // Fetching a single mid exam result using the student ID.
        const midExamResult = await prisma.midExam.findFirst({
            where: {
                studentID: studentId
            },
            include: {
                student: true,
                classroom: true,
                subject: true
            }
        });        

        // Checking if a result was found
        if (!midExamResult) {
            return res.status(404).json({ message: 'No exam result found for the given student ID.' });
        }

        // Sending the fetched result in the response
        res.status(200).json(midExamResult);
    } catch (error) {
        // Logging the error to the console and sending an internal server error status
        console.error(error);
        res.status(500).send(error);
    }
},

getFinalExamResult: async (req, res, next) => {
    try {
        const studentId = parseInt(req.params.id.substring(1)); 

        const finalExamResult = await prisma.finalExam.findFirst({
            where: {
                studentID: studentId
            },
            include: {
                student: true,
                classroom: true,
                subject: true
            }
        });        

        if (!finalExamResult) {
            return res.status(404).json({ message: 'No exam result found for the given student ID.' });
        }

        res.status(200).json(finalExamResult);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
},
getTestResult: async (req, res, next) => {
    try {
        const studentId = parseInt(req.params.id.substring(1)); 

        const testResult = await prisma.test.findFirst({
            where: {
                studentID: studentId
            },
            include: {
                student: true,
                classroom: true,
                subject: true
            }
        });        
        if (!testResult) {
            return res.status(404).json({ message: 'No test result found for the given student ID.' });
        }
        res.status(200).json(testResult);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
},
getAssignmentResult: async (req, res, next) => {
    try {
        // Extracting the student ID from the URL parameters.
        const studentId = parseInt(req.params.id.substring(1)); 

        // Fetching a single assignment result using the student ID.
        const assignmentResult = await prisma.assignment.findFirst({
            where: {
                studentId: studentId
            },
            include: {
                student: true,
                classroom: true,
                subject: true
            }
        });        

        // Checking if a result was found
        if (!assignmentResult) {
            return res.status(404).json({ message: 'No assignment result found for the given student ID.' });
        }

        // Sending the fetched result in the response
        res.status(200).json(assignmentResult);
    } catch (error) {
        // Logging the error to the console and sending an internal server error status
        console.error(error);
        res.status(500).send(error);
    }
},
getAttendance: async (req, res, next) => {
    try {
        const studentId = parseInt(req.params.id.substring(1)); 

        const attendance = await prisma.attendance.findMany({
            where: {
                studentID: studentId
            },
            include: {
                student: true,
                classroom: true
            }
        });        
        if (!attendance || attendance.length === 0) {
            return res.status(404).json({ message: 'No attendance records found for the given student ID.' });
        }

        res.status(200).json(attendance);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
},
updateAssignmentScore: async (req, res, next) => {
    try {
        const studentId = parseInt(req.params.id.substring(1)); 
        const validatedData = teacherSchema.assignment.parse(req.body);

        const existingAssignment = await prisma.assignment.findFirst({
            where: {
                id: studentId
            }
        });

        if (!existingAssignment) {
            return res.status(404).json({ message: `Assignment not found for student with ID ${studentId}` });
        }

        // Update the assignment result
        const updatedAssignment = await prisma.assignment.update({
            where: {
                id: studentId
            },
            data: {
                result: validatedData.result
            }
        });

        res.status(200).json(updatedAssignment);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
},
updateMidExam: async (req, res, next) => {
    try {
        const studentId = parseInt(req.params.id.substring(1)); 
        const validatedData = teacherSchema.scoreMid.parse(req.body);

        const existingMidExam = await prisma.midExam.findFirst({
            where: {
                studentID: studentId
            }
        });

        if (!existingMidExam) {
            return res.status(404).json({ message: `Mid exam not found for student with ID ${studentId}` });
        }

        // Update the mid exam result
        const updatedMidExam = await prisma.midExam.update({
            where: {
                id: existingMidExam.id 
            },
            data: {
                result: validatedData.result
            }
        });

        res.status(200).json(updatedMidExam);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
},
updateTestScore: async (req, res, next) => {
    try {
        const studentId = parseInt(req.params.id.substring(1)); 
        const validatedData = teacherSchema.scoreTest.parse(req.body);
        const existingTest = await prisma.test.findFirst({
            where: {
                studentID: studentId
            }
        });

        if (!existingTest) {
            return res.status(404).json({ message: `Test score not found for student with ID ${studentId}` });
        }

        // Update the test score result
        const updatedTest = await prisma.test.update({
            where: {
                id: existingTest.id // Provide the test ID here
            },
            data: {
                result: validatedData.result
            }
        });

        res.status(200).json(updatedTest);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
},
updateFinalExamScore: async (req, res, next) => {
    try {
        const studentId = parseInt(req.params.id.substring(1)); 
        const validatedData = teacherSchema.scoreFinal.parse(req.body);

        const existingFinalExam = await prisma.finalExam.findFirst({
            where: {
                studentID: studentId
            }
        });

        if (!existingFinalExam) {
            return res.status(404).json({ message: `Final exam score not found for student with ID ${studentId}` });
        }

        // Update the final exam score result
        const updatedFinalExam = await prisma.finalExam.update({
            where: {
                id: existingFinalExam.id // Provide the final exam ID here
            },
            data: {
                result: validatedData.result
            }
        });

        res.status(200).json(updatedFinalExam);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
},
updateAttendance: async (req, res, next) => {
    try {
        const studentId = parseInt(req.params.id.substring(1)); 
        const validatedData = teacherSchema.attendance.parse(req.body);

        // Check if the attendance record exists for the student
        const existingAttendance = await prisma.attendance.findFirst({
            where: {
                studentID: studentId
            }
        });

        // If attendance record does not exist, return 404 Not Found
        if (!existingAttendance) {
            return res.status(404).json({ message: `Attendance not found for student with ID ${studentId}` });
        }

        // Update the existing attendance record
        const updatedAttendance = await prisma.attendance.update({
            where: {
                id: existingAttendance.id // Use the ID of the existing attendance record
            },
            data: {
                status: validatedData.status
            }
        });

        res.status(200).json(updatedAttendance);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

















}
export default teacherController;