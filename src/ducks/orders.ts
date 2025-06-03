import { Action, Dispatch } from 'redux';
import { actions as freezerActions } from './freezer'; // Corrected import path
import { FreezerActionTypes } from './freezer'; // Assuming this exports DeductStockAction or similar

// Placeholder for RootState - this would typically be defined in a central store configuration
// and import OrdersState and FreezerState etc.
export interface RootState {
  orders: OrdersState;
  // In a real app, you'd also have freezer: FreezerState;
  // For now, we only need orders for getState() in the thunk.
}

// Placeholder for AppThunk type
export type AppThunk<ReturnType = void> = (
  dispatch: Dispatch<OrderActionTypes | FreezerActionTypes>, // Include FreezerActionTypes
  getState: () => RootState
) => ReturnType;

export const types = {
    PLACE_ORDER: 'PLACE_ORDER' as const,
    FULFILL_ORDER: 'FULFILL_ORDER' as const,
    PAY_FOR_ORDER: 'PAY_FOR_ORDER' as const,
    CANCEL_ORDER: 'CANCEL_ORDER' as const
};

export interface ScoopDetail {
  [flavorName: string]: number;
}

export interface Order {
  customerName: string;
  createdAt: number;
  cone: boolean;
  scoops: ScoopDetail;
  status: string; // e.g., 'pending', 'fulfilled', 'paid'
}

export type OrdersState = Order[];

const DEFAULT_STATE: OrdersState = [];

// Action Interfaces
export interface PlaceOrderAction extends Action {
  type: typeof types.PLACE_ORDER;
  payload: {
    customerName: string;
    createdAt: number;
    cone: boolean;
    scoops: ScoopDetail;
  };
}

export interface FulfillOrderAction extends Action {
  type: typeof types.FULFILL_ORDER;
  payload: number; // Order ID/index
}

export interface PayForOrderAction extends Action {
  type: typeof types.PAY_FOR_ORDER;
  payload: number; // Order ID/index
}

export interface CancelOrderAction extends Action {
  type: typeof types.CANCEL_ORDER;
  payload: number; // Order ID/index
}

export type OrderActionTypes =
  | PlaceOrderAction
  | FulfillOrderAction
  | PayForOrderAction
  | CancelOrderAction;

// Note: FreezerActionTypes are not directly handled by *this* reducer,
// but the AppThunk needs to be able to dispatch them.

export function reducer(state: OrdersState = DEFAULT_STATE, action: OrderActionTypes | Action): OrdersState {
    switch (action.type) {
        case types.PLACE_ORDER:
            return [
                ...state,
                {
                    ...(action as PlaceOrderAction).payload,
                    status: 'pending'
                }
            ];
        case types.FULFILL_ORDER:
            return state.map((order: Order, index: number) => {
                if (index === (action as FulfillOrderAction).payload) {
                    return {
                        ...order,
                        status: 'fulfilled'
                    };
                }
                return order;
            });
        case types.PAY_FOR_ORDER:
            return state.map((order: Order, index: number) => {
                if (index === (action as PayForOrderAction).payload) {
                    return {
                        ...order,
                        status: 'paid'
                    };
                }
                return order;
            });
        case types.CANCEL_ORDER:
            return state.filter((order: Order, index: number) => {
                return index !== (action as CancelOrderAction).payload;
            });
        default:
            return state;
    }
}

export interface PlaceOrderParams {
    customerName: string;
    createdAt?: number;
    cone?: boolean;
    scoops: ScoopDetail;
}

export const actions = {
    placeOrder({customerName, createdAt = Date.now(), cone = true, scoops}: PlaceOrderParams): PlaceOrderAction {
        return {
            type: types.PLACE_ORDER,
            payload: {customerName, createdAt, cone, scoops}
        };
    },
    fulfillOrder(id: number): AppThunk {
        return (dispatch, getState) => {
            const { orders } = getState();
            const order = orders[id];

            if (order && order.status === 'pending') {
                // Dispatch the action to mark the order as fulfilled
                dispatch({
                    type: types.FULFILL_ORDER,
                    payload: id
                } as FulfillOrderAction); // Cast to FulfillOrderAction

                // After fulfilling, dispatch actions to deduct stock for each item
                Object.entries(order.scoops).forEach(([flavor, quantity]) => {
                    if (quantity > 0) { // Ensure quantity is positive
                        dispatch(freezerActions.deductStock(flavor, quantity));
                    }
                });
            }
            // Optionally: handle cases where order is not found or not pending
            // For example, dispatch an error action or log a warning.
        };
    },
    payForOrder(id: number): PayForOrderAction {
        return {
            type: types.PAY_FOR_ORDER,
            payload: id
        };
    },
    cancelOrder(id: number): CancelOrderAction {
        return {
            type: types.CANCEL_ORDER,
            payload: id
        };
    }
};
