import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/Implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayJsProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayJsProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "test",
      description: "car_Test",
      daily_rate: 50,
      license_plate: "ABD-8976",
      fine_amount: 60,
      category_id: "1234",
      brand: "brand",
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "23p42jkj",
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create new rental if there's a rental with the same user.", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "909090",
      expected_return_date: dayAdd24Hours,
      user_id: "23p42jkj",
    });

    await expect(
      createRentalUseCase.execute({
        car_id: "13257",
        user_id: "23p42jkj",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(
      new AppError("There's a rental in progress for this user!")
    );
  });

  it("should not be able to create new rental if there's a rental with the same car.", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "808080",
      expected_return_date: dayAdd24Hours,
      user_id: "5987",
    });

    await expect(
      createRentalUseCase.execute({
        car_id: "808080",
        user_id: "4457",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(
      new AppError("There's a rental in progress for this car!")
    );
  });

  it("should be able to create new rental with invalid return time.", async () => {
    expect(
      createRentalUseCase.execute({
        car_id: "123456",
        user_id: "23p42jkj",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid returned time!"));
  });
});
