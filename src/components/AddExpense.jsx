import { useState } from "react";
import { CATEGORIES } from "../constants";
import idb from '../idb'

export function AddExpense({ setExpenses }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (description.trim() === "") {
      setError("Description cannot be empty.");
      return;
    }

    if (amount <= 0) {
      setError("Amount should be a positive number.");
      return;
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      setError("Invalid date format.");
      return;
    }

    if (!CATEGORIES.includes(category)) {
      setError("Invalid category selected.");
      return;
    }

    const newExpense = {
      id: Math.random(),
      description,
      amount: parseFloat(amount),
      category,
      date: new Date(date),
    };

    const db = await idb.openCostsDB("costsdb", 1);
    await idb.addCost(db, newExpense);
    const allExpenses = await idb.getAllCosts(db);

    setError("");  
    setExpenses(allExpenses);
  };
  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => {
              console.log(e.target.value);
              setDate(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((category) => {
              return (
                <option key={category} value={category}>
                  {category}
                </option>
              );
            })}
          </select>
        </div>
        {error && <p className="text-danger">{error}</p>}

        <button type="submit" className="btn btn-primary">Add Expense</button>
      </form>
    </div>
  );
}
