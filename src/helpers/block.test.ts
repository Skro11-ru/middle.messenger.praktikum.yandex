import proxyquire from 'proxyquire';
import { expect } from 'chai';
import sinon from 'sinon';
import type BlockType from './block';

const eventBusMock = {
  on: sinon.fake(),
  off: sinon.fake(),
  emit: sinon.fake(),
};

const { default: Block } = proxyquire('./Block', {
  './EventBus': {
    EventBus: class {
      emit = eventBusMock.emit;

      on = eventBusMock.on;

      off = eventBusMock.off;
    },
  },
}) as { default: typeof BlockType };

describe('Block', () => {
  class ComponentMock extends Block {}

  it('should fire init event on initialization', () => {
    // eslint-disable-next-line no-new
    new ComponentMock({});

    expect(eventBusMock.emit.calledWith('init')).to.eq(true);
  });
});
