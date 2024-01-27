import { Scene } from "@babylonjs/core/scene";
import HavokPhysics from "@babylonjs/havok";
import { HavokPlugin } from "@babylonjs/core/Physics/v2/Plugins/havokPlugin";

export const initializePhysicsEngine = async (scene: Scene) => {
  const havokInstance = await HavokPhysics();
  const havokPlugin = new HavokPlugin(true, havokInstance);
  scene.enablePhysics(undefined, havokPlugin);
};
