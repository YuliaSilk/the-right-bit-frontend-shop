import styles from './Catalog.module.css';
import { useEffect, useState } from 'react';

import Banner from '@components/home/Banner/Banner';
import NewsLetter from '@components/home/NewsLetter/NewsLetter';

import ActiveFilters from '@components/catalog/ActiveFilters/ActiveFilters';
import CatalogCard from '@components/catalog/CatalogCard/CatalogCard';
import CatalogCategories from '@components/catalog/CatalogCategories/CatalogCategories';
import CatalogFilters from '@components/catalog/CatalogFilters/CatalogFilters';
import CatalogSidebar from '@components/catalog/CatalogSidebar/CatalogSidebar';

export default function Catalog() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceFrom, setPriceFrom] = useState(undefined);
  const [priceTo, setPriceTo] = useState(undefined);
  const [sortBy, setSortBy] = useState('');
  const [aZ, setAZ] = useState('');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  // useEffect(() => {
  //   const controller = new AbortController();
  //   const loadProducts = async () => {
  //     setIsLoading(true);
  //     setErrorMessage('');
  //     try {
  //       const hasFilters = !!(selectedCategory || selectedBrands.length > 0 || priceFrom || priceTo || sortBy || aZ);
  //       let response;
  //       if (hasFilters) {
  //         response = await fetch(`${API_URL}/api/v1/catalog/filter`, {
  //           method: 'POST',
  //           headers: { 'Content-Type': 'application/json', accept: 'application/json' },
  //           body: JSON.stringify({
  //             categoryName: selectedCategory || undefined,
  //             brand: selectedBrands[0] || undefined,
  //             priceFrom: priceFrom != null && priceFrom !== '' ? Number(priceFrom) : undefined,
  //             priceTo: priceTo != null && priceTo !== '' ? Number(priceTo) : undefined,
  //             sortBy: sortBy || undefined,
  //             page,
  //             size,
  //             aZ: aZ || undefined,
  //           }),
  //           signal: controller.signal,
  //         });
  //       } else {
  //         response = await fetch(`${API_URL}/api/v1/catalog`, {
  //           method: 'GET',
  //           headers: { accept: 'application/json' },
  //           signal: controller.signal,
  //         });
  //       }

  //       const contentType = response.headers.get('content-type') || '';
  //       let payload = null;
  //       try {
  //         if (contentType.includes('application/json')) {
  //           payload = await response.json();
  //         } else {
  //           const text = await response.text();
  //           payload = text ? { message: text } : null;
  //         }
  //       } catch (_) {
  //         payload = null;
  //       }

  //       if (!response.ok) {
  //         const message = (payload && (payload.message || payload.error)) || `Request failed with status ${response.status}`;
  //         setErrorMessage(message);
  //         setProducts([]);
  //         return;
  //       }

  //       const itemsCandidate = Array.isArray(payload)
  //         ? payload
  //         : payload?.content || payload?.items || payload?.data || [];
  //       const items = Array.isArray(itemsCandidate) ? itemsCandidate : [];
  //       setProducts(items);
  //     } catch (err) {
  //       if (err?.name !== 'AbortError') {
  //         setErrorMessage('Network error. Please try again later.');
  //       }
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   loadProducts();
  //   return () => controller.abort();
  // }, [API_URL, selectedBrands, selectedCategory, priceFrom, priceTo, sortBy, aZ, page, size]);

  // const mapProductToCardProps = (product, index) => {
  //   const id = product?.id ?? index + 1;
  //   const name = product?.productName ?? 'Product';
  //   const price = product?.price ?? 0;
  //   const kcal = product?.kcal ?? product?.calories ?? 0;
  //   const description = product?.description ?? '';
  //   let imageUrl = '';

  //   if (Array.isArray(product?.images) && product.images.length > 0) {
  //     imageUrl = product.images[0]?.url || '';
  //   }
  //   if (imageUrl && imageUrl.startsWith('/')) {
  //     const base = (API_URL || '').replace(/\/+$/, '');
  //     imageUrl = `${base}${imageUrl}`;
  //   }

  //   return { id, name, price, kcal, description, imageUrl };
  // };


//get all catalog items

//   useEffect(() => {
//     const controller = new AbortController();

//     const getAllCatalogItems = async () => {
//       setIsLoading(true);
//       setErrorMessage('');
//       try {
//         const response = await fetch(`${API_URL}/api/v1/catalog`, {
//           method: 'GET',
//           headers: { accept: 'application/json' },
//           signal: controller.signal,
//         });

//         if (!response.ok) {
//           throw new Error(`Request failed with status ${response.status}`);
//         }

//         const data = await response.json();
//         setProducts(Array.isArray(data) ? data : []);
//       } catch (error) {
//         if (error.name !== 'AbortError') {
//           setErrorMessage(error.message || 'Network error');
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     getAllCatalogItems();
//     return () => controller.abort();
//   }, [API_URL]);

//   useEffect(() => {
//   const controller = new AbortController();

