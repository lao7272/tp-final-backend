import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import { getProductByIdDB, createProductDB, getProductsDB } from './services/products.service.js'
import express from "express";

const app = express();
const ProductSchema = `
    type Product {
        _id: ID!,
        name: String!,
        price: Int!,
        urlImg: String!,
        description: String!
    }

    input ProductInput {
        name: String,
        price: Int,
        urlImg: String,
        description: String,
        timestamp: Int,
        stock: Int
    }

    type Query {
        getProductById(_id: ID!): Product,
        getProducts(limit: Int): [Product]
    }
    type Mutation {
        postProduct(name: String!,
            price: Int!,
            urlImg: String!,
            description: String!,
            timestamp: Int!,
            stock: Int!): Product
    }
`;

const schema = buildSchema(ProductSchema);

app.use("/graphql", graphqlHTTP(
    {
        schema,
        rootValue: {
            postProduct: createProductDB,
            getProductById: getProductByIdDB,
            getProducts: getProductsDB
        },
        graphiql: true
    }
));
const PORT = 8080;
app.listen(PORT, () => console.log(`RUN http://localhost:${PORT}`));