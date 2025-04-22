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
    const sugar = new Sugar({ userId: req.user._id, fasting, random });
    await sugar.save();
    res.status(200).json(sugar);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding sugar data", error: error.message });
  }
};

export const getSugar = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token is required!" });
  }

  const userId = req.user._id;
  const user = await User.findOne({ userId });

  const { fasting, random } = user;

  if (fasting && random) {
    return { fasting, random };
  } else {
    return res.status(401).json({ error: "there is no sugar data!" });
  }
};
