import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListCarsUseCase } from "./ListCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listCarsUseCase: ListCarsUseCase;

describe("List cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Teste_01",
      description: "teste_description01",
      daily_rate: 100,
      license_plate: "HFG-9898",
      fine_amount: 60,
      brand: "Wolkswagen",
      category_id: "5247d116-ae34-4b33-aea2-e0292dddd406",
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Teste_02",
      description: "teste_description02",
      daily_rate: 100,
      license_plate: "HFG-1587",
      fine_amount: 60,
      brand: "Wolkswagen",
      category_id: "5247d116-ae34-4b33-aea2-e0292dddd406",
    });

    const cars = await listCarsUseCase.execute({
      name: "Teste_02",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Teste_03",
      description: "teste_description02",
      daily_rate: 100,
      license_plate: "HFG-1587",
      fine_amount: 60,
      brand: "Wolkswagen",
      category_id: "5247d116-ae34-4b33-aea2-e0292dddd406",
    });

    const cars = await listCarsUseCase.execute({
      brand: "Wolkswagen",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Teste_04",
      description: "teste_description02",
      daily_rate: 100,
      license_plate: "HFG-1587",
      fine_amount: 60,
      brand: "Wolkswagen",
      category_id: "5247d116-ae34-4b33-aea2-e0292dddd406",
    });

    const cars = await listCarsUseCase.execute({
      category_id: "5247d116-ae34-4b33-aea2-e0292dddd406",
    });

    expect(cars).toEqual([car]);
  });
});
