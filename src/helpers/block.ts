import { nanoid } from 'nanoid';
import { EventBus } from './EventBus';

class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  public id = nanoid(12);

  protected props: any;

  public children: Record<string, Block>;

  private eventBus: () => EventBus;

  private _element: HTMLElement | null = null;

  private _meta: { props: any };

  /** JSDoc
   *
   * @returns {void}
   * @param propertiesWithChildren
   */
  constructor(propertiesWithChildren: any = {}) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(
      propertiesWithChildren,
    );

    this._meta = {
      props,
    };

    this.children = children;
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildrenAndProps(childrenAndProperties: any) {
    const properties: Record<string, any> = {};
    const children: Record<string, Block> = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(childrenAndProperties)) {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        properties[key] = value;
      }
    }

    return { props: properties, children };
  }

  private _addEvents() {
    const { events = {} } = this.props as {
      events: Record<string, () => void>;
    };

    // eslint-disable-next-line no-restricted-syntax
    for (const eventName of Object.keys(events)) {
      this._element?.addEventListener(eventName, events[eventName]);
    }
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    // @ts-ignore
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  private _init() {
    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    // eslint-disable-next-line no-restricted-syntax
    for (const child of Object.values(this.children))
      child.dispatchComponentDidMount();
  }

  private _componentDidUpdate(oldProperties: any, newProperties: any) {
    if (this.componentDidUpdate(oldProperties, newProperties)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProperties: any, newProperties: any) {
    return true;
  }

  setProps = (nextProperties: any) => {
    if (!nextProperties) {
      return;
    }

    Object.assign(this.props, nextProperties);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const fragment = this.render();

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;
    this._addEvents();
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  protected compile(template: (context: any) => string, context: any) {
    const contextAndStubs = { ...context };

    // eslint-disable-next-line no-restricted-syntax
    for (const [name, component] of Object.entries(this.children)) {
      contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
    }

    const html = template(contextAndStubs);

    const temporary = document.createElement('template');

    temporary.innerHTML = html;

    // eslint-disable-next-line @typescript-eslint/naming-convention,
    // no-restricted-syntax,@typescript-eslint/no-unused-vars
    // eslint-disable-next-line max-len
    // eslint-disable-next-line no-restricted-syntax,@typescript-eslint/naming-convention,@typescript-eslint/no-unused-vars
    for (const [_, component] of Object.entries(this.children)) {
      const stub = temporary.content.querySelector(
        `[data-id="${component.id}"]`,
      );

      if (!stub) {
        // eslint-disable-next-line no-continue
        continue;
      }

      // @ts-ignore
      component.getContent()?.append(...stub.childNodes);

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      stub.replaceWith(component.getContent()!);
    }

    return temporary.content;
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(properties: any) {
    // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
    // eslint-disable-next-line @typescript-eslint/no-this-alias,unicorn/no-this-assignment
    const self = this;
    return new Proxy(properties, {
      get(target, property) {
        const value = target[property];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, property, value) {
        const oldTarget = { ...target };

        // eslint-disable-next-line no-param-reassign
        target[property] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  // show() {
  //   this.getContent().style.display = 'block';
  // }

  // hide() {
  //   this.getContent()!.style.display = 'none';
  // }
}

export default Block;
