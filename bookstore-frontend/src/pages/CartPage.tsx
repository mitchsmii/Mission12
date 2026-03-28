import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import WelcomeBand from '../components/WelcomeBand';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart } = useCart();
  const [searchParams] = useSearchParams();

  const returnPage = searchParams.get('returnPage') || '1';
  const returnPageSize = searchParams.get('returnPageSize') || '5';

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <WelcomeBand />
      <div className="container mt-4">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <div className="alert alert-info">Your cart is empty.</div>
        ) : (
          <>
            <table className="table table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Title</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.bookID}>
                    <td>{item.title}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeFromCart(item.bookID)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-end mb-3">
              <h4>Total: ${total.toFixed(2)}</h4>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-primary" onClick={() => alert('Checkout not yet implemented')}>
                Checkout
              </button>
              <button className="btn btn-outline-danger" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </>
        )}
        <button
          className="btn btn-secondary mt-3"
          onClick={() => navigate(`/?page=${returnPage}&pageSize=${returnPageSize}`)}
        >
          Continue Shopping
        </button>
      </div>
    </>
  );
}

export default CartPage;
