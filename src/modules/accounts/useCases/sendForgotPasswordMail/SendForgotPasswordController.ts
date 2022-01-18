import { Request, Response } from "express";
import { container } from "tsyringe";

import { SendForgotPasswordUseCase } from "./SendForgotPasswordUseCase";

class SendForgotPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const sendForgotPasswordMailUseCase = container.resolve(
      SendForgotPasswordUseCase
    );

    const { email } = request.body;

    await sendForgotPasswordMailUseCase.execute(email);

    return response.send();
  }
}

export { SendForgotPasswordController };
