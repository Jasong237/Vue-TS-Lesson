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