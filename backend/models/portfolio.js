import mongoose from 'mongoose'
const PortfolioSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  balance: { type: Number, required: true, default: 0 },
  stocks: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      priceBought: { type: Number, required: true },
      totalPrice: {
        type: Number,
        required: true,
        default: function () {
          return this.quantity * this.priceBought;
        },
      },
    },
  ],
});

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);

export default Portfolio;