//   const filterCatalogItems = async () => {
//     setIsLoading(true);
//     setErrorMessage('');
//     try {
//       const response = await fetch(`${API_URL}/api/v1/catalog/filter`, {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           accept: 'application/json' 
//         },
//         body: JSON.stringify({
//           categoryName: selectedCategory || undefined,
//           brand: selectedBrands[0] || undefined,
//           priceFrom: priceFrom ?? undefined,
//           priceTo: priceTo ?? undefined,
//           sortBy: sortBy || undefined,
//           aZ: aZ || undefined,
//           page,
//           size
//         }),
//         signal: controller.signal,
//       });

//       if (!response.ok) {
//         throw new Error(`Request failed with status ${response.status}`);
//       }

//       const data = await response.json();
//       // Якщо API повертає масив або об'єкт з content
//       const items = Array.isArray(data) ? data : data.content || [];
//       setProducts(items);

//     } catch (error) {
//       if (error.name !== 'AbortError') {
//         setErrorMessage(error.message || 'Network error');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   filterCatalogItems();

//   return () => controller.abort();
// }, [API_URL, selectedCategory, selectedBrands, priceFrom, priceTo, sortBy, aZ, page, size]);

useEffect(() => {
  const controller = new AbortController();

  const loadProducts = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const hasFilters = !!(selectedCategory || selectedBrands.length > 0 || priceFrom || priceTo || sortBy || aZ);
      const url = hasFilters ? `${API_URL}/api/v1/catalog/filter` : `${API_URL}/api/v1/catalog`;
      const options = hasFilters
        ? {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', accept: 'application/json' },
            body: JSON.stringify({
              categoryName: selectedCategory || undefined,
              brand: selectedBrands[0] || undefined,
              priceFrom: priceFrom ?? undefined,
              priceTo: priceTo ?? undefined,
              sortBy: sortBy || undefined,
              aZ: aZ || undefined,
              page,
              size
            }),
            signal: controller.signal,
          }
        : {
            method: 'GET',
            headers: { accept: 'application/json' },
            signal: controller.signal
          };

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      const items = Array.isArray(data) ? data : data.content || [];
      setProducts(items);
    } catch (error) {
      if (error.name !== 'AbortError') setErrorMessage(error.message || 'Network error');
    } finally {
      setIsLoading(false);
    }
  };

  loadProducts();

  return () => controller.abort();
}, [API_URL, selectedCategory, selectedBrands, priceFrom, priceTo, sortBy, aZ, page, size]);

  return (
    <>
      <Banner />
      <CatalogCategories />

      <div className={styles.topWrapper}>
        <div className={styles.container}>
          <div className={styles.top}>
            <h2 className={styles.title}>Catalog</h2>
            <div className={styles.topRight}>
              <a className={styles.topLink} href="#">
                Delivery Information
              </a>
              <a className={styles.topLink} href="#">
                Payment Methods
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.catalogContent}>
          <CatalogSidebar
            selectedBrands={selectedBrands}
            onBrandsChange={setSelectedBrands}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            priceFrom={priceFrom}
            priceTo={priceTo}
            onPriceChange={({ min, max }) => { setPriceFrom(min); setPriceTo(max); }}
          />
          <div className={styles.mainContent}>
            <CatalogFilters
              sortBy={sortBy}
              onSortByChange={setSortBy}
              aZ={aZ}
              onAZChange={setAZ}
              size={size}
              onSizeChange={(val) => { setSize(val); setPage(0); }}
            />
            <ActiveFilters
              filters={[
                selectedCategory && `Category: ${selectedCategory}`,
                selectedBrands[0] && `Brand: ${selectedBrands[0]}`,
                (priceFrom || priceTo) && `Price: ${priceFrom ?? 0} - ${priceTo ?? '∞'}`,
                sortBy && `Sort: ${sortBy}`,
                aZ && `A-Z: ${aZ}`,
              ].filter(Boolean)}
              onRemoveFilter={(f) => {
                if (f.startsWith('Category:')) setSelectedCategory('');
                if (f.startsWith('Brand:')) setSelectedBrands([]);
                if (f.startsWith('Price:')) { setPriceFrom(undefined); setPriceTo(undefined); }
                if (f.startsWith('Sort:')) setSortBy('');
                if (f.startsWith('A-Z:')) setAZ('');
              }}
              resultsCount={products.length}
            />

            {isLoading && (
              <div className={styles.innerCards}>Loading...</div>
            )}

            {!isLoading && errorMessage && (
              <div className={styles.innerCards} style={{ color: '#c62828' }}>{errorMessage}</div>
            )}

            <div className={styles.innerCards}>
              {!isLoading && !errorMessage && products.length > 0 && (
                products.map((item, index) => {
                  const imageUrl = item.images?.[0]?.url
                    ? `${API_URL.replace(/\/+$/, '')}${item.images[0].url}`
                    : '';

                  return (
                    <CatalogCard
                      key={item.id || index}
                      id={item.id}
                      name={item.productName}
                      price={item.price}
                      kcal={item.kcal || item.calories || 0}
                      description={item.description || ''}
                      imageUrl={imageUrl}
                    />
                  );
                })
              )}
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', padding: '16px 0' }}>
              <button disabled={page <= 0} onClick={() => setPage((p) => Math.max(0, p - 1))}>Prev</button>
              <span>Page {page + 1}</span>
              <button onClick={() => setPage((p) => p + 1)}>Next</button>
            </div>
          </div>
        </div>
      </div>
      <NewsLetter />
    </>
  );
}
