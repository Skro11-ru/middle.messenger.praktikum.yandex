export class EventBus {
  private readonly listeners: Record<string, Array<() => void>> = {};

  on(event: any, callback: any) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: any, callback: any) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  emit(event: any, ...arguments_: any) {
    if (!this.listeners[event]) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      return;
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const listener of this.listeners[event]) {
      // @ts-ignore
      listener(...arguments_);
    }
  }
}
