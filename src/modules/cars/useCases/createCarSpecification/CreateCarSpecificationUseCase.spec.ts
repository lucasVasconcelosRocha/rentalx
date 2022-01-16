import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create a Car Specification", () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarsRepositoryInMemory();
    specificationRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carRepositoryInMemory,
      specificationRepositoryInMemory
    );
  });

  it("should not be able to add a new specification for a non-existent car", async () => {
    const car_id = "1234";
    const specifications_id = ["123467"];

    await expect(
      createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      })
    ).rejects.toEqual(new AppError("Car not exists!"));
  });

  it("should be able to add a new specification for a car", async () => {
    const car = await carRepositoryInMemory.create({
      name: "newcar",
      description: "desc car",
      daily_rate: 150,
      license_plate: "ASD-2155",
      fine_amount: 15,
      brand: "FIAT",
      category_id: "147258",
    });

    const specification = await specificationRepositoryInMemory.create({
      name: "specification test",
      description: "specification test description",
    });

    const specifications_id = [specification.id];

    const specificationsCar = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationsCar).toHaveProperty("specifications");
    expect(specificationsCar.specifications.length).toBeGreaterThanOrEqual(1);
  });
});
