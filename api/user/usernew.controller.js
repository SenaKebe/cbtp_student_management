import prisma from "../../config/prisma.js";
// import { hashPassword } from '../utils/security'; // Utility function for hashing passwords
import adminSchema from "./user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { auth, isAdmin } from "../../middleware/auth.js";

const staffController = {
  registerTeacher: async (req, res) => {
    try {
      const validatedData = adminSchema.registerTeacher.parse(req.body);
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);
  
      // Check if user already exists
      const userExist = await prisma.user.findFirst({
        where: {
          OR: [
            {
              email: validatedData.email,
            },
            {
              profile: {
                some: {
                  phone: validatedData.phone,
                },
              },
            },
          ],
        },
      });
  
      if (userExist) {
        return res.status(403).json({ message: "User already exists",success:false });
      }
    
      // Create a new user
      const newUser = await prisma.user.create({
        data: {
          email: validatedData.email,
          password: hashedPassword,
          role: validatedData.role,
          profile: {
            create: {
              firstName: validatedData.firstName,
              lastName: validatedData.lastName,
              middleName: validatedData.middleName,
              address: validatedData.address,
              phone: validatedData.phone,
              dateOfBirth: new Date(validatedData.dateOfBirth),
            },
          },
          teacher: {
            create: {
              subject: { connect: { id: parseInt(validatedData.subjectId) } },
              class: { connect: { id: parseInt(validatedData.classId) } },
            },
          },
        },
        include: {
          profile: true,
          teacher: true,
        },
      });
      console.log(newUser);
  
      res.status(200).json({
        success: true,
        message: "Teacher registered successfully",
        user: newUser,
      });
    } catch (error) {
      console.error("Teacher registration error:", error);
      res.status(500).json({
        success: false,
        message: "Error registering teacher",
        error: error.message,
      });
    }
  },
  
  registerRegistrarStaff: async (req, res, next) => {
    try {
      const validatedData = adminSchema.registerRegistrarStaff.parse(req.body);
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);
      const userExist = await prisma.user.findFirst({
        where: {
          OR: [
            {
              email: validatedData.email,
            },
            {
              profile: {
                some: {
                  phone: validatedData.phone,
                },
              },
            },
          ],
        },
      });
      if (userExist) {
        return res
          .status(403)
          .json({
            success: false,
            message: "email or the phone number is already exist",
          });
      }
      const newRegistrarStaff = await prisma.user.create({
        data: {
          email: validatedData.email,
          password: hashedPassword,
          role: validatedData.role, // Include roleId here
          profile: {
            create: {
              firstName: validatedData.firstName,
              lastName: validatedData.lastName,
              middleName: validatedData.middleName,
              address: validatedData.address,
              phone: validatedData.phone,
              dateOfBirth: new Date(validatedData.dateOfBirth),
            },
          },
        },
        include: {
          profile: true,
        },
      });

      res
        .status(200)
        .json({
          message: "user created successfully",
          success: true,
          data: newRegistrarStaff,
        });
    } catch (error) {
      console.error("Registrar staff registration error:", error);
      res.status(500).send({
        success: false,
        message: "Registrar staff registration failed",
        error: error.message,
      });
    }
  },
  updateTeacher: async (req, res, next) => {
    try {
      const userId = parseInt(req.params.id.substring(1));
      const validatedData = adminSchema.updateTeacher.parse(req.body);
      // const hashedPassword = await bcrypt.hash(validatedData.password, 10);
      console.log(validatedData);
      const existingUser = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      // If user does not exist, return 404 Not Found
      if (!existingUser) {
        return res
          .status(404)
          .json({ message: `User not found with ID ${userId}` });
      }
      console.log(existingUser);

      // Update the user and associated profile and teacher details
      console.log(userId);
      const updatedUser = await prisma.profile.update({
        where: {
          userId: +userId,
        },
        data: {
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          address: validatedData.address,
          phone: validatedData.phone,
          dateOfBirth: new Date(validatedData.dateOfBirth),
        },
      });
      console.log(updatedUser);

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Teacher update error:", error);
      res.status(500).send(error);
    }
  },
  addClass: async (req, res, next) => {
    try {
      console.log(req.body)
      const validatedData = adminSchema.addClass.parse(req.body);
      // Create a new class
      const newClass = await prisma.classroom.create({
        data:{
          className: req.body.className,
          Grade: parseInt(req.body.Grade),
          
        }
      });

      return res
        .status(201)
        .json({ message: "Class added successfully",success: true, class: newClass });
    } catch (error) {
      console.error("Error adding class:", error);
      res.status(500).json({ message: "Error adding class" });
    }
  },
  addSubjet: async (req, res, next) => {
    try {
      console.log(req.body)
      const validatedData = adminSchema.addSubjet.parse(req.body);
      // Create a new class
      const newClass = await prisma.subject.create({
        data:{
          subjectName: req.body.subjectName,
        }
      });

      return res
        .status(201)
        .json({ message: "subject added successfully",success: true, class: newClass });
    } catch (error) {
      console.error("Error adding class:", error);
      res.status(500).json({ message: "Error adding class" });
    }
  },

  updateRegistrarStaff: async (req, res, next) => {
    try {
      const userId = parseInt(req.params.id.substring(1));
      const validatedData = adminSchema.updateRegistrarStaff.parse(req.body);
      if (validatedData.password) {
        validatedData.password = await bcrypt.hash(validatedData.password, 10);
      }
      const updatedRegistrarStaff = await prisma.user.update({
        where: {
          id: +parseInt(req.params.id), // Ensure the ID is parsed as an integer
        },
        data: {
          // email: validatedData.email,
          // password: validatedData.hashedPassword,
          roleId: validatedData.rle,
          profile: {
            update: {
              firstName: validatedData.firstName,
              lastName: validatedData.lastName,
              address: validatedData.address,
              phone: validatedData.phone,
              dateOfBirth: new Date(validatedData.dateOfBirth),
            },
          },
        },
        include: {
          profile: true,
        },
      });

      res.status(200).json(updatedRegistrarStaff);
    } catch (error) {
      console.error("Registrar staff update error:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  },
  getTeacher: async (req, res, next) => {
    try {
      const userId = parseInt(req.params.id.substring(1));

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          profile: true,
          teacher: true,
        },
      });

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      res.status(200).json({ success: true, user: user });
    } catch (error) {
      console.error("Error fetching teacher:", error);
      res
        .status(500)
        .json({ success: false, message: "Error fetching teacher" });
    }
  },
  getAllTeachers: async (req, res) => {
    try {
      // Find all users with role ID corresponding to teacher
      const teachers = await prisma.user.findMany({
        where: {
          role: "TEACHER", // Assuming role ID 2 corresponds to the teacher role
        },
        include: {
          profile: true,
          teacher: true,
        },
      });

      res.status(200).json({ success: true, teachers: teachers });
    } catch (error) {
      console.error("Error fetching teachers:", error);
      res
        .status(500)
        .json({ success: false, message: "Error fetching teachers" });
    }
  },
  getRegistrarStaffById: async (req, res) => {
    try {
      const userId = parseInt(req.params.id.substring(1)); // Assuming the parameter is named 'id'

      // Find the registrar staff member by their ID
      const registrarStaff = await prisma.user.findUnique({
        where: {
          id: userId,
          role: "REGISTRAR", // Assuming role ID 4 corresponds to the registrar staff role
        },
        include: {
          profile: true,
        },
      });

      if (!registrarStaff) {
        return res
          .status(404)
          .json({ success: false, message: "Registrar staff not found" });
      }

      res.status(200).json({ success: true, registrarStaff: registrarStaff });
    } catch (error) {
      console.error("Error fetching registrar staff:", error);
      res
        .status(500)
        .json({ success: false, message: "Error fetching registrar staff" });
    }
  },
  getAllRegistrarStaff: async (req, res) => {
    try {
      // Find all registrar staff members by role ID
      const registrarStaffList = await prisma.user.findMany({
        where: {
          role: "REGISTRAR", // Assuming role ID 4 corresponds to the registrar staff role
        },
        include: {
          profile: true,
          _count: true
        },
      });

      res
        .status(200)
        .json({ success: true, registrarStaffList: registrarStaffList });
    } catch (error) {
      console.error("Error fetching registrar staff:", error);
      res
        .status(500)
        .json({ success: false, message: "Error fetching registrar staff" });
    }
  },
  loginUser: async (req, res, next) => {
    try {
      const { userIdentifier, userPassword } = req.body;

      if (!userIdentifier || !userPassword) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      let user;
      // Check if the provided identifier is an email
      if (userIdentifier.includes("@")) {
        user = await prisma.user.findUnique({
          where: {
            email: userIdentifier,
          },
          include: {
            profile: true,
          },
        });
      } else {
        // Identifier is a phone number, search in profile table
        user = await prisma.profile.findUnique({
          where: {
            phone: userIdentifier,
          },
          include: {
            user: {
              select: {
                id: true,
                email: true,
                password: true, // Include the password in the selection
              },
            },
          },
        });
      }

      // If no account exists with this identifier
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "No account exists with this email or phone number",
        });
      }

      // Extract user information
      const userData = user.user ? user.user : user;

      // Compare user password with database password
      const isMatch = bcrypt.compareSync(userPassword, userData.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Incorrect password",
        });
      } else {
        // Extract first name and user role
        const firstName = user.profile ? user.profile.firstName : null;
        const userRole = userData.role;
        const userId = userData.id;

        // Prepare token
        const token = jwt.sign(
          { userId, userRole, firstName },
          process.env.JWT_SECRET
        );

        return res.status(200).json({
          token,
          success: true,
          message: "Login successful",
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  getMyInfo: async (req, res, next) => {
    const user = req.user;
    const userData = await prisma.user.findFirst({
      where: {
        id: +user.id,
      },
      include: {
        _count: true,
        profile: true,
        parent: true,
        teacher: true,
      },
    });
    res.status(200).json(userData);
  },

  changePassword: async (req, res) => {
    try {
      req.body.userId = req.userId;
      const validatedData = adminSchema.changePassword.parse(req.body);
      console.log(validatedData);
      // console.log(req.body.userId);
      const user = await prisma.user.findUnique({
        where: { id: validatedData.id },
        select: { password: true },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User does not exist",
        });
      }

      const isMatch = bcrypt.compareSync(oldPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Incorrect old password",
        });
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(newPassword, salt);

      const updatePassword = await prisma.user.update({
        where: { id: validatedData.userId },
        data: { password: hashedPassword },
      });

      if (!updatePassword) {
        return res.status(500).json({
          success: false,
          message: "Error during password update",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Password updated successfully",
      });
    } catch (error) {
      console.error("Error in changePassword:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
};

export default staffController;
