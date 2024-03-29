import { Component, LegacyRef, useContext } from "react";
import "@babylonjs/core/Helpers/sceneHelpers";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import SceneComponent, { SceneEventArgs } from "./Scene";
import {
  Engine,
  FreeCamera,
  HavokPlugin,
  Nullable,
  Scene,
  Sound,
  Vector3,
} from "@babylonjs/core";
import * as Utils from "./utils/FunctionLibrary";
import { Ball } from "./utils/Ball";
import InputManager from "./managers/InputManager";
import Goal from "./utils/Goal";
import Player from "./player/Player";
import GameManager from "./managers/GameManager";
import {
  IExperienceContextType,
  experienceContext,
} from "../../../context/Context";
import SfxSystem from "./systems/sound-effects-system";
import { initializePhysicsEngine } from "./systems/physics-system";

interface IViewerState {}

interface IViewerProps {
  experienceContextProp: IExperienceContextType;
}

const ViewerFC = (props: { viewerRef: LegacyRef<Viewer> | undefined }) => {
  const experienceContextRef = useContext(experienceContext);
  return (
    <Viewer
      ref={props.viewerRef}
      experienceContextProp={experienceContextRef}
    />
  );
};

export class Viewer extends Component<IViewerProps, IViewerState> {
  private canvas:
    | Nullable<HTMLCanvasElement | WebGLRenderingContext>
    | undefined;
  private engine: Engine | undefined;
  public scene: Scene | undefined;
  // private camera: ArcRotateCamera | undefined;
  // private camera: UniversalCamera | undefined;
  private camera: FreeCamera | undefined;

  public inputManager: InputManager | undefined;
  public ball: Ball | undefined;
  public player: Player | undefined;

  private ambientSound: Sound | undefined;

  public havokPlugin: HavokPlugin | undefined;

  public gameManager: GameManager | undefined;

  public sfxSystem: SfxSystem | undefined;

  constructor(props: IViewerProps | Readonly<IViewerProps>) {
    super(props);
    this.state = {};
  }

  onSceneMount = async (e: SceneEventArgs) => {
    const { canvas, scene, engine } = e;
    this.canvas = canvas;
    this.engine = engine;
    this.scene = scene;

    this.prepareCamera();
    this.prepareLighting();

    this.havokPlugin = await initializePhysicsEngine(this.scene);

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

  componentWillUnmount(): void {
    this.scene?.dispose();
    this.engine?.dispose();
  }

  prepareCamera = () => {
    this.camera = new FreeCamera(
      "MainCamera",
      new Vector3(0, 5, -5),
      this.scene,
      true
    );
    this.camera.setTarget(new Vector3(0, 0, 180));
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
    // this.camera.panningSensibility = 0;
    // this.camera.inputs.remove(this.camera.inputs.attached.keyboard);
    // this.camera.inputs.remove(this.camera.inputs.attached.mousewheel);

    // camera.alpha += Math.PI;
    // this.camera.attachControl();
  };

  prepareLighting = () => {
    this.scene!.createDefaultLight();
  };

  setupEnvironment = async () => {
    Utils.CreateCourt(this.scene!);
    new Goal(this.scene!);
    this.ball = new Ball(this.scene!);
    this.player = new Player(this);
    this.sfxSystem = SfxSystem.getSfxSystem();
    await this.sfxSystem.loadSounds();
    this.gameManager = new GameManager(this.havokPlugin!, this.player);
    this.loadAmbientSound();
    this.props.experienceContextProp?.setisLoading(false);
  };

  loadAmbientSound() {
    this.ambientSound = new Sound(
      "ambient-sound",
      "/Sounds/ambient-music.mp3",
      this.scene,
      null,
      {
        volume: 0.1,
        loop: true,
        autoplay: true,
      }
    );
  }

  toggleAmbientSound() {
    const currentVolume = this.ambientSound?.getVolume();
    currentVolume! > 0
      ? this.ambientSound?.setVolume(0)
      : this.ambientSound?.setVolume(1);

    this.props.experienceContextProp.setmusicPlaying((value) => !value);
  }

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
