const { exercises, users } = require('../models');



const resolvers = {
    Query: {
       getUsers: async (parent, { id }) => {
        const user = await users.findOne({ _id: id }).populate('exercises');

        return user;
    },
    getExercises: async (parent, { username }) => {
        const params = username ? { username } : {};
        return exercises.find(params).sort({ createdAt: -1 });
    },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await users.create(args);
           
            return user;
        },
        addExercise: async (parent, args) => {
            const exercise = await exercises.create(args);

            return exercise;
        },
        removeExercise: async (parent, { _id }) => {
            const exercise = await exercises.findOneAndDelete({ _id });

            return exercise;
        },
        login: async (parent, { username, password }) => {
            const user = await users.findOne({ username });

            // if (!user) {
            //     throw new AuthenticationError('Incorrect credentials');
            // }
            
            // const correctPw = await user.isCorrectPassword(password);

            // if (!correctPw) {
            //     throw new AuthenticationError('Incorrect credentials');
            // };

            // const token = signToken(user);
            return { user };
        },
    },
};




module.exports = resolvers;
