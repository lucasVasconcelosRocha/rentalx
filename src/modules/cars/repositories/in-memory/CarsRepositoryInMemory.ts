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
    specifications,
    id,
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
      specifications,
      id,
    });

    this.cars.push(car);

    return car;
  }

  async findCarByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find((car) => car.license_plate === license_plate);
    return car;
  }

  async listAvailableCars(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const cars = this.cars.filter(
      (car) =>
        car.available === true ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name)
    );

    return cars;
  }

  async findById(car_id: string): Promise<Car> {
    const car = this.cars.find((car) => car.id === car_id);
    return car;
  }
}

export { CarsRepositoryInMemory };
