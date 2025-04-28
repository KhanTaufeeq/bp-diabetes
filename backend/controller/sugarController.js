import Sugar from "../models/sugarModel";
import User from "../models/userModel";

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

  const userId = req.userId;
  const sugar = await Sugar.findOne({ userId });

  const { fasting, random } = sugar;

  if (fasting || random) {
    return { fasting, random };
  } else {
    return res.status(401).json({ error: "there is no diabetes data yet!" });
  }
};
