<template>
    <b-form @submit="submitForm">
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
        <b-button type="submit">+</b-button>
    </b-form>
</template>

<script>
    import { getBooksQuery, getAuthorsQuery, addBookMutation} from "../queries/queries";

    export default {
        async created() {
            const { data } = await this.$apollo.query({
                query: getBooksQuery
            });
            if (data && data.books) this.books= data.books;
        },
        async mounted() {
            const { data } = await this.$apollo.query({
                query: getAuthorsQuery
            });
            if (data && data.authors) this.authorsArray = data.authors;
        },
        data: ()=>({
            bookName: '',
            genre: '',
            author: '',
            authorsArray: [],
            books: []
        }),
        methods: {
            async submitForm(e) {
                e.preventDefault();
                await this.$apollo.mutate({
                    mutation: addBookMutation,
                    variables: {
                        name: this.bookName,
                        genre: this.genre,
                        authorId: this.author
                    },
                    update: (store, { data: { addBook } }) => {
                        this.books = this.updateStoreAfterCreate(store, addBook, getBooksQuery, 'books');
                    }
                    // refetchQueries: [{query: getBooksQuery}],
                    // update: (store, { data: { books } }) => {
                    //     this.updateStoreAfterVote(store, books)
                    // }
                });
                console.log('this.books ', this.books);
                this.$emit('refresh-books', this.books);
            },
            updateStoreAfterCreate (store, payload, query, field) {
                // We get our current store for the given Query
                const data = store.readQuery({
                    query: query
                });
                console.log('data? ', data);
                console.log('addBook ', payload);
                //We add the new data
                data[field].push(payload);

                //We update the cache
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
