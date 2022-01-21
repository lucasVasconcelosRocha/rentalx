import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/Implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/DateProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordUseCase } from "./SendForgotPasswordUseCase";

let sendForgotPasswordUsecase: SendForgotPasswordUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send forgot password mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordUsecase = new SendForgotPasswordUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "586887",
      email: "leliupi@nihazwat.mk",
      name: "Clara Norton",
      password: "1234",
    });

    await sendForgotPasswordUsecase.execute("leliupi@nihazwat.mk");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if user user does not exists", async () => {
    await expect(
      sendForgotPasswordUsecase.execute("jo@suka.pw")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("should be able to create an users token", async () => {
    const generatedTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      "create"
    );

    await usersRepositoryInMemory.create({
      driver_license: "346842",
      email: "id@vetet.co.uk",
      name: "Andre Green",
      password: "09876",
    });

    await sendForgotPasswordUsecase.execute("id@vetet.co.uk");

    expect(generatedTokenMail).toBeCalled();
  });
});
