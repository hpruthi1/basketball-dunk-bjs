export interface IInputReceiver {
  handleKeyboardEvent(code: string, pressed: boolean): void;

  inputReceiverInit(): void;
}
