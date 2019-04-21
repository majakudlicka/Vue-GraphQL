<template>
    <form @submit="submitForm">
        <div class="field">
            <label>Book name:</label>
            <input type="text" v-model="bookName">
        </div>
        <div class="field">
            <label>Genre:</label>
            <input type="text" v-model="genre">
        </div>
        <div class="field">
            <label>Author:</label>
            <b-select :options="authorOptions" v-model="author">
            </b-select>
        </div>
        <button type="submit">+</button>
    </form>
</template>

<script>
    import { GET_BOOKS_QUERY, GET_AUTHORS_QUERY, ADD_BOOK_MUTATION} from "../queries/queries";

    export default {
        async mounted() {
            const { data } = await this.$apollo.query({
                query: GET_AUTHORS_QUERY
            });
            if (data && data.authors) this.authorsArray = data.authors;
        },
        data: ()=>({
            bookName: '',
            genre: '',
            author: '',
            authorsArray: []
        }),
        methods: {
            async submitForm(e) {
                e.preventDefault();
                await this.$apollo.mutate({
                    mutation: ADD_BOOK_MUTATION,
                    variables: {
                        name: this.bookName,
                        genre: this.genre,
                        authorId: this.author
                    },
                    update: (store, { data: { addBook } }) => {
                        const books = this.updateStoreAfterCreate(store, addBook, GET_BOOKS_QUERY, 'books');
                        this.$emit('refresh-books', books);
                    }
                });
            },
            updateStoreAfterCreate (store, payload, query, field) {
                // Get the current store for the given Query
                const data = store.readQuery({
                    query: query
                });
                //Add the new data
                data[field].push(payload);

                //Update the cache
                store.writeQuery({ query: query, data });
                return data[field];
            },
        },

        computed: {
            authorOptions() {
                if (!this.authorsArray.length) return [];
                return this.authorsArray.map(item=> ({ text: item.name, value: item.id}));

            }
        }
    }
</script>
