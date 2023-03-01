import "dotenv/config";

const vars = {
    PORT: process.argv[2] || 8080,
    MONGO_STORE_URL: process.env.MONGO_STORE_URL || " mongodb+srv://testCoder:testCoder@cluster0.n83bwto.mongodb.net/?retryWrites=true&w=majority"
}

export default vars;