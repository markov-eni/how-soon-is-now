// car.ts
import { Engine } from "./engine";

export class Car {
  constructor(private engine: Engine) {}

  drive() {
    this.engine.start();
    console.log("Car is driving...");
  }
}
