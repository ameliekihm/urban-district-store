import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { uploadImage } from '../api/uploader';
import { addNewProduct } from '../api/firebase';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const queryClient = useQueryClient();

  const addProduct = useMutation({
    mutationFn: ({ product, url }) => addNewProduct(product, url),
    onSuccess: async () =>
      await queryClient.invalidateQueries({
        queryKey: ['products'],
      }),
  });
  //
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    uploadImage(file)
      .then((url) => {
        addProduct.mutate(
          { product, url },
          {
            onSuccess: () => {
              setSuccess('Product has been successfully added.');
              setShowPopup(true);
              setTimeout(() => {
                setShowPopup(false);
                setSuccess(null);
              }, 4000);
            },
          }
        );
      })
      .finally(() => setIsUploading(false));
  };

  return (
    <section className='px-8  text-center'>
      <h2 className='text-3xl font-bold mb-4 py-6 bg-pink-100'>
        Add New Product
      </h2>
      {showPopup && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='bg-pink-400 p-4 rounded shadow-lg text-xl font-bold text-white'>
            <p>🤍 {success}</p>
          </div>
        </div>
      )}
      {file && (
        <img
          className='w-80 mx-auto mb-2'
          src={URL.createObjectURL(file)}
          alt='local file'
        />
      )}
      <form className='flex px-10 flex-col' onSubmit={handleSubmit}>
        <input
          type='file'
          accept='image/*'
          name='file'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='title'
          value={product.title ?? ''}
          placeholder='Product Title'
          required
          onChange={handleChange}
        />
        <input
          type='number'
          name='price'
          value={product.price ?? ''}
          placeholder='Price'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='category'
          value={product.category ?? ''}
          placeholder='Category'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='description'
          value={product.description ?? ''}
          placeholder='Description'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='options'
          value={product.options ?? ''}
          placeholder='Size options (separated by commas)'
          required
          onChange={handleChange}
        />
        <Button
          text={isUploading ? 'Uploading...' : 'Add Product'}
          disabled={isUploading}
          className='tracking-wider font-semibold py-4'
        />
      </form>
    </section>
  );
}
