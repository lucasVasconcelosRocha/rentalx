import { Router } from "express";

import { ResetPasswordUserController } from "@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController";
import { SendForgotPasswordController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordController";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordController();
const resetPasswordController = new ResetPasswordUserController();

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);
passwordRoutes.post("/reset", resetPasswordController.handle);

export { passwordRoutes };
