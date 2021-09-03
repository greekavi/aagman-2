const {gql}=require("apollo-server-express");

module.exports= gql`

type Query {
    stores: [Store!]!
    store(id: ID!): Store!
    ordersDashboard(storeId:ID!):Store!
    getMenu(storeId:ID!):StoreMenu!
}

type StoreMenu{
    id:ID!
    menu:Menu!
}

type Store {
    id: ID!
    name : String!
    rating:Float!
    address : Location!
    orders : [Order]!
    owner : User!
    timings: Timing!
    menu : Menu!
    revenue: Revenue!
}

type Mutation{
    createStore(name:String!,userId:ID!): String!
}



`