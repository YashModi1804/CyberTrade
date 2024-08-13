import Portfolio from '../models/portfolio.js';

const sellStock = async (req, res) => {
  try {
    const { username } = req.params;
    const { stockName, quantity, sellingPrice } = req.body;

    const portfolio = await Portfolio.findOne({ username });

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    const stock = portfolio.stocks.find(stock => stock.name === stockName);

    if (!stock) {
      return res.status(404).json({ message: 'Stock not found in portfolio' });
    }

    if (quantity > stock.quantity) {
      return res.status(400).json({ message: 'Insufficient quantity of stock' });
    }

    // Update stock quantity or remove it if all are sold
    stock.quantity -= quantity;
    if (stock.quantity === 0) {
      portfolio.stocks = portfolio.stocks.filter(s => s.name !== stockName);
    } else {
      stock.totalPrice = stock.quantity * stock.priceBought;
    }

    // Update the portfolio balance
    const totalEarnings = quantity * sellingPrice;
    portfolio.balance += totalEarnings;

    await portfolio.save();

    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export default sellStock;
