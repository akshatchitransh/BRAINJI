import mongoose from "mongoose";
export const connectdb = async () => {
    const MONGO_URL = process.env.MONGO_URI;
    try {
        if (!MONGO_URL) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }
        await mongoose.connect(MONGO_URL);
        console.log("db done baby");
    }
    catch (err) {
        console.log(err);
    }
};
//# sourceMappingURL=index.js.map