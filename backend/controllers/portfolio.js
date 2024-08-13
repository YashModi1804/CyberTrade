import Portfolio from '../models/portfolio.js';

const getPortfolio = async (req, res) => {
  try {
    const { username } = req.params;
    let portfolio = await Portfolio.findOne({ username });

    if (!portfolio) {
      portfolio = new Portfolio({
        username,
        balance: 100000,
        stocks: []
      });
      await portfolio.save();
    }

    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export default getPortfolio;
