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

furniture_routes.get("/Furniture", (req, res) => {
  res.json(furniture_database);
});

furniture_routes.get("/Furniture/:id", (req, res) => {
  let identifier = req.params.id;

  let match = furniture_database.find((piece) => piece.id == identifier);

  if (match !== undefined) {
    res.json(match);
  } else {
    res
      .status(404)
      .json("Cannot find a piece of furniture with ID: " + identifier);
  }
});

export const router = furniture_routes;
