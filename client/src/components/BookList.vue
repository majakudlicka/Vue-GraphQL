<template>
    <div>
        <ul id="book-list">
            <li v-for="book in list" @click="selected=book" :key="book.id">{{book ? book.name : ''}}</li>
        </ul>
    </div>
</template>

<script>
    import { getBooksQuery } from "../queries/queries";

    export default {
        props: ['list'],
        data: ()=>({
            selected: null
        })
    }
</script>
