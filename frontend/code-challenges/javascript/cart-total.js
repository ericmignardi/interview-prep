// ─────────────────────────────────────────────────────────────────────────────
// Challenge 1 — Cart total
//
// Write `cartTotal(cart)` that returns the total cost of everything in the cart:
// each item's  price × qty,  all summed together.
//
// Requirements:
//   - Use reduce (the whole point — drill the accumulator).
//   - Give reduce a proper initial value.
//
// Run it:  node cart-total.js
// ─────────────────────────────────────────────────────────────────────────────

const cart = [
  { name: "Strings", price: 12, qty: 2 },
  { name: "Picks", price: 5, qty: 3 },
  { name: "Capo", price: 20, qty: 1 },
];

// TODO: implement using reduce
function cartTotal(cart) {
  return cart.reduce((acc, curr) => {
    return acc + curr.price * curr.qty;
  }, 0);
}

// ── tests ──────────────────────────────────────────────────────────────────
console.log(cartTotal(cart)); // expected: 59
console.log(cartTotal([])); // expected: 0   (empty cart — why the initial value matters)
console.log(cartTotal([{ name: "Cable", price: 15, qty: 1 }])); // expected: 15

// ─────────────────────────────────────────────────────────────────────────────
// STRETCH A — applyDiscount(cart, pct)
//
// Return a NEW cart where each item's `price` is reduced by `pct` percent.
// `qty` and `name` stay the same. Must NOT mutate the original `cart`.
//   - Use map.
//   - Don't reassign item objects in place — build new ones (spread).
// ─────────────────────────────────────────────────────────────────────────────

// TODO: implement using map
function applyDiscount(cart, pct) {
  return cart.map((item) => {
    const discountedPrice = item.price * (1 - pct / 100);
    return { ...item, price: discountedPrice };
  });
}

console.log("--- applyDiscount ---");
console.log(applyDiscount(cart, 10));
// expected prices: Strings 10.8, Picks 4.5, Capo 18   (qty unchanged)
console.log(cart[0].price); // expected: 12   ← proves you did NOT mutate the original

// ─────────────────────────────────────────────────────────────────────────────
// STRETCH B — groupByName(cart)
//
// Return an object keyed by each item's `name`, with the item as the value:
//   { Strings: { name: 'Strings', price: 12, qty: 2 }, Picks: {...}, Capo: {...} }
//   - Use reduce, accumulating INTO an object (start with {}).
// ─────────────────────────────────────────────────────────────────────────────

// TODO: implement using reduce (accumulator is an object)
function groupByName(cart) {
  return cart.reduce((acc, curr) => {
    acc[curr.name] = curr;
    return acc;
  }, {});
}

console.log("--- groupByName ---");
console.log(groupByName(cart));
// expected: { Strings: {...}, Picks: {...}, Capo: {...} }
console.log(groupByName(cart).Capo.price); // expected: 20
