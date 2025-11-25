# Product Specifications: E-Shop Checkout

## Discount Codes
- **SAVE15**: Applies a 15% discount to the cart subtotal.
- **WELCOME10**: Applies a 10% discount (not yet implemented in HTML, testing for grounding).
- Invalid codes should show an error message.

## Shipping
- **Standard Shipping**: Free ($0). Delivery in 5-7 business days.
- **Express Shipping**: Costs $10 flat rate. Delivery in 2 business days.

## Payment
- Supported methods: Credit Card, PayPal.
- Default selection should be Credit Card.

## Cart Logic
- Users can add items.
- Total price must be recalculated when:
  - An item is added.
  - Shipping method changes.
  - Discount code is applied.
