<template>
    <div>
        <ul id="book-list">
            <li v-for="book in list" @click="selected=book.id" :key="book.id">{{book ? book.name : ''}}</li>
        </ul>
        <BookDetails :bookId="selected"></BookDetails>
    </div>
</template>

<script>
    import BookDetails from './BookDetails';

    export default {
        props: ['list'],
        data: ()=>({
            selected: null
        }),
        components:{
            BookDetails
        }
    }
</script>
