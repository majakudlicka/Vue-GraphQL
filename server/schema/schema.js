const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

// dummy data
var books = [
    { name: 'ex1', genre: 'fantasy', id: '1', authorId: '1'},
    { name: 'ex2', genre: 'fantasy', id: '2', authorId: '2'},
    { name: 'ex3', genre: 'fantasy', id: '3', authorId: '3'},
    { name: 'ex4', genre: 'fantasy', id: '4', authorId: '2'},
    { name: 'ex5', genre: 'fantasy', id: '5', authorId: '3'},
    { name: 'ex6', genre: 'fantasy', id: '6', authorId: '3'}
];

var authors = [
    { name: 'auth1', age: 44, id: '1'},
    { name: 'auth2', age: 44, id: '2'},
    { name: 'auth3', age: 44, id: '3'},
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, { id: parent.authorId});
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { authorId: parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: {type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from db / other source
                return _.find(books, { id: args.id});

            }
        },
        author: {
            type: AuthorType,
            args: { id: {type: GraphQLID } },
            resolve(parent, args) {
                return _.find(authors, { id: args.id });
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});

