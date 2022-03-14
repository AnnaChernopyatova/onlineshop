export class PurchaseEntity {
  constructor(
    readonly purchaseId: number,
    readonly orderId: number,
    readonly productId: number,
    readonly productPrice: number,
  ) {}
}
