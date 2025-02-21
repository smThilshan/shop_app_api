const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'cart.json'
);

// console.log("Cart path:", p);

module.exports = class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };

            if (err) {
                if (err.code === 'ENOENT') {
                    console.warn("cart.json not found. Creating a new one...");
                    fs.writeFileSync(p, JSON.stringify(cart, null, 2)); // Create the file
                } else {
                    console.error("Error reading cart.json:", err);
                    return;
                }
            } else {
                try {
                    if (fileContent.length > 0) {
                        cart = JSON.parse(fileContent);
                    }
                } catch (e) {
                    console.error("Invalid JSON in cart.json, resetting cart.");
                    cart = { products: [], totalPrice: 0 };
                }
            }

            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];

            if (existingProduct) {
                existingProduct.qty += 1;
            } else {
                cart.products.push({ id, qty: 1 });
            }

            cart.totalPrice += productPrice;

            fs.writeFile(p, JSON.stringify(cart, null, 2), err => {
                if (err) {
                    console.error("❌ Error writing to cart.json:", err);
                } else {
                    console.log("✅ Cart updated successfully!", cart);
                }
            });
        });
    }
};

