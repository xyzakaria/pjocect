import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { loadProductsFromCSV } from '../utils/csvLoader';
import type { Product } from '../types/product';

const brands = [
  {
    name: 'Fresh Farms',
    logo: 'https://images.unsplash.com/photo-1595665593673-bf1ad72905c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Organic Valley',
    logo: 'https://images.unsplash.com/photo-1589923158776-cb4485d99fd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Nature\'s Best',
    logo: 'https://images.unsplash.com/photo-1557234195-6c68c0c3e6aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    name: 'Green Fields',
    logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
];

export default function Home() {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProductsFromCSV().then(setProducts);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            className="w-full h-[600px] object-cover"
            src="https://images.unsplash.com/photo-1495195134817-aeb325a55b65?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Food background"
          />
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t('hero.title')}
          </h1>
          <p className="mt-6 text-xl text-white max-w-3xl">
            {t('hero.subtitle')}
          </p>
          <div className="mt-10">
            <a
              href="/products"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              {t('nav.products')}
              <ChevronRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Featured Products Slider */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            Featured Products
          </h2>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="pb-8"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-transform duration-200 hover:scale-105">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    <p className="mt-2 text-indigo-600 font-medium">${product.price}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Brands Slider */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            Our Trusted Brands
          </h2>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={2}
            autoplay={{ delay: 2500 }}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
            }}
            className="pb-8"
          >
            {brands.map((brand, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-lg p-6 shadow-md transform transition-transform duration-200 hover:scale-105">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <p className="mt-4 text-center text-gray-800 font-medium">
                    {brand.name}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}