const incomeBtn = document.getElementById('incomeBtn');
const outcomeBtn = document.getElementById('outcomeBtn');
const referenceInput = document.getElementById('referenceId');
const amountInput = document.getElementById('expenseAmount');
const categorySelect = document.getElementById('categories');
const addBtn = document.getElementById('addBtn');

let selectedType = null;
let totalAmount = 0;
let expenses = [];

function toggleButton(clickedBtn, otherBtn) {
    if (!clickedBtn.classList.contains('active')) {
        clickedBtn.classList.add('active');
        otherBtn.classList.remove('active');
        selectedType = clickedBtn.textContent;
    }
}

incomeBtn.addEventListener('click', function () {
    toggleButton(incomeBtn, outcomeBtn);
});

outcomeBtn.addEventListener('click', function () {
    toggleButton(outcomeBtn, incomeBtn);
});

addBtn.addEventListener('click', function() {
    const reference = referenceInput.value;
    const amount = parseFloat(amountInput.value);
    const category = categorySelect.value;

    if(!selectedType || ! reference || isNaN(amount) || !category){
        alert('Please fill out all fields and select Income/Outcome');
        return;
    }

    const expense = {
        type: selectedType,
        reference: reference,
        amount: amount,
        category: category
    };

    expenses.push(expense);

    if(selectedType === 'Income'){
        totalAmount += amount;
    } else if (selectedType === 'Outcome'){
        totalAmount -= amount;
    }

    referenceInput.value = '';
    amountInput.value = '';
    categorySelect.value = '';

    incomeBtn.classList.remove('active');
    outcomeBtn.classList.remove('active');

    console.log(expense);
    console.log(expenses);
    console.log(totalAmount);
});

