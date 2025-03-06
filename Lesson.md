## 🎓 **Learn TypeScript with Vue 3: A Simple Bookstore Project!** 📚

### **👋 Welcome, Young Coders!**
Today, we're going to build a **simple online bookstore** using **Vue 3** and **TypeScript**! 🚀 But wait… **what is TypeScript?**

### **🤔 What is TypeScript?**
Imagine TypeScript as a **superpower** for JavaScript. 💪 It helps us **avoid mistakes** by making sure we are using the right types of data. It's like **having labels on your school supplies** so you don't accidentally put your lunch in your pencil case! 🍎✏️

For example:
- `number` is for numbers like `5`, `100`, or `3.14`
- `string` is for words like `"Hello"` or `"Book"`
- `boolean` is for `true` or `false`

Now, let’s **learn TypeScript** by making a simple book store where people can buy books and put them in a shopping cart. 🛒📖

---

## **🚀 Step 1: Setting Up Vue and TypeScript**
First, let's set up our project. Open your terminal and type:

```sh
npm create vue@latest my-bookstore --ts
cd my-bookstore
npm install
npm run dev
```
This creates a Vue project **with TypeScript**! 🎉 Now, let's start coding.

---

## **📝 Step 2: Writing Our First TypeScript Interfaces**
Before we build our store, let's describe the things in it using **interfaces**. 🏗️ 

### **What’s an Interface? 🤔**
An **interface** is like a **blueprint**. It tells the computer what something should look like.

### **👀 Example: What is a Book?**
Think of a **book**. What do all books have? A **title**, an **author**, a **price**, and an **ID**. Let’s tell TypeScript this!

📜 **Create a new file**: `types.ts`
```ts
/**
 * A book has an ID, title, author, and price.
 */
export interface Book {
  id: number;      // A unique number for each book
  title: string;   // The name of the book
  author: string;  // Who wrote the book
  price: number;   // How much does the book cost?
}
```
🎯 **Now, TypeScript will help us avoid mistakes!** If we forget to add a price, TypeScript will say: **"Oops! You forgot something!"** 🚨

---

## **🛒 Step 3: Create the Book Store**
Now, let’s **store some books** in a Vue component!

📜 **Create a new file**: `composables/useBookStore.ts`
```ts
import { ref } from "vue";
import type { Book } from "@/types";

/**
 * Store for our books
 */
export function useBookStore() {
  // 🏪 We store our books in a "ref" (a special Vue variable)
  const books = ref<Book[]>([
    { id: 1, title: "The Vue Handbook", author: "John Doe", price: 25 },
    { id: 2, title: "Mastering TypeScript", author: "Jane Smith", price: 30 },
    { id: 3, title: "Vue 3 Advanced Guide", author: "Evan You", price: 40 },
  ]);

  return { books };
}
```

### **🧐 What Did We Learn?**
- `ref<Book[]>` means **a list of books**.
- `Book[]` is a **list (array)** of books.

🛠 **TypeScript helps us by making sure every book has a title, author, and price.** If we forget one, it **won’t work!** 🚨

---

## **🛍️ Step 4: Build the Shopping Cart**
Now, we need a **shopping cart**! Let's create another TypeScript **interface** to describe what’s inside the cart.

📜 **Edit `types.ts` to add this:**
```ts
/**
 * A shopping cart item contains a book and a quantity.
 */
export interface CartItem {
  book: Book;      // The book in the cart
  quantity: number; // How many copies?
}
```
Now, let’s **create our cart**.

📜 **Create a new file**: `composables/useCart.ts`
```ts
import { ref, computed } from "vue";
import type { CartItem, Book } from "@/types";

/**
 * Shopping cart store
 */
export function useCart() {
  const cart = ref<CartItem[]>([]);

  /**
   * Add a book to the cart or increase its quantity.
   */
  function addToCart(book: Book) {
    const existingItem = cart.value.find((item) => item.book.id === book.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.value.push({ book, quantity: 1 });
    }
  }

  /**
   * Remove a book from the cart.
   */
  function removeFromCart(bookId: number) {
    cart.value = cart.value.filter((item) => item.book.id !== bookId);
  }

  /**
   * Get the total price of all books in the cart.
   */
  const totalPrice = computed(() =>
    cart.value.reduce((sum, item) => sum + item.book.price * item.quantity, 0)
  );

  return { cart, addToCart, removeFromCart, totalPrice };
}
```

### **🧐 What Did We Learn?**
- `computed(() => something)` → **Automatically updates when something changes!**
- `find()` → **Looks for a book inside the cart.**
- `reduce()` → **Adds up all prices to get a total.**

---

## **📦 Step 5: Create the Components**
Now, let’s **show our books and cart** on the screen! ✨

📜 **Create `components/BookList.vue`**
```vue
<script setup lang="ts">
import { useBookStore } from "@/composables/useBookStore";
import { useCart } from "@/composables/useCart";

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
```

📜 **Create `components/ShoppingCart.vue`**
```vue
<script setup lang="ts">
import { useCart } from "@/composables/useCart";

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
```

📜 **Edit `App.vue` to Show Everything**
```vue
<script setup lang="ts">
import BookList from "@/components/BookList.vue";
import ShoppingCart from "@/components/ShoppingCart.vue";
</script>

<template>
  <div>
    <h1>📚 Book Store 🛒</h1>
    <BookList />
    <ShoppingCart />
  </div>
</template>
```

---

## **🏁 Step 6: Run and Test**
Start your project:

```sh
npm run dev
```
Now, go to **http://localhost:5173/** and enjoy your book store! 🎉

---

## **🎯 What Did We Learn?**
✅ **Interfaces** (to define things like `Book` and `CartItem`)  
✅ **Arrays and Objects** (`Book[]` means "a list of books")  
✅ **Reactivity in Vue** (`ref()`, `computed()`)  
✅ **Functions with TypeScript** (ensuring correct types)  

---

## **🌟 What’s Next?**
Would you like to **add a checkout page** or **save the cart to local storage**? Let me know, and we can keep learning together! 🚀