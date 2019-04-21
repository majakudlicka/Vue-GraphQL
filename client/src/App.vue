<template>
  <div id="app">
    <h1>Maja's Reading List</h1>
    <BookList :list="bookList"></BookList>
    <BookDetails :bookId="selected"></BookDetails>
    <AddBook @refresh-books="update"></AddBook>
  </div>
</template>

<script>
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import BookDetails from './components/BookDetails';
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
    AddBook,
    BookDetails
  },
  data: ()=>({
    bookList: [],
    selected: null
  })
}
</script>
