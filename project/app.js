// Selecting necessary DOM elements
const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("expense-amount");
const addExpenseButton = document.getElementById("add-expense");
const expenseList = document.getElementById("expense-list").getElementsByTagName("tbody")[0];
const totalAmountDisplay = document.getElementById("total");

// Initialize an empty array for storing expenses
let expenses = [];

// Function to add a new expense
function addExpense() {
  const name = expenseName.value.trim();
  const amount = parseFloat(expenseAmount.value.trim());

  if (name && !isNaN(amount) && amount > 0) {
    // Create an expense object and push it to the array
    const expense = { name, amount };
    expenses.push(expense);

    // Add expense to the table
    const row = expenseList.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    
    cell1.textContent = name;
    cell2.textContent = `$${amount.toFixed(2)}`;
    cell3.innerHTML = `<button onclick="removeExpense(${expenses.length - 1})">Delete</button>`;

    // Reset input fields
    expenseName.value = '';
    expenseAmount.value = '';

    // Update the total amount
    updateTotal();
  } else {
    alert("Please enter valid expense details.");
  }
}

// Function to remove an expense
function removeExpense(index) {
  // Remove the expense from the array
  expenses.splice(index, 1);

  // Re-render the expense list
  renderExpenseList();
  // Update the total amount
  updateTotal();
}

// Function to render the updated list of expenses
function renderExpenseList() {
  // Clear the current list
  expenseList.innerHTML = '';

  // Re-populate the table with the updated expenses
  expenses.forEach((expense, index) => {
    const row = expenseList.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    
    cell1.textContent = expense.name;
    cell2.textContent = `$${expense.amount.toFixed(2)}`;
    cell3.innerHTML = `<button onclick="removeExpense(${index})">Delete</button>`;
  });
}

// Function to update the total amount of all expenses
function updateTotal() {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalAmountDisplay.textContent = `$${total.toFixed(2)}`;
}

// Add event listener for the "Add Expense" button
addExpenseButton.addEventListener("click", addExpense);
