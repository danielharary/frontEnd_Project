import { useState } from "react";
import { CATEGORIES } from "../constants";
import idb from '../idb'

export function AddExpense({ setExpenses }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [category, setCategory] = useState(CATEGORIES[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    setExpenses(allExpenses);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => {
            console.log(e.target.value);
            setDate(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
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
      <button type="submit">Add Expense</button>
    </form>
  );
}
