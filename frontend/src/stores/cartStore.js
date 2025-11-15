import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import API from '../utils/api';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      fetchCart: async () => {
        try {
          const { data } = await API.get('/cart');
          set({ items: data.items || [] });
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      },
      
      addItem: async (productId, quantity, size, color) => {
        try {
          const { data } = await API.post('/cart/add', { productId, quantity, size, color });
          set({ items: data.items });
        } catch (error) {
          console.error('Error adding to cart:', error);
        }
      },
      
      removeItem: async (itemId) => {
        try {
          await API.delete(`/cart/remove/${itemId}`);
          set({ items: get().items.filter(item => item._id !== itemId) });
        } catch (error) {
          console.error('Error removing from cart:', error);
        }
      },
      
      clearCart: async () => {
        try {
          await API.delete('/cart/clear');
          set({ items: [] });
        } catch (error) {
          console.error('Error clearing cart:', error);
        }
      },
      
      getTotal: () => {
        return get().items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
      },
      
      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
