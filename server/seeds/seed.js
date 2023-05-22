const db = require('../config/connection');
const { User, Exercise, Profile } = require('../models');

db.once('open', async () => {
  try {
    await Exercise.deleteMany({});
    await User.deleteMany({});

    const users = await User.create([
      {
        password: 'password1',
        email: 'johndoe@example.com',
      },
      {
        password: 'password2',
        email: 'janesmith@example.com',
      },
      {
        password: 'password3',
        email: 'mikejohnson@example.com',
      },
    ]);

    console.log('Users seeded');

    const profiles = await Profile.create([
      {
        name: 'John Doe',
        age: 25,
        height: 180,
        weight: 75,
        user: users[0]._id,
      },
      {
        name: 'Jane Smith',
        age: 30,
        height: 165,
        weight: 60,
        user: users[1]._id,
      },
      {
        name: 'Mike Johnson',
        age: 35,
        height: 175,
        weight: 80,
        user: users[2]._id,
      },
    ]);

    console.log('Profiles seeded');

    await Exercise.create([
      {
        exerciseType: 'Running',
        exerciseTime: 30,
        user: users[0]._id,
      },
      {
        exerciseType: 'Walking',
        exerciseTime: 45,
        user: users[0]._id,
      },
      {
        exerciseType: 'Calisthenics',
        exerciseTime: 60,
        user: users[1]._id,
      },
      {
        exerciseType: 'Weight Lifting',
        exerciseTime: 45,
        user: users[1]._id,
      },
      {
        exerciseType: 'Yoga',
        exerciseTime: 60,
        user: users[2]._id,
      },
      {
        exerciseType: 'Walking',
        exerciseTime: 30,
        user: users[2]._id,
      },
    ]);

    console.log('Exercises seeded');

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
