let totalIncome = 0;
let totalExpenses = 0;

document.getElementById('income-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const incomeAmount = parseFloat(document.getElementById('income-amount').value);
    setTotalIncome(incomeAmount);
    document.getElementById('income-form').reset();
});

document.getElementById('expense-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const expenseName = document.getElementById('expense-name').value;
    const expenseAmount = parseFloat(document.getElementById('expense-amount').value);
    const expenseDate = document.getElementById('expense-date').value;
    const expenseRow = document.createElement('tr');
    
    expenseRow.innerHTML = `
        <td>${expenseName}</td>
        <td>${expenseAmount.toFixed(2)}</td>
        <td>${formatDate(expenseDate)}</td>
        <td><button class="delete-btn">Delete</button></td>
    `;
    
    // Add the new row to the table
    document.getElementById('expense-list').appendChild(expenseRow);
    
    // Update the total expenses
    totalExpenses += expenseAmount;
    updateTotalExpenses();
    
    // Clear the input fields
    document.getElementById('expense-form').reset();
});

document.getElementById('expense-list').addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
        const row = e.target.parentNode.parentNode;
        const amount = parseFloat(row.children[1].textContent);
        
        // Remove the expense from the total expenses
        totalExpenses -= amount;
        updateTotalExpenses();
        
        // Remove the row from the table
        row.remove();
    }
});

function setTotalIncome(amount) {
    totalIncome = amount;
    document.getElementById('total-income').textContent = totalIncome.toFixed(2);
    updateTotalBalance(); // Update balance when income is set
}

function updateTotalExpenses() {
    document.getElementById('total-expenses').textContent = totalExpenses.toFixed(2);
    updateTotalBalance();
}

function updateTotalBalance() {
    const totalBalance = totalIncome - totalExpenses;
    document.getElementById('total-balance').textContent = totalBalance.toFixed(2);
}

function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
}
