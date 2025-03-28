
<script setup lang="ts">
import { useCart } from "../views/composables/useCart";

const { cart, removeFromCart, totalPrice } = useCart();
</script>

<template>
  <div>
    <h2>Shopping Cart</h2>
    <ul v-if="cart.length">
      <li v-for="item in cart" :key="item.book.id">
        <strong>{{ item.book.title }}</strong> - Quantity: {{ item.quantity }}
        <button @click="removeFromCart(item.book.id)">Remove</button>
      </li>
    </ul>
    <p v-else>No items in the cart.</p>
    <h3>Total: ${{ totalPrice }}</h3>
  </div>
</template>