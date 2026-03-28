import WelcomeBand from '../components/WelcomeBand';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import type { CartItem } from '../types/CartItem';

function DonatePage() {
  const navigate = useNavigate();
  const { title, bookID } = useParams();
  const { addToCart } = useCart();
  const [price, setPrice] = useState(0);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: Number(bookID),
      title: title!,
      price: price,
      quantity: 1,
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeBand />
      <h2>Donate to {title}</h2>

      <div className="container">
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>

      <button onClick={() => navigate('/')}>Go Back</button>
    </>
  );
}

export default DonatePage;
