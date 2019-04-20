<template>
    <div id="book-details">
        <div v-if="book">
            <h2>{{book.name}}</h2>
            <p>{{book.genre}}</p>
            <p>{{book.author.name}}</p>
            <p>All books by this author:</p>
            <ul class="other-books">
                <li :key="item.id" v-for="item in book.author.books">{{item.name}}</li>
            </ul>
        </div>
        <div v-else>No book selected...</div>
    </div>
</template>

<script>
    import { getBookQuery} from "../queries/queries";

    export default {
        props:['bookId'],
        data:()=>({
            book: null
        }),
        watch: {
            async bookId(val) {
                if (val) {
                    const { data } = await this.$apollo.query({
                        query: getBookQuery,
                        variables: {
                            id: val
                        }
                    });
                    if (data && data.book) this.book = data.book;
                }
            }
        }
    }

</script>
