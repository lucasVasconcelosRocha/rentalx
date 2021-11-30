import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    name,
    brand,
    fine_amount,
    daily_rate,
    license_plate,
    description,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      brand,
      fine_amount,
      daily_rate,
      license_plate,
      description,
      category_id,
    });

    this.cars.push(car);

    return car;
  }

  async findCarByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find((car) => car.license_plate === license_plate);
    return car;
  }
}

export { CarsRepositoryInMemory };
