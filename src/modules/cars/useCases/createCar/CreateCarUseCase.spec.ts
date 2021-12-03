import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car.", async () => {
    const car = {
      name: "newcar",
      description: "desc car",
      daily_rate: 150,
      license_plate: "ASD-2155",
      fine_amount: 15,
      brand: "FIAT",
      category_id: "147258",
    };

    await createCarUseCase.execute({
      name: car.name,
      description: car.description,
      daily_rate: car.daily_rate,
      license_plate: car.license_plate,
      fine_amount: car.fine_amount,
      brand: car.brand,
      category_id: car.category_id,
    });
  });

  it("should be able to create a new car always available.", async () => {
    const car = {
      name: "carVailable",
      description: "desc car",
      daily_rate: 150,
      license_plate: "ASD-2159",
      fine_amount: 15,
      brand: "FIAT",
      category_id: "1298398sdahfe980",
    };

    const createdCar = await createCarUseCase.execute({
      name: car.name,
      description: car.description,
      daily_rate: car.daily_rate,
      license_plate: car.license_plate,
      fine_amount: car.fine_amount,
      brand: car.brand,
      category_id: car.category_id,
    });

    expect(createdCar.available).toBe(true);
  });

  it("should not be able to create a new car with the same license plate.", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "carSamePlate",
        description: "nicecar",
        daily_rate: 140.0,
        license_plate: "abc123",
        fine_amount: 40.0,
        brand: "audi",
        category_id: "1298398sdahfe980",
      });

      await createCarUseCase.execute({
        name: "carSamePlate",
        description: "nicecar",
        daily_rate: 140.0,
        license_plate: "abc123",
        fine_amount: 40.0,
        brand: "audi",
        category_id: "1298398sdahfe980",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
