const db = require("../config/connection");
const { User, Exercise } = require("../models");

db.once("open", async () => {
  try {
    await Exercise.deleteMany({});
    await User.deleteMany({});

    const user = await User.create({
      username: "test",
      password: "test",
    });

    console.log("User seeded");

    await Exercise.create({
      name: "Bench Press",
      type: "Resistance",
      weight: 185,
      sets: 4,
      reps: 8,
      duration: 30,
      distance: 0,
      user: user._id,
    });

    await Exercise.create({
      name: "Treadmill",
      type: "Cardio",
      weight: 0,
      sets: 0,
      reps: 0,
      duration: 30,
      distance: 2,
      user: user._id,
    });

    console.log("Exercise seeded");

    process.exit(0);
  } catch (err) {
    throw err;
  }
}
);