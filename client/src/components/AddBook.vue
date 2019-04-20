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
            authorsArray: []
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
                    refetchQueries: [{query: getBooksQuery}],
                    // update: (store, { data: { books } }) => {
                    //     this.updateStoreAfterVote(store, books)
                    // }
                });
                this.$emit('refresh-books');
            }
        },

        computed: {
            authorOptions() {
                if (!this.authorsArray.length) return [];
                return this.authorsArray.map(item=> ({ text: item.name, value: item.id}));

            }
        }
    }
</script>
