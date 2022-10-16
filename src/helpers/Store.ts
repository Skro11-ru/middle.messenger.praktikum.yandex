// eslint-disable-next-line max-classes-per-file
import { EventBus } from './EventBus';
import { set } from './set';
import Block from './block';

export enum StoreEvents {
  Updated = 'updated',
}

export class Store extends EventBus {
  private state: any = {};

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);
    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

export function withStore(mapStateToProperties: (state: any) => any) {
  return function wrap(Component: typeof Block) {
    let previousState: any;

    return class WithStore extends Component {
      constructor(properties: any) {
        previousState = mapStateToProperties(store.getState());

        super({ ...properties, ...previousState });

        store.on(StoreEvents.Updated, () => {
          const stateProperties = mapStateToProperties(store.getState());

          previousState = stateProperties;

          this.setProps({ ...stateProperties });
        });
      }
    };
  };
}

export default store;
