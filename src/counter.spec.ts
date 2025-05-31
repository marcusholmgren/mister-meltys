import { describe, it, expect, vi } from 'vitest';
import { reducer, increaseCount, store} from './counter'

describe('Counter', function() {
    it('should have a default state', function () {
        const result = reducer();
        expect(result.count).toEqual(0)
    });

    it('should increase our count', function () {
        const action = increaseCount();
        const result = reducer(undefined, action);
        expect(result.count).toEqual(1);
    });

        it('should increase our count with a custom value', function () {
        const action = increaseCount(5);
        const result = reducer(undefined, action);
        expect(result.count).toEqual(5);
    })
});


describe('Sheep counting store', function () {
    it('should return the state', function () {
        const state = store.getState();
        expect(state.count).toEqual(0);
    });

    it('should dispatch actions and update the state', function () {
        const action = increaseCount();
        store.dispatch(action);
        const state = store.getState();
        expect(state.count).toEqual(1);
    });

    it('should call the subscribers when the store data changes', function () {
        const listener = vi.fn();
        store.subscribe(listener);
        const action = increaseCount();
        store.dispatch(action);
        expect(listener).toHaveBeenCalled()
    });

    it('should not call the subscriber when unsubscribed', function () {
        const listener = vi.fn();
        const unsubscribe = store.subscribe(listener);
        const action = increaseCount();
        unsubscribe();
        store.dispatch(action);
        expect(listener).not.toHaveBeenCalled()
    })
});