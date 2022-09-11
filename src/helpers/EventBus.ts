export class EventBus {
  private readonly listeners: Record<string, Array<() => void>> = {};

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event, callback) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  emit(event, ...arguments_) {
    if (!this.listeners[event]) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw new Event(`Нет события: ${event}`);
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const listener of this.listeners[event]) {
      listener(...arguments_);
    }
  }
}
