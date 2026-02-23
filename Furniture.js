import { Router } from "express";

export class Furniture {
  id;
  type;
  color;
  material;

  static next_id = 1;

  constructor(given_type, given_color, given_material) {
    this.color = given_color;
    this.type = given_type;
    this.material = given_material;

    this.id = Furniture.next_id;
    Furniture.next_id++;
  }

  isSeating() {
    return this.type == "couch" || this.type == "recliner";
  }
}

let furniture_database = [
  new Furniture("couch", "brown", "leather"),
  new Furniture("recliner", "blue", "cotton"),
  new Furniture("table", "brown", "wood"),
  new Furniture("chair", "silver", "metal"),
];

let furniture_routes = Router();

export const router = furniture_routes;
