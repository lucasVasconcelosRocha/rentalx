import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<void>;
  findCarByLicensePlate(license_plate: string): Promise<Car>;
}

export { ICarsRepository };
