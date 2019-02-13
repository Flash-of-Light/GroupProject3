const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productImage: { type: String, required: true, get: v => `${cartSchema}${v}` }
});

const Cart = mongoose.model("Cart", cartSchema);

// const User = mongoose.model('User', userSchema);
const doc = new Cart({ name: 'Val', picture: '/123.png' });
// doc.picture; // 'https://s3.amazonaws.com/mybucket/123.png'
// doc.toObject({ getters: false }).picture; // '123.png'

module.exports = Cart;