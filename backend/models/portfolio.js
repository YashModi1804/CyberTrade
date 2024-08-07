// models/Portfolio.js
import mongoose from 'mongoose'

const portfolioSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stocks: [
    {
      stock: { type: mongoose.Schema.Types.ObjectId, ref: 'Stock', required: true },
      quantity: { type: Number, required: true },
      boughtPrice: { type: Number, required: true }, // Price at which the stock was bought
      currentPrice: { type: Number, required: true }, // Current price of the stock
      overallProfitLoss: { type: Number, required: true }, // Overall profit/loss for this stock
      todaysProfitLoss: { type: Number, required: true }, // Today's profit/loss for this stock
    },
  ],
}, { timestamps: true });

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;
