// import { MiddlewareFn } from "type-graphql";
// import { AppContext, userTypes } from "../contexts/AppContext";
// import { BaseContext } from "../contexts/BaseContext";
// import { extractAuthToken } from "../helpers/session";
// import * as jwt from "jsonwebtoken";
// import ManagerSessionModel from "../models/ManagerSessionModel";
// import { AdminTokenModel, Context, HoaModel, ResidentModel } from "../";
// import ResidentSessionModel from "../models/ResidentSessionModel";
// import CoManagerModel from "../models/CoManagerModel";
// import { ErrorHandler } from "@gogocode-package/backend-utils/src/handler";
// import AdminModel from "../models/AdminModel";
// import { JWT_SECRET_TOKEN } from "../../config/app_config";
// import { Response } from "express";

// export const validateManager: MiddlewareFn<AppContext & BaseContext> = async ({ context }, next) => {
//   const token = extractAuthToken(context);
//   let managerSession = await ManagerSessionModel.isValidManager(token);
//   if (managerSession) {
//     context.manager = managerSession.ManagerModel;
//     const response = await next();
//     createLog(context, context?.manager?.MANAGER_ID, "MANAGER", JSON.stringify(response));
//     return response;
//   } else {
//     throw new Error("Invalid User");
//   }
// };

// export const validateResident: MiddlewareFn<AppContext & BaseContext> = async ({ context, args }, next) => {
//   console.log("The context from middleware before", {
//     context,
//   });
//   const token = extractAuthToken(context);

//   let residentSession = await ResidentSessionModel.isValidResident(token);
//   console.log("The context from middleware After", {
//     token,
//     residentSession,
//     ResidentModel: residentSession?.ResidentModel,
//   });
//   if (residentSession) {
//     context.resident = residentSession.ResidentModel;
//     let financial_year = await HoaModel.getCurrentFinancialYear(Number(residentSession.ResidentModel.HOA_ID));
//     if (financial_year) context.financial_year = financial_year;
//     const response = await next();
//     createLog(context, context?.resident?.RESIDENT_ID, "RESIDENT", JSON.stringify(response));
//     return response;
//   } else {
//     throw new Error("Invalid User");
//   }
// };

// export const validateAdmin: MiddlewareFn<AppContext & BaseContext> = async ({ context }, next) => {
//   const token = extractAuthToken(context);
//   let admin = await validateToken(token);
//   if (admin) {
//     context.admin = admin;
//     const response = next();
//     createLog(context, context?.admin?.id, "ADMIN", JSON.stringify(response));
//     return response;
//   } else {
//     throw new Error("Invalid admin");
//   }
// };

// export const validateManagerHOAAccess: MiddlewareFn<AppContext & BaseContext> = async ({ context, args }, next) => {
//   if (
//     !(
//       (await HoaModel.hasManager(args.hoa_id, context?.manager?.MANAGER_ID)) ||
//       (await CoManagerModel.hasHoa(args.hoa_id, context?.manager?.MANAGER_ID))
//     )
//   ) {
//     throw new Error("Manager don't have access to this HOA");
//   } else {
//     return next();
//   }
// };

// export const validateHoa = async (hoaId: number, context: Context) => {
//   const token = extractAuthToken(context);
//   let userType = token.split("__")[0];
//   if (userType == userTypes.MANAGER) {
//     let managerSession = await ManagerSessionModel.isValidManager(token);
//     if (managerSession && managerSession.ManagerModel) {
//       let managerId = managerSession.ManagerModel.MANAGER_ID;
//       if (!((await HoaModel.hasManager(hoaId, managerId)) || (await CoManagerModel.hasHoa(hoaId, managerId)))) {
//         throw new Error("Manager don't have access to this HOA");
//       }
//       return true;
//     }
//   } else if (userType == userTypes.RESIDENT) {
//     let residentSession = await ResidentSessionModel.isValidResident(token);
//     if (!(residentSession && residentSession.ResidentModel) || residentSession.ResidentModel.HOA_ID != hoaId) {
//       throw new Error("Resident does not belong to this HOA");
//     }
//     return true;
//   }
//   // else if (userType == userTypes.VENDOR) {
//   //   if (await VendorSessionModel.isValidVendor(token)) {
//   //     console.log("Valid Vendor");
//   //     return true;
//   //   }
//   // }
//   throw new Error("Not a valid user");
// };

// export const validateManagerRest = async (req, res, next) => {
//   let context: BaseContext = {
//     req,
//     connection: null,
//   };
//   const token = extractAuthToken(context);
//   if (!token) {
//     return ErrorHandler.response(res, 400, "Invalid User", null);
//   }
//   let managerSession = await ManagerSessionModel.isValidManager(token);
//   if (managerSession) {
//     req.manager = managerSession.ManagerModel;
//     return next();
//   } else {
//     return ErrorHandler.response(res, 400, "Invalid User", null);
//   }
// };

// export const validateResidentRest = async (req, res, next) => {
//   let context: BaseContext = {
//     req,
//     connection: null,
//   };
//   const token = extractAuthToken(context);
//   if (!token) {
//     return ErrorHandler.response(res, 400, "Invalid User", null);
//   }
//   let residentSession = await ResidentSessionModel.isValidResident(token);
//   if (residentSession) {
//     req.resident = residentSession.ResidentModel;
//     return next();
//   } else {
//     return ErrorHandler.response(res, 400, "Invalid User", null);
//   }
// };

// export const validateToken = (token: string): Promise<AdminModel> => {
//   return new Promise((resolve, reject) => {
//     jwt.verify(token, JWT_SECRET_TOKEN, async (err: any, decoded: any) => {
//       if (err) {
//         reject("Invalid token");
//       }
//       const adminToken = await AdminTokenModel.findOne({
//         where: { admin_token: decoded.token },
//       });
//       if (adminToken?.admin_id) {
//         const userDb = await AdminModel.findOne({
//           where: { id: adminToken.admin_id },
//         });
//         if (!userDb) reject("Invalid user");
//         return resolve(userDb);
//       } else {
//         reject("Invalid user");
//       }
//     });
//   });
// };

// const validateUserToken = (token: string, res) => {
//   if (!token) {
//     ErrorHandler.response(res, 400, "Invalid User", null);
//   }
// };

// export const getManager = async (token: string, res: Response): Promise<ManagerModel> => {
//   validateUserToken(token, res);
//   let managerSession = await ManagerSessionModel.isValidManager(token);
//   return managerSession?.ManagerModel;
// };

// export const getAdmin = async (token: string, res: Response): Promise<any> => {
//   validateUserToken(token, res);
//   return await validateToken(token).catch((error) => {
//     ErrorHandler.response(res, 400, "Not a valid user", null);
//   });
// };
