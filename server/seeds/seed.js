const db = require('../config/connection');
const { User, Exercise } = require('../models');

db.once('open', async () => {
  try {
    await Exercise.deleteMany({});
    await User.deleteMany({});

    const users = await User.create([
      {
        username: 'JohnDoe',
        password: 'password1',
        email: 'johndoe@example.com',
      },
      {
        username: 'JaneSmith',
        password: 'password2',
        email: 'janesmith@example.com',
      },
      {
        username: 'MikeJohnson',
        password: 'password3',
        email: 'mikejohnson@example.com',
      },
    ]);

    console.log('Users seeded');

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
