<template>
  <div id="app">
    <h1>Easter Reading List</h1>

    <BookList :list="bookList"></BookList>
    <img src="../public/bunnies.jpg"/>
    <AddBook @refresh-books="update"></AddBook>
  </div>
</template>

<script>
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import { getBooksQuery } from './queries/queries'

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
    AddBook
  },
  data: ()=>({
    bookList: []
  })
}
</script>
