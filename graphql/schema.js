const graphql = require('graphql');
const Product = require('../models/product');
const Seller = require('../models/seller');

const {
    GraphQLObjectType, GraphQLString,
    GraphQLID, GraphQLInt, GraphQLSchema,
    GraphQLList, GraphQLNonNull
} = graphql;

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        price: { type: GraphQLInt },
        seller: {
            type: SellerType,
            resolve(parent, args) {
                return Seller.findById(parent.sellerID);
            }
        }
    })
});

const SellerType = new GraphQLObjectType({
    name: 'Seller',
    fields: () => ({
        id: { type: GraphQLID },
        sellerName: { type: GraphQLString },
        product: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                return Product.find({ productID: parent.id });
            }
        }
    })
})

//RootQuery to use the data.
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // to get single product using id
        product: {
            type: ProductType,
            //argument passed by the user while making the query
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //this will return the product with id passed in argument 
                return Product.findById(args.id);
            }
        },
        // to get all products
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                return Product.find({});
            }
        },
        // to get a single seller with id
        seller: {
            type: SellerType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Seller.findById(args.id);
            }
        },
        // to get all the seller
        sellers: {
            type: new GraphQLList(SellerType),
            resolve(parent, args) {
                return Seller.find({});
            }
        }
    }
});

// add/update to the database.
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // to add new seller to database
        addSeller: {
            type: SellerType,
            args: {
                sellerName: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let seller = new Seller({
                    sellerName: args.sellerName

                });
                return seller.save();
            }
        },
        // to add new product to database
        addProduct: {
            type: ProductType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                price: { type: new GraphQLNonNull(GraphQLInt) },
                sellerID: { type: new GraphQLNonNull(GraphQLID) }

            },
            resolve(parent, args) {
                let product = new Product({
                    name: args.name,
                    price: args.price,
                    sellerID: args.sellerID
                })
                return product.save()
            }
        }
    }
});
// exporting modules to use
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});