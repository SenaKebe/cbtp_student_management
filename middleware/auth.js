// import { PrismaClient } from '@prisma/client';

// import prisma from '../../config/prisma.js';
// // import { hashPassword } from '../utils/security'; // Utility function for hashing passwords
// import adminSchema from "./user.schema.js"

// const auth = async (req, res, next) => {
//     try {
//         const token = req.headers['x-access-token'];

//         if (!token) {
//             return res.status(404).json({
//                 success: false,
//                 message: "no token is found"
//             });
//         } else {
//             const verified = jwt.verify(token, process.env.JWT_SECRET);
//             // const userId = verified.userId;

//             // Check if the user exists in the database
//             if(!verified){
//                 return res.status(400).json({
//                    success: false,
//                    message: "invalid token"
//                 })
//              }
//              else{
//                 req.userId =verified.userId;
//                 next();
//              }
//           }
//        } catch (error) {
//           res.status(500).json({success:  false ,message: error.message });
        
//        }

// };

// const isAdmin = async (req, res, next) => {
//     try {
//         const user = await prisma.user.findUnique({
//             where: { id: req.userId },
//             select: { role: true }
//         });

//         if (!user || user.roleId !== '1') {
//             return res.status(403).json({
//                 success: false,
//                 message: 'You have no privilege'
//             });
//         }

//         next();
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// export { auth, isAdmin };


import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
// import userService from '../services/user.service.js';

const prisma = new PrismaClient();
dotenv.config();

const auth = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(404).json({
                success: false,
                message: "No token found"
            });
        } else {
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            if (!verified) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid token"
                });
            } else {
                //this is done sice there might me users already logged in but deleted by the admin
                const userData = await prisma.user.findFirst({
                    where: {
                        id: +verified.userId,
                    },
                    
                });
                if(userData){
                    req.userId = verified.userId;
                    req.user = userData;
                    next();
                }
               
            }
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const isTeacher = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.userId
            },
            select: {
                role: true
            }
        });

        if (!user || user.role.companyRoleName !== 'teacher') {
            return res.status(403).json({
                success: false,
                message: 'You have no privilege'
            });
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};
const isParent = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.userId
            },
            select: {
                role: true
            }
        });

        if (!user || user.role.companyRoleName !== 'parent') {
            return res.status(403).json({
                success: false,
                message: 'You have no privilege'
            });
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.userId
            },
            select: {
                role: true
            }
        });

        if (!user || user.role.companyRoleName !== 'Admin') {
            return res.status(403).json({
                success: false,
                message: 'You have no privilege'
            });
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const isRegistrar = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.userId
            },
            select: {
                role: true
            }
        });

        if (!user || user.role.companyRoleName !== 'Registrar') {
            return res.status(403).json({
                success: false,
                message: 'You have no privilege'
            });
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


export { auth, isAdmin, isTeacher, isParent,isRegistrar };


