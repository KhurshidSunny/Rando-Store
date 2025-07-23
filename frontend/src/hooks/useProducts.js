import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllProducts, createProduct, deleteProduct, getProductById, updateProduct } from '../services/api';
import toast from 'react-hot-toast';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};


// Fetch single product by ID
export const useGetProduct = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: !!id, // only fetch if id exists
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['products']);
      toast.success(`${data.name} created successfully!`);
    },
    onError: (error) => {
      toast.error(`Failed to create product: ${error.message}`);
    },
  });
};

// Update product
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      toast.success('Product updated successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to update product: ${error.message}`);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      toast.success('Product deleted successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to delete product: ${error.message}`);
    },
  });
};