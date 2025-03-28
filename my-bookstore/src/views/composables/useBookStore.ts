
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