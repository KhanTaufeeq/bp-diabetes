import Sugar from '../models/sugarModel.js'

export const addSugar = async (req, res) => {
  const { fasting, random } = req.body;

  console.log(fasting);
  console.log(typeof fasting);

  try {
    if (typeof(fasting) !== 'number' || !Number.isInteger(fasting) || fasting < 0) {
      return res
        .status(409)
        .json({ error: "fasting sugar data must be given in postive integer form" });
    }
    if (typeof(random) !== 'number' || !Number.isInteger(random) || random < 0) {
      return res
        .status(409)
        .json({ error: "random sugar data must be given in postive integer form" });
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
    const user = req.userId;
    console.log(user);
    const sugar = await Sugar.find({ user }).sort({createdAt: -1});

    console.log(sugar);

    if (!sugar)
      return res
        .status(401)
        .json({ message: "There is no diabetes data available for this user" });
    
    res.status(200).json({ sugar });

    // const { fasting, random } = sugar;

    // if (fasting) {
    //   return res.status(200).json({ 'fasting': fasting });
    // }
    // if (random) {
    //   return res.status(200).json({'random': random });
    // }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "There is something wrong", error: error.message });
  }
};
