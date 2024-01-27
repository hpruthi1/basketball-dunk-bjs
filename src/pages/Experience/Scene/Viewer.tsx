import { Component } from "react";
import "@babylonjs/core/Helpers/sceneHelpers";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import SceneComponent, { SceneEventArgs } from "./Scene";
import { ArcRotateCamera, Engine, Nullable, Scene } from "@babylonjs/core";

interface IViewerState {}

interface IViewerProps {}

export class Viewer extends Component<IViewerProps, IViewerState> {
  private canvas:
    | Nullable<HTMLCanvasElement | WebGLRenderingContext>
    | undefined;
  private engine: Engine | undefined;
  private scene: Scene | undefined;
  private camera: ArcRotateCamera | undefined;

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
    this.scene!.createDefaultCamera(true);
    const camera = this.scene!.activeCamera as ArcRotateCamera;
    this.camera = camera;
    this.camera.fov = 1;
    this.camera.alpha = 1.57;
    this.camera.beta = 1.3;
    this.camera.radius = 5;
    this.camera.minZ = 0;
    this.camera.inputs.remove(this.camera.inputs.attached.keyboard);

    camera.alpha += Math.PI;
    this.camera.attachControl();
  };

  prepareLighting = () => {
    this.scene!.createDefaultLight();
  };

  setupEnvironment = async () => {};

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
