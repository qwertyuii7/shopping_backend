import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // track if initial load is done so we don't show "load more" prematurely
  const [initialLoaded, setInitialLoaded] = useState(false);

  // The fetchProducts function handles both initial fetches and pagination
  const fetchProducts = async (currentCategory, cursor = null) => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const url = new URL(`${apiUrl}/products`);
      if (currentCategory) {
        url.searchParams.append('category', currentCategory);
      }
      if (cursor) {
        // Pass the opaque base64 cursor exactly as received
        url.searchParams.append('cursor', cursor);
      }

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();

      // If we have a cursor, we append the new products. Otherwise, we replace the list.
      if (cursor) {
        setProducts((prev) => [...prev, ...data.data]);
      } else {
        setProducts(data.data);
      }

      setNextCursor(data.next_cursor);
      setInitialLoaded(true);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching products.');
    } finally {
      setLoading(false);
    }
  };

  // Effect to re-fetch from page 1 whenever category changes
  // A change in category resets the cursor to null, initiating a fresh list
  useEffect(() => {
    setInitialLoaded(false);
    fetchProducts(category, null);
  }, [category]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleLoadMore = () => {
    if (nextCursor) {
      fetchProducts(category, nextCursor);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Product Catalog</h1>
        <div className="filter-container">
          <label htmlFor="category">Filter by Category:</label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={handleCategoryChange}
            placeholder="Enter category..."
            className="category-input"
          />
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}

      <main className="product-list">
        {products.length === 0 && !loading && initialLoaded && !error ? (
          <div className="empty-state">No products found.</div>
        ) : (
          <table className="products-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>${Number(product.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {loading && <div className="loading-state">Loading...</div>}

        {!loading && nextCursor && initialLoaded && (
          <button className="load-more-btn" onClick={handleLoadMore}>
            Load More
          </button>
        )}
      </main>
    </div>
  );
}

export default App;
