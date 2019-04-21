<template>
    <div>
        <ul id="book-list">
            <li v-for="book in list" @click="selected=book" :key="book.id">{{book ? book.name : ''}}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: ['list'],
        data: ()=>({
            selected: null
        })
    }
</script>
