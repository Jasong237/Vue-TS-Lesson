
<script setup lang="ts">
import { useBookStore } from "../views/composables/useBookStore";
import { useCart } from "../views/composables/useCart";

const { books } = useBookStore();
const { addToCart } = useCart();
</script>

<template>
  <div>
    <h2>Available Books</h2>
    <ul>
      <li v-for="book in books" :key="book.id">
        <strong>{{ book.title }}</strong> - {{ book.author }} (${{ book.price }})
        <button @click="addToCart(book)">Add to Cart</button>
      </li>
    </ul>
  </div>
</template>