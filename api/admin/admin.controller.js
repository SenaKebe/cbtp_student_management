// import prisma from "../../config/prisma.js"
// import adminSchema from "../admin/admin.schema.js"


// const adminController = {
//     register: async(req,res,next)=>{
//         console.log(req.body);
//         adminSchema.register.parse(req.body);
    
//     const newAdmin = await prisma.admin.create({
//         data:{
//             email: req.body.email,
//             password: req.body.password,
//             profile: {
//                 create:{
//                     firstName: req.body.firstName,
//                     lastName: req.body.lastName,
//                     // dateOfBirth: new Date.now(),
//                     address: req.body.address,
//                     phone: req.body.phone,
                    
//                 }
//             }

//             // include:{
//             //     profile: true;
//             // } 
//         }

//     });
//     res.status(200).json(newAdmin);
//     },


//     delete: async (req, res, next) => {
//         const userId = req.params.userId;

//         try {
//             const deletedAdmin = await prisma.admin.delete({
//                 where: {
//                     userId: userId
//                 }
//             });

//         }


    
// },
// }
// export default adminController;