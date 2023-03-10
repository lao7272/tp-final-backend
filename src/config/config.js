import "dotenv/config";

const vars = {
    PORT: process.argv[2] || 8080,
    MONGO_STORE_URL: process.env.MONGO_STORE_URL
}

export default vars;