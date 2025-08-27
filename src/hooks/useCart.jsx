import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';

const API_URL = window.env.REACT_APP_API_GATEWAY_URL;

export default function useCart() {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  const getCart = async () => {
    if (!user?.sub) return [];
    const res = await fetch(`${API_URL}/cart?userId=${user.sub}`);
    if (!res.ok) throw new Error('Failed to fetch cart');
    return res.json();
  };

  const cartQuery = useQuery({
    queryKey: ['cart', user?.sub],
    queryFn: getCart,
    enabled: !!user?.sub,
  });

  const addOrUpdateItem = useMutation({
    mutationFn: async (product) => {
      const snapshot = {
        id: product.id || product.productId,
        title: product.title || product.snapshot?.title || 'Untitled',
        price: Number(product.price || product.snapshot?.price || 0),
        image: product.image || product.snapshot?.image || '/placeholder.png',
        option: product.option || product.snapshot?.option || '',
      };

      const payload = {
        userId: user.sub,
        productId: product.productId || product.id,
        quantity: Number(product.quantity) || 1,
        snapshot,
      };

      const res = await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`Failed to update cart: ${err}`);
      }

      return res.json();
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['cart', user?.sub] }),
  });

  const removeItem = useMutation({
    mutationFn: async (productId) => {
      const res = await fetch(
        `${API_URL}/cart/${productId}?userId=${user.sub}`,
        { method: 'DELETE' }
      );
      if (!res.ok) throw new Error('Failed to delete cart item');
      return res.json();
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['cart', user?.sub] }),
  });

  return { cartQuery, addOrUpdateItem, removeItem };
}
