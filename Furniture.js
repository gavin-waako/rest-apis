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
  //   res.json(furniture_database);
  let color_param = req.query.color;
  let type_param = req.query.type;

  let results = furniture_database.filter(
    (piece) =>
      (color_param == undefined || color_param == piece.color) &&
      (type_param == undefined || type_param == piece.type),
  );

  res.json(results);
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

furniture_routes.post("/Furniture", (req, res) => {
  let body = req.body;

  if (
    req.body.color !== undefined ||
    req.body.type !== undefined ||
    req.body.material !== undefined
  ) {
    let new_furniture = new Furniture(
      req.body.type,
      req.body.color,
      req.body.material,
    );
    furniture_database.push(new_furniture);
    res.status(201).json(new_furniture);
    return;
  } else {
    res
      .status(400)
      .json(
        "Unable to create furniture. Missing required fields: type, color, material",
      );
  }

  let new_furniture = new Furniture(body.type, body.color, body.material);

  furniture_database.push(new_furniture);

  res.status(201).json(new_furniture);
});

export const router = furniture_routes;
