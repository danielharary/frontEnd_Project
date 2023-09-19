import { useEffect, useState } from "react";
import "./App.css";
import { AddExpense } from "./components/AddExpense";
import { CATEGORIES } from "./constants";
import { ExpensesList } from "./components/ExpensesList";
import idb from "./idb";
function App() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    async function fetchExpenses() {
      const db = await idb.openCostsDB("costsdb", 1);
      const allExpenses = await idb.getAllCosts(db);
      setExpenses(allExpenses);
    }

    fetchExpenses();
  }, []);

  return (
    <div>
      <AddExpense setExpenses={setExpenses} />
      <ExpensesList expenses={expenses} />
    </div>
  );
}

export default App;
