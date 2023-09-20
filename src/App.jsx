import { useEffect, useState } from "react";
import "./App.css";
import { AddExpense } from "./components/AddExpense";
import { ExpensesList } from "./components/ExpensesList";
import idb from "./idb";
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <div className="container centered-container">
        <div className="my-4">
          <h1 className="text-center">Costs Manager Client Application</h1>
          <h4 className="text-center text-muted">Final Project in Front-End Development</h4>
        </div>
        <AddExpense setExpenses={setExpenses} />
        <ExpensesList expenses={expenses} />
      </div>
  );
}


export default App;
