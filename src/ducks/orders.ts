import { Action } from 'redux';

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
    fulfillOrder(id: number): FulfillOrderAction {
        return {
            type: types.FULFILL_ORDER,
            payload: id
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
