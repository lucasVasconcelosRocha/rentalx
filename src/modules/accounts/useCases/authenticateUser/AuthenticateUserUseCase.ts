import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

interface IRequest {
  email: string;
  password: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect");
    }

    const token = sign({}, "427280a47b7e542e7044e0c9026befd0", {
      subject: user.id,
      expiresIn: "1d",
    });

    const tokenResponse: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return tokenResponse;
  }
}

export { AuthenticateUserUseCase };
