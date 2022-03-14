export interface OrderRepository {
  getAllOrders(): Promise<unknown[]>;
}

export const OrderRepositorySymbol = Symbol('OrderRepository');
