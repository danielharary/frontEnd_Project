import { useState } from "react";

export function ExpensesList({ expenses }) {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const filteredExpenses = expenses.filter((expense) => {
    if (month && year) {
      console.log("month", month);
      return (
        expense.date.getMonth() === parseInt(month) &&
        expense.date.getFullYear() === parseInt(year)
      );
    } else if (month) {
      return expense.date.getMonth() === parseInt(month);
    } else if (year) {
      return expense.date.getFullYear() === parseInt(year);
    } else {
      return true;
    }
  });

  return (
    <div>
      <h2>Expenses List</h2>
      <label htmlFor="month">Month</label>
      <select
        name="month"
        id="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      >
        <option value="">All</option>
        <option value="0">January</option>
        <option value="1">February</option>
        <option value="2">March</option>
        <option value="3">April</option>
        <option value="4">May</option>
        <option value="5">June</option>
        <option value="6">July</option>
        <option value="7">August</option>
        <option value="8">September</option>
        <option value="9">October</option>
        <option value="10">November</option>
        <option value="1">December</option>
      </select>

      <label htmlFor="year">Year</label>
      <select
        name="year"
        id="year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      >
        <option value="">All</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
        <option value="2019">2019</option>
        <option value="2018">2018</option>
        <option value="2017">2017</option>
        <option value="2016">2016</option>
        <option value="2015">2015</option>
      </select>

      <ul>
        {filteredExpenses.map((expense) => {
          return (
            <li key={expense.id}>
              {expense.description}: {expense.amount} ({expense.category}) -{" "}
              {expense.date.toLocaleDateString("en-GB")}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
