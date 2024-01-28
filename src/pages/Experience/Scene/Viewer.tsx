import { Component } from "react";
import "@babylonjs/core/Helpers/sceneHelpers";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import SceneComponent, { SceneEventArgs } from "./Scene";
import {
  Engine,
  Nullable,
  Scene,
  UniversalCamera,
  Vector3,
} from "@babylonjs/core";
import * as Utils from "./utils/FunctionLibrary";
import { Ball } from "./utils/Ball";
import InputManager from "./managers/InputManager";
import Goal from "./utils/Goal";

interface IViewerState {}

interface IViewerProps {}

export class Viewer extends Component<IViewerProps, IViewerState> {
  private canvas:
    | Nullable<HTMLCanvasElement | WebGLRenderingContext>
    | undefined;
  private engine: Engine | undefined;
  private scene: Scene | undefined;
  private camera: UniversalCamera | undefined;

  public inputManager: InputManager | undefined;

  constructor(props: IViewerProps | Readonly<IViewerProps>) {
    super(props);
    this.state = {};
  }

  onSceneMount = (e: SceneEventArgs) => {
    const { canvas, scene, engine } = e;
    this.canvas = canvas;
    this.engine = engine;
    this.scene = scene;

    this.prepareCamera();
    this.prepareLighting();

    this.inputManager = new InputManager(this.engine);

    this.setupEnvironment();

    document.addEventListener("keydown", function (zEvent) {
      if (zEvent.ctrlKey && zEvent.shiftKey) {
        scene.debugLayer.isVisible()
          ? scene.debugLayer.hide()
          : scene.debugLayer.show();
      }
    });

    engine.runRenderLoop(() => {
      if (scene) {
        scene.render();
      }
    });
  };

  prepareCamera = () => {
    this.camera = new UniversalCamera(
      "MainCamera",
      new Vector3(0, 0, -5),
      this.scene
    );
    this.camera.setTarget(Vector3.Zero());
    this.camera.attachControl(this.canvas, true);

    this.camera.speed = 0.2;

    this.camera.inputs.addMouseWheel();

    // this.scene!.createDefaultCamera(true);
    // const camera = this.scene!.activeCamera as ArcRotateCamera;
    // this.camera = camera;
    // this.camera.fov = 1;
    // this.camera.alpha = 1.57;
    // this.camera.beta = 1.3;
    // this.camera.radius = 10;
    // this.camera.minZ = 0;
    // // this.camera.panningSensibility = 0;
    // this.camera.inputs.remove(this.camera.inputs.attached.keyboard);
    // // this.camera.inputs.remove(this.camera.inputs.attached.mousewheel);
    // // //@ts-ignore
    // // this.camera.inputs.attached.pointers.buttons = [];

    // console.log(this.camera.inputs.attached);

    // camera.alpha += Math.PI;
    // this.camera.attachControl();
  };

  prepareLighting = () => {
    this.scene!.createDefaultLight();
  };

  setupEnvironment = async () => {
    Utils.CreateCourt(this.scene!);
    new Goal(this.scene!);
    new Ball(this.inputManager!, this.scene!);
  };

  render() {
    return (
      <SceneComponent
        id="studio"
        onSceneMount={this.onSceneMount}
        engineOptions={{
          useHighPrecisionMatrix: true,
          premultipliedAlpha: false,
          antialias: true,
          preserveDrawingBuffer: true,
          stencil: true,
        }}
      />
    );
  }
}

export default Viewer;
