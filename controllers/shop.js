const e = require('express');
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products',
 
    });
  });
};

exports.getProduct = (req, res,  next) => {
  prodId = req.params.productId;
  // console.log("Requested Product ID:", prodId); 
  Product.findById(prodId, product => {
    if (!product) {
      // console.error("Product not found for ID:", prodId);
      return res.status(404).send('Product not found');
    }
    console.log("Found Product:", product); 
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products',
    });
  });

};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart',
  });
};

// exports.postCart = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.findById(prodId, product => {
//     Cart.addProduct(prodId, product.price);
//   });
//   res.redirect('/cart');
// };

exports.postCart = (req, res, next) => {
  console.log("✅ postCart function called!");
  const prodId = req.body.productId;
  console.log("Received Product ID:", prodId);
  Product.findById(prodId, product => {
      if (!product) {
          console.error("❌ Product not found:", prodId);
          return res.redirect('/products');
      }
      Cart.addProduct(prodId, product.price);
      console.log("✅ Product added to cart successfully!");
      res.redirect('/cart');
  });
};


exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders',
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
  });
};

