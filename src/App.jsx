import { useState } from "react";
import "./App.css";
import { AddExpense } from "./components/AddExpense";
import { CATEGORIES } from "./constants";
import { ExpensesList } from "./components/ExpensesList";

function App() {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      description: "launch",
      category: CATEGORIES[0],
      amount: 50,
      date: new Date(),
    },
    {
      id: 2,
      description: "launch",
      category: CATEGORIES[0],
      amount: 50,
      date: new Date(),
    },
  ]);

  return (
    <div>
      <AddExpense setExpenses={setExpenses} />
      <ExpensesList expenses={expenses} />
    </div>
  );
}

export default App;
