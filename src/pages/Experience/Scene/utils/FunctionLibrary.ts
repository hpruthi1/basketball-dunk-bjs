import {
  CreateGround,
  PhysicsAggregate,
  PhysicsShapeType,
  Scene,
} from "@babylonjs/core";
import { GridMaterial } from "@babylonjs/materials";

export const CreateCourt = (scene: Scene) => {
  const ground = CreateGround("ground", { width: 1000, height: 1000 }, scene);
  ground.position.y = -1;

  const groundMaterial = new GridMaterial(`${ground.name}_material`);

  ground.material = groundMaterial;
  ground.receiveShadows = true;

  //static physics body mass = 0
  const groundAggregate = new PhysicsAggregate(ground, PhysicsShapeType.BOX);
  groundAggregate.body.setMassProperties({ mass: 0 });
  groundAggregate.material.friction = 0.1;
};
