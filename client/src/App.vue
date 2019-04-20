<template>
  <div id="app">
    <h1>Maja's Reading List</h1>
<!--    <BookList :list="bookList"></BookList>-->
    <ul id="book-list">
      <li v-for="book in bookList" @click="selected=book.id" :key="book.id">{{book ? book.name : ''}}</li>
    </ul>
    <BookDetails :bookId="selected"></BookDetails>
    <AddBook @refresh-books="update"></AddBook>
  </div>
</template>

<script>
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import BookDetails from './components/BookDetails';
import {getBooksQuery} from './queries/queries'

export default {
  mounted() {
    this.getBooks();
  },
  methods :{
    update(books) {
      this.bookList = books;
    },
    async getBooks() {
      const { data } = await this.$apollo.query({
        query: getBooksQuery
      });
      if (data && data.books) this.bookList = data.books;
    }
  },
  name: 'app',
  components: {
    BookList,
    AddBook,
    BookDetails
  },
  data: ()=>({
    bookList: [],
    selected: null
  })
}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}
</style>
