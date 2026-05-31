import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Resources() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => { 
    api.get('/products').then(r => setProducts(r.data)).catch(()=>{}); 
  }, []);

  const handlePurchase = async () => {
    if (!selectedProduct || quantity < 1) return;
    
    // Confirmation Modal logic
    if (!window.confirm(`Confirm purchase of ${quantity} x ${selectedProduct.name}?\n\nTotal: $${(selectedProduct.price * quantity).toFixed(2)}`)) {
      return;
    }

    setLoading(true);
    try {
      await api.post('/orders', {
        productId: selectedProduct._id,
        quantity: parseInt(quantity)
      });
      alert('Order placed successfully! Check My Orders.');
      setSelectedProduct(null);
      setQuantity(1);
    } catch (err) {
      alert(err.response?.data?.message || 'Purchase failed');
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h2>Resource Marketplace</h2>
      <div className="grid" style={{ marginTop: 20 }}>
        {products.map(p => (
          <div className="card" key={p._id}>
            {p.imageUrl && (
              <img 
                src={p.imageUrl} 
                alt={p.name}
                style={{ 
                  width: '100%', 
                  height: '220px', // Increased height
                  objectFit: 'contain', // ✅ KEY FIX: Shows full image without cutting off
                  borderRadius: '8px', 
                  marginBottom: '15px',
                  backgroundColor: '#f8f9fa' // Nice background for transparent images
                }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            )}
            <h3>{p.name}</h3>
            <p style={{ color: '#666', margin: '5px 0', textTransform: 'capitalize' }}>{p.category}</p>
            <p style={{ margin: '5px 0' }}>{p.description || 'No description'}</p>
            <p style={{ margin: '5px 0', color: '#2c5e2e', fontWeight: 'bold' }}>
              Stock: {p.stock || 0} units
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 15, alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', fontSize: 18 }}>${p.price}/unit</span>
              <button 
                className="btn" 
                onClick={() => setSelectedProduct(p)}
                disabled={!p.stock || p.stock === 0}
              >
                {p.stock ? 'Purchase' : 'Out of Stock'}
              </button>
            </div>
          </div>
        ))}
        {products.length === 0 && <p>No resources available. Admins can add products via the Admin panel.</p>}
      </div>

      {selectedProduct && (
        <div style={{ 
          position: 'fixed', 
          top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(0,0,0,0.7)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }} onClick={() => { setSelectedProduct(null); setQuantity(1); }}>
          <div className="card" style={{ maxWidth: '400px', width: '100%' }} onClick={e => e.stopPropagation()}>
            <h3>Purchase: {selectedProduct.name}</h3>
            
            {/* Show image in purchase modal too */}
            {selectedProduct.imageUrl && (
               <img 
                src={selectedProduct.imageUrl} 
                alt={selectedProduct.name}
                style={{ 
                  width: '100%', 
                  height: '150px', 
                  objectFit: 'contain', 
                  borderRadius: '8px', 
                  marginBottom: '15px',
                  backgroundColor: '#f8f9fa'
                }}
               />
            )}

            <p style={{ margin: '15px 0' }}>
              <strong>Price per unit:</strong> ${selectedProduct.price}
            </p>
            <p style={{ margin: '10px 0' }}>
              <strong>Available stock:</strong> {selectedProduct.stock || 0}
            </p>
            
            <label style={{ display: 'block', marginTop: '15px' }}>
              <strong>Quantity:</strong>
            </label>
            <input 
              type="number" 
              className="input"
              min="1"
              max={selectedProduct.stock || 1}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={{ marginTop: '5px' }}
            />
            
            <div style={{ marginTop: '15px', padding: '10px', background: '#f0f7f0', borderRadius: '4px' }}>
              <strong>Total Price: ${(selectedProduct.price * quantity).toFixed(2)}</strong>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button className="btn" style={{ flex: 1 }} onClick={handlePurchase} disabled={loading}>
                {loading ? 'Processing...' : 'Confirm Purchase'}
              </button>
              <button 
                className="btn" 
                style={{ flex: 1, background: '#666' }} 
                onClick={() => { setSelectedProduct(null); setQuantity(1); }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}