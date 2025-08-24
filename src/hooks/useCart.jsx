import React from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { addOrUpdateCart, getCart, removeFromCart } from '../api/dynamo';
import { useAuthContext } from '../context/AuthContext';

export default function useCart() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  const cartQuery = useQuery({
    queryKey: ['carts', uid || ''],
    queryFn: () => getCart(uid),
    enabled: !!uid,
  });

  const addOrUpdateItem = useMutation({
    mutationFn: (product) => addOrUpdateCart(uid, product),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['carts', uid],
      }),
  });

  const removeItem = useMutation({
    mutationFn: (id) => removeFromCart(uid, id),
    onSuccess: () => {
      queryClient.invalidateQueries(['carts', uid]);
    },
  });

  return { cartQuery, addOrUpdateItem, removeItem };
}
