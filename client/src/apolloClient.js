import ApolloClient from 'apollo-boost'

const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    }

}

export default new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    defaultOptions,
})
