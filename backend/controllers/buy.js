import Portfolio from '../models/portfolio.js';

const buyStock = async (req, res) => {
  try {
    const { username } = req.params;
    const { stockName, quantity, priceBought } = req.body;

    const portfolio = await Portfolio.findOne({ username });

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    const totalCost = quantity * priceBought;

    if (totalCost > portfolio.balance) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    const stock = portfolio.stocks.find(stock => stock.name === stockName);

    if (stock) {
      // Modify existing stock
      stock.quantity += quantity;
      stock.priceBought = priceBought;
      stock.totalPrice = stock.quantity * stock.priceBought;
    } else {
      // Add new stock
      portfolio.stocks.push({
        name: stockName,
        quantity,
        priceBought,
        totalPrice: quantity * priceBought
      });
    }

    portfolio.balance -= totalCost;
    await portfolio.save();

    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export default buyStock;
