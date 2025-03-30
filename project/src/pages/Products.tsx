import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import { loadProductsFromCSV } from '../utils/csvLoader';
import type { Product } from '../types/product';

export default function Products() {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProductsFromCSV().then(setProducts);
  }, []);

  useEffect(() => {
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(`products.categories.${product.category}`).toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products, t]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-8">
            {t('products.title')}
          </h2>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-12">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="relative">
                <div className="w-full h-80 bg-white rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-200 group-hover:scale-105">
                  <img
                    src={product.image}
                    alt={t(`products.categories.${product.category}`)}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {t(`products.categories.${product.category}`)}
                  </p>
                  <p className="mt-2 text-lg font-medium text-indigo-600">
                    ${product.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center mt-12">
            <p className="text-lg text-gray-500">
              No products found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}