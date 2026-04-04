import { useEffect, useState } from 'react';

function CategoryFilter({
  setSelectedCategories,
  selectedCategories,
}: {
  setSelectedCategories: (categories: string[]) => void;
  selectedCategories: string[];
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://is413bookstore-g6bxg3cfengfgjc5.centralus-01.azurewebsites.net/Books/GetBookCategories');
        const data = await response.json();
        console.log('Categories:', data);
        setCategories(data);
      } catch (error) {
        console.error('Error fetching Categories:', error);
      }
    };
    fetchCategories();
  }, []);

  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((c) => c !== target.value)
      : [...selectedCategories, target.value];
    setSelectedCategories(updatedCategories);
  }

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5 className="mb-0">Book Categories</h5>
      </div>
      <div className="card-body">
        {categories.map((c) => (
          <div key={c} className="form-check mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              id={c}
              value={c}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor={c}>
              {c}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
