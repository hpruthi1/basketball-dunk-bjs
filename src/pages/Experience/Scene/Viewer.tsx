import { Component, useContext } from "react";
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
import Player from "./player/Player";
import GameManager from "./managers/GameManager";
import { experienceConext } from "../../../context/Context";

interface IViewerState {}

interface IViewerProps {
  experienceContextProp: unknown;
}

const ViewerFC = (props) => {
  const experienceContextRef = useContext(experienceConext);
  return (
    <Viewer
      ref={props.viewerRef}
      experienceContextProp={experienceContextRef}
    />
  );
};

class Viewer extends Component<IViewerProps, IViewerState> {
  private canvas:
    | Nullable<HTMLCanvasElement | WebGLRenderingContext>
    | undefined;
  private engine: Engine | undefined;
  private scene: Scene | undefined;
  private camera: UniversalCamera | undefined;

  public inputManager: InputManager | undefined;
  private ball: Ball | undefined;
  public player: Player | undefined;

  public gameManager: GameManager | undefined;

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
  };

  prepareLighting = () => {
    this.scene!.createDefaultLight();
  };

  setupEnvironment = async () => {
    Utils.CreateCourt(this.scene!);
    new Goal(this.scene!);
    this.ball = new Ball(this.scene!);
    this.player = new Player(this.inputManager!, this.ball, this.scene!);
    this.gameManager = new GameManager(this.player);
    //@ts-ignore
    this.props.experienceContext?.setisLoading(false);
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

export default ViewerFC;
