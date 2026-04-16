let order = [
  { itemName: "Hot cakes", quantity: 1, unitPricePence: 232 },
  { itemName: "Apple Pie", quantity: 2, unitPricePence: 139 },
  { itemName: "Egg McMuffin", quantity: 1, unitPricePence: 280 },
  { itemName: "Sausage McMuffin", quantity: 1, unitPricePence: 300 },
  { itemName: "Hot Coffee", quantity: 2, unitPricePence: 100 },
  { itemName: "Hash Brown", quantity: 4, unitPricePence: 40 },
];

const order = [
  { itemName: "Hot Cakes", quantity: 1, unitPricePence: 232 },
  { itemName: "Apple Pie", quantity: 2, unitPricePence: 139 },
  { itemName: "Egg McMuffin", quantity: 1, unitPricePence: 280 },
  { itemName: "Sausage McMuffin", quantity: 1, unitPricePence: 300 },
  { itemName: "Hot Coffee", quantity: 2, unitPricePence: 100 },
  { itemName: "Hash Brown", quantity: 4, unitPricePence: 40 },
];

function printReceipt(order) {
  let total = 0;

  console.log("QTY     ITEM                TOTAL");

  order.forEach(({ itemName, quantity, unitPricePence }) => {
    const lineTotal = quantity * unitPricePence;
    total += lineTotal;

    const price = (lineTotal / 100).toFixed(2);

    console.log(
      `${quantity.toString().padEnd(8)}${itemName.padEnd(20)}${price}`
    );
  });

  console.log("\nTotal: " + (total / 100).toFixed(2));
}

printReceipt(order);
