import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

const API_URL = window.env.REACT_APP_API_GATEWAY_URL;

export default function useProducts() {
  const queryClient = useQueryClient();

  const getProducts = async () => {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  };

  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 1000 * 60,
  });

  const addProduct = useMutation({
    mutationFn: async (product) => {
      const payload = {
        title: product.title?.trim() || '',
        price: Number(product.price) || 0,
        category: product.category?.trim() || '',
        description: product.description?.trim() || '',
        options: Array.isArray(product.options)
          ? product.options.join(',')
          : product.options || '',
        image: product.image || '/placeholder.png',
      };

      const res = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to save product: ${errorText}`);
      }

      return res.json();
    },
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: ['products'] }),
  });

  return { productsQuery, addProduct };
}
