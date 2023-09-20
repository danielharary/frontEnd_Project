import { useState, useMemo } from "react";

export function ExpensesList({ expenses }) {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const expenseMonth = expense.date.getMonth();
      const expenseYear = expense.date.getFullYear();
      return (
        (!month || expenseMonth === parseInt(month)) &&
        (!year || expenseYear === parseInt(year))
      );
    });
  }, [expenses, month, year]);

  const months = [
    "All",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = [
    "All",
    "2023",
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
    "2015",
  ];

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Expenses List</h2>

      <div className="mb-3">
        <label htmlFor="month" className="form-label">Month</label>
        <select
          name="month"
          id="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="form-control"
        >
          {months.map((m, idx) => (
            <option key={idx} value={idx === 0 ? "" : idx - 1}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="year" className="form-label">Year</label>
        <select
          name="year"
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="form-control"
        >
          {years.map((y) => (
            <option key={y} value={y === "All" ? "" : y}>
              {y}
            </option>
          ))}
        </select>
      </div>
      <div className="expenses-table-container">
  <table className="table table-striped">
    <thead>
      <tr>
        <th>Description</th>
        <th>Amount</th>
        <th>Category</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {filteredExpenses.map((expense) => (
        <tr key={expense.id}>
          <td>{expense.description}</td>
          <td>{expense.amount}</td>
          <td>{expense.category}</td>
          <td>{expense.date.toLocaleDateString("en-GB")}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>



    </div>
  );
}
