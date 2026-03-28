import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookList from '../components/BookList';
import CategoryFilter from '../components/CategoryFilter';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';

function ProjectPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { cart } = useCart();
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <WelcomeBand />
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <CategoryFilter
              setSelectedCategories={setSelectedCategories}
              selectedCategories={selectedCategories}
            />
            <div className="card mt-3">
              <div className="card-header bg-success text-white">
                Cart Summary
              </div>
              <div className="card-body">
                <p className="mb-1"><strong>Items:</strong> {totalItems}</p>
                <p className="mb-2"><strong>Total:</strong> ${totalPrice.toFixed(2)}</p>
                <button
                  className="btn btn-success btn-sm w-100 position-relative"
                  onClick={() => navigate('/cart')}
                  disabled={cart.length === 0}
                >
                  View Cart
                  {totalItems > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {totalItems}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <BookList selectedCategories={selectedCategories} />
          </div>
        </div>
      </div>
    </>
  );
}
export default ProjectPage;
