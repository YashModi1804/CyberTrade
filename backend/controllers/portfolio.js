import Portfolio from '../models/portfolio.js';

const getPortfolio = async (req, res) => {
  try {
    const { username } = req.params;
    const portfolio = await Portfolio.findOne({ username });

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export default getPortfolio;
