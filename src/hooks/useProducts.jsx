import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { getProducts as fetchProducts, addNewProduct } from '../api/firebase';

export default function useProducts() {
  const queryClient = useQueryClient();
  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60,
  });

  const addProduct = useMutation({
    mutationFn: ({ product, url }) => addNewProduct(product, url),
    onSuccess: async () =>
      await queryClient.invalidateQueries({
        queryKey: ['products'],
      }),
  });

  return { productsQuery, addProduct };
}
