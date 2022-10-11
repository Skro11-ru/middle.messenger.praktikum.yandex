import { nanoid } from 'nanoid';
import { EventBus } from './EventBus';

class Block<Properties extends Record<string, any> = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  public id = nanoid(6);

  protected props: Properties;

  public children: Record<string, any>;

  private eventBus: () => EventBus;

  private _element: HTMLElement | null = null;

  public constructor(propertiesWithChildren: Properties) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(
      propertiesWithChildren,
    );

    this.children = children;
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;
    this.initChildren();
    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  private _getChildrenAndProps(childrenAndProperties: Properties): {
    props: Properties;
    children: Record<string, Block>;
  } {
    const properties: Record<string, any> = {};
    const children: Record<string, any> = {};

    Object.entries(childrenAndProperties).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        properties[key] = value;
      }
    });

    return { props: properties as Properties, children };
  }

  private _addEvents() {
    const { events = {} } = this.props as Properties & {
      events: Record<string, () => void>;
    };
    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _init() {
    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  private _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child) =>
      child.dispatchComponentDidMount(),
    );
  }

  private _componentDidUpdate(
    oldProperties: Properties,
    newProperties: Properties,
  ) {
    if (this.componentDidUpdate(oldProperties, newProperties)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(
    oldProperties?: Properties,
    newProperties?: Properties,
  ) {
    return true;
  }

  setProps = (nextProperties: Properties) => {
    if (!nextProperties) {
      return;
    }

    Object.assign(this.props, nextProperties);
  };

  get element() {
    return this._element;
  }

  private _render() {
    this.initChildren();

    const fragment = this.render();

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
  }

  protected initChildren() {}

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  protected compile(template: (context: any) => string, context: any) {
    const contextAndStubs = { ...context };

    Object.entries(this.children).forEach(
      ([key, child]: [string, Block<Properties>]) => {
        if (Array.isArray(child)) {
          contextAndStubs[key] = child.map(
            (item) => `<div data-id="${item.id}"></div>`,
          );
          return;
        }
        contextAndStubs[key] = `<div data-id="${child.id}"></div>`;
      },
    );

    const temporary = document.createElement('template');
    temporary.innerHTML = template(contextAndStubs).split(',').join('');

    Object.values(this.children).forEach((child: Block<Properties>) => {
      if (Array.isArray(child)) {
        // eslint-disable-next-line array-callback-return
        child.map((item) => {
          const stub = temporary.content.querySelector(
            `[data-id="${item.id}"]`,
          );
          if (!stub) return;

          stub.replaceWith(item.getContent()!);
        });
        return;
      }
      const stub = temporary.content.querySelector(
        `[data-id="${child.id}"]`,
      ) as HTMLElement;
      if (!stub) return;
      stub.replaceWith(child.getContent()!);
    });

    return temporary.content;
  }

  getContent(): HTMLElement {
    return <HTMLElement>this.element;
  }

  private _makePropsProxy(properties: any) {
    return new Proxy(properties, {
      get: (target, property) => {
        const value = target[property];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, property, value) => {
        target[property] = value;

        this.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty: () => {
        throw new Error('Нет доступа');
      },
    });
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}

export default Block;
