import Sugar from '../models/sugarModel.js'

export const addSugar = async (req, res) => {
  const { fasting, random } = req.body;

  try {
    if (
      (fasting && typeof fasting !== Number) ||
      (random && typeof random !== Number)
    ) {
      return res
        .status(409)
        .json({ error: "sugar data must be given in postive integer form" });
    }
    const sugar = new Sugar({ user: req.userId, fasting, random });
    await sugar.save();
    res.status(200).json(sugar);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding sugar data", error: error.message });
  }
};

export const getSugar = async (req, res) => {
  try {
    const userId = req.userId;
    const sugar = await Sugar.findOne({ userId });

    if (!sugar)
      return res
        .status(401)
        .json({ message: "There is no diabetes data available for this user" });

    const { fasting, random } = sugar;

    if (fasting) {
      return res.status(200).json({ 'fasting': fasting });
    }
    if (random) {
      return res.status(200).json({'random': random });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "There is something wrong", error: error.message });
  }
};
