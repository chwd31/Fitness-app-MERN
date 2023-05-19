const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const db = require("./config/connection");
const { typeDefs, resolvers } = require("./schemas");
// const { authMiddleware } = require("./utils/auth");
const userRoutes = require("./routes/users");
const profileRoutes = require("./routes/profile");
const exerciseRoutes = require("./routes/exercise");
const weeklyStatsRoutes = require("./routes/weeklyStats");


const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
    typeDefs,
    resolvers,
    // context: //authMiddleware,
});

//server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/exercise", exerciseRoutes);
app.use("/api/weekly-stats", weeklyStatsRoutes);


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
}
);

const startApolloServer = async () => {
    await server.start();
    // await server.listen(PORT);
    console.log(`Server is running on port ${PORT}`);
};

db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    }
    );
}
);

startApolloServer();

// Path: Fitness-app-MERN\fitness\server\utils\auth.js
