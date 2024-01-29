import {
  DeviceSourceManager,
  DeviceType,
  Engine,
  IKeyboardEvent,
} from "@babylonjs/core";
import { IInputReceiver } from "../interfaces/IInputReceiver";

class InputManager {
  private _deviceSourceManager: DeviceSourceManager;

  public inputReceiver: IInputReceiver | undefined;

  constructor(engine: Engine) {
    this._deviceSourceManager = new DeviceSourceManager(engine);

    this.handleOnDeviceConnected();
    this.handleOnDeviceDisconnected();
  }

  private handleOnDeviceConnected() {
    this._deviceSourceManager.onDeviceConnectedObservable.add((device) => {
      switch (device.deviceType) {
        case DeviceType.Keyboard:
          console.log(
            "Connection Established to: " + DeviceType[device.deviceType]
          );

          device.onInputChangedObservable.add((keyboardEvent) => {
            keyboardEvent.type === "keydown" && this.onKeyDown(keyboardEvent);
          });

          break;

        default:
          break;
      }
    });
  }

  private handleOnDeviceDisconnected() {
    this._deviceSourceManager.onDeviceDisconnectedObservable.add((device) => {
      console.log(`Lost connection to ${DeviceType[device.deviceType]}`);
    });
  }

  private onKeyDown(keyboardEvent: IKeyboardEvent) {
    if (this.inputReceiver !== undefined) {
      //@ts-ignore
      if (keyboardEvent.repeat) {
        return;
      }
      this.inputReceiver.handleKeyboardEvent(keyboardEvent.code, true);
    }
  }

  public setInputReceiver(receiver: IInputReceiver) {
    this.inputReceiver = receiver;
    this.inputReceiver.inputReceiverInit();
  }
}

export default InputManager;
