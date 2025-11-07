// index.ts
import "reflect-metadata";
import { container } from "./container";
import { Car } from "./car";
import { Engine } from "./engine";

container.register(Engine, Engine);
container.register(Car, Car);

const car = container.resolve(Car);
car.drive();
