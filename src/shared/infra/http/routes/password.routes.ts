import { Router } from "express";

import { SendForgotPasswordController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordController";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordController();

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);

export { passwordRoutes };
