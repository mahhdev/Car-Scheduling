import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
	cars: Car[] = [];
	async create({
		name,
		description,
		daily_rate,
		license_plate,
		fine_amount,
		brand,
		category_id,
		specifications,
		id,
	}: ICreateCarDTO): Promise<Car> {
		const car = new Car();

		Object.assign(car, {
			name,
			description,
			daily_rate,
			license_plate,
			fine_amount,
			brand,
			category_id,
			specifications,
			id,
		});

		this.cars.push(car);

		return car;
	}

	async findByLicensePlate(licensePlate: string): Promise<Car> {
		return this.cars.find((car) => car.license_plate === licensePlate);
	}

	async findAvailable(name?: string, brand?: string, category_id?: string): Promise<Car[]> {
		let all = this.cars.filter((car) => car.available === true);
		if (name || brand || category_id) {
			all = all.filter((car) => {
				if (car.name === name || car.brand === brand || car.category_id === category_id) {
					return car;
				}
			});
		}

		return all;
	}

	async findById(id: string): Promise<Car> {
		return this.cars.find((car) => car.id === id);
	}
}

export { CarsRepositoryInMemory };
