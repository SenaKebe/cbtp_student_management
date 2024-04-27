// const userController = {
//  registerParent:(req,res,next)=>{
//       // console.log(req.body);
//   userSchema.registerParent.parse(req.body);
  
//   const newParent= await prisma.user.create({
//       data:{
//           email: req.body.email,
//           password: req.body.password,
//           profile: {
//               create:{
//                   firstName: req.body.firstName,
//                   middleName: req.body.middleName,
//                   lastName: req.body.lastName,

//                   address: req.body.address,
//                   phone: req.body.phone, 
//                   dateOfBirth: new Date.now(),

//               }
//           }
//           userRole: {
//             create: {
//                 companyRoleId: req.body.companyRoleId,
//             }
//           }

//            include:{
//               profile: true;
//           } 
//       }

//   });
//   res.status(200).json(newAdmin);
//   },



    
//  }
    
    
//     }
//     export default userController;
// import prisma from "../../config/prisma.js";
// import userSchema from "./user.schema.js";

// const userController = {
//   registerParent: async (req, res, next) => {
//     try {
//       const validatedData = userSchema.registerParent.parse(req.body);

//       const newParent = await prisma.user.create({
//         data: {
//           email: validatedData.email,
//           password: validatedData.password,
//           // roleId: validatedData.roleId, // Corrected field name to roleId
//           profile: {
//             create: {
//               firstName: validatedData.firstName,
//               lastName: validatedData.lastName,
//               address: validatedData.address,
//               phone: validatedData.phone,
//               dateOfBirth: new Date(validatedData.dateOfBirth),
//             }
//           },
//         },
//         include: {
//           profile: true,
//            // Include the role in the response
//         }
//       });

//       res.status(200).json(newParent);
//     } catch (error) {
//       console.error(error);
//       next(error);
//     }
//   },
//   registerChild: async (req, res, next) => {
//     try {
//       // Assuming the child registration is similar; adjust accordingly
//       const validatedData = userSchema.registerChild.parse(req.body);
//       const newChild = await prisma.user.create({
//         data: {
//           parentId: validatedData.userId,
//           profile: {
//             create: {
//               firstName: validatedData.firstName,
//               lastName: validatedData.lastName,
//               address: validatedData.address,
//               phone: validatedData.phone,
//               dateOfBirth: new Date(validatedData.dateOfBirth),
//             }
//           },
//           // Additional data fields for a child could be added here
//         },
//         include: {
//           profile: true,
//         }
//       });

//       res.status(200).json(newChild);
//     } catch (error) {
//       console.error('Error registering child:', error);
//       next(error);
//     }
//   }
// };














// export default userController;

