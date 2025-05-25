import Sugar from '../models/sugarModel.js'

export const addSugar = async (req, res) => {
  const { fasting, random } = req.body;

  try {
    // check if user is authenticated
    if (!req.userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    // validate required fields
    if (fasting === undefined || fasting === null) {
      return res.status(400).json({ error: "Fasting sugar value is required" });
    }
    if (random === undefined || random === null) {
      return res.status(400).json({ error: "Random sugar value is required" });
    }

    // validate fasting sugar
    if (typeof fasting !== 'number' || isNaN(fasting) || fasting < 0) {
      return res
        .status(400)
        .json({ error: "fasting sugar data must be given in postive number" });
    }
    // validate random sugar
    if (typeof(random) !== 'number' || !isNaN(random) || random < 0) {
      return res
        .status(400)
        .json({ error: "random sugar data must be given in postive number" });
    }
    // reasonable upper bounds for blood sugar values
    if (fasting > 500 || random > 500) {
      return res.status(400).json({ error: "Sugar values seems unusually high. Please verify the readings" });
    }
    const sugar = new Sugar({ user: req.userId, fasting, random });
    await sugar.save();
    res.status(201).json(sugar);    // 201 for resource creation
  } catch (error) {
    console.error('Error adding sugar data:', error);
    res
      .status(500)
      .json({ message: "Error adding sugar data", error: error.message });
  }
};

export const getSugar = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("Getting sugar data for userId:", userId);

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const sugar = await Sugar.find({ user:userId }).sort({createdAt: -1});

    console.log("Found sugar recordes:", sugar);
    console.log("Length of sugar recordes", sugar.length);

    if (sugar.length === 0) {
      return res
      .status(401)
      .json({ message: "There is no diabetes data available for this user" });
    }
    
    res.status(200).json({ sugar });

  } catch (error) {
    console.error('Error getting sugar data', error)
    return res
      .status(500)
      .json({ message: "There is something wrong", error: error.message });
  }
};

export const editSugar = async (req, res) => {
  const { fasting, random } = req.body;
  // req.params is an object containing all URL parameters, not just the id value
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ error: "sugar id is required" });
    }
    if (!req.userId) {
      return res.status(401).json({ error: "User is not authorized" });
    }
    const sugarRecord = await Sugar.findOne({ _id: id, user: req.userId });
    if (!sugarRecord) {
      return res.status(404).json({ error: "Sugar data is not found" });
    }
    if (fasting !== undefined) {
      if (
        (fasting && typeof fasting !== "number") ||
        !Number.isInteger(fasting) ||
        fasting <= 0
      ) {
        return res.status(400).json({
          error: "Fasting data must be given in postive integer form",
        });
      } else {
        sugarRecord.fasting = fasting;
      }
    }
    if (random !== undefined) {
      if (
        (random && typeof random !== "number") ||
        !Number.isInteger(random) ||
        random <= 0
      ) {
        return res.status(400).json({
          error: "Random data must be given in postive integer form",
        });
      } else {
        sugarRecord.random = random;
      }
    }
    await sugarRecord.save();
    return res
      .status(200)
      .json({
        message: "Sugar record has been updated successfully",
        data: sugarRecord,
      });
  } catch (error) {
    console.error("Error updating sugar record", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const deleteSugar = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.userId) {
      return res.status(404).json({error: 'User is not authorized'})
    }
    if (!id) {
      return res.status(404).json({ error: 'sugar data is not found' });
    }
    const sugarRecord = await Sugar.findOne({ _id: id, user: req.userId });
    console.log('sugar record',sugarRecord);
    if (!sugarRecord) {
      return res.status(404).json({ error: 'sugar data is not found' });
    }
    else {
      await Sugar.findByIdAndDelete(id);
      return res.status(200).json({ message: "sugar data has been deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting sugar record", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
