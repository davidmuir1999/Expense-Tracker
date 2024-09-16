const incomeBtn = document.getElementById('incomeBtn');
const outcomeBtn = document.getElementById('outcomeBtn');
const referenceInput = document.getElementById('referenceId');
const amountInput = document.getElementById('expenseAmount');
const categoryList = document.getElementById('categoriesContainer');
// const categoryEntry = document.getElementById('category');
const addBtn = document.getElementById('addBtn');

let selectedType = null;
let categoryType = null;
let totalAmount = 0;
let expenses = [];

const categoryObj = [
    {
        categoryName: 'Bills',
        icon: 'fa-solid fa-lightbulb',
        background: '#42A5F5'
    },
    {
        categoryName: 'Charity',
        icon: 'fa-solid fa-hand-holding-heart',
        background: '#FF7043'
    },
    {
        categoryName: 'Eating Out',
        icon: 'fa-solid fa-utensils',
        background: '#66BB6A'
    },
    {
        categoryName: 'Entertainment',
        icon: 'fa-solid fa-face-laugh',
        background: '#EC407A'
    },
    {
        categoryName: 'Expenses',
        icon: 'fa-solid fa-receipt',
        background: '#8D6E63'
    },
    {
        categoryName: 'Family',
        icon: 'fa-solid fa-house',
        background: '#FFCA28'
    },
    {
        categoryName: 'Finances',
        icon: 'fa-solid fa-money-bill',
        background: '#FFA726'
    },
    {
        categoryName: 'General',
        icon: 'fa-solid fa-shapes',
        background: '#7E57C2'
    },
    {
        categoryName: 'Gifts',
        icon: 'fa-solid fa-gift',
        background: '#26C6DA'
    },
    {
        categoryName: 'Groceries',
        icon: 'fa-solid fa-cart-shopping',
        background: '#EF5350'
    },
    {
        categoryName: 'Holidays',
        icon: 'fa-solid fa-suitcase',
        background: '#AB47BC'
    },
    {
        categoryName: 'Income',
        icon: 'fa-solid fa-arrow-left',
        background: '#29B6F6'
    },
    {
        categoryName: 'Personal',
        icon: 'fa-solid fa-heart',
        background: '#FF7043'
    },
    {
        categoryName: 'Savings',
        icon: 'fa-solid fa-seedling',
        background: '#66BB6A'
    },
    {
        categoryName: 'Shopping',
        icon: 'fa-solid fa-bag-shopping',
        background: '#5C6BC0'
    },
    {
        categoryName: 'Transfers',
        icon: 'fa-solid fa-money-bill-transfer',
        background: '#FFCA28'
    }
];

function categoryGenerator(obj) {
    obj.forEach(category => {
        let categoryDiv = document.createElement('div');
        let categoryBtn = document.createElement('button');
        let categoryTitle = document.createElement('p');
        let categoryIcon = document.createElement('i');

        categoryIcon.className = category.icon;
        categoryTitle.textContent = category.categoryName;
        categoryBtn.style.backgroundColor = category.background
        categoryDiv.className = 'categoryDiv';

        categoryBtn.addEventListener('click', () => {
            const allButtons = document.querySelectorAll('.categoryDiv button');
            allButtons.forEach(button => button.classList.remove('active'));

            categoryBtn.classList.add('active');
            categoryType = category.categoryName;
        });

        categoryBtn.appendChild(categoryIcon);
        categoryDiv.appendChild(categoryBtn);
        categoryDiv.appendChild(categoryTitle);

        categoryList.appendChild(categoryDiv);
    });
}

categoryGenerator(categoryObj);

function toggleExpenseType(clickedBtn, otherBtn) {
    if (!clickedBtn.classList.contains('active')) {
        clickedBtn.classList.add('active');
        otherBtn.classList.remove('active');
        selectedType = clickedBtn.textContent;
    }
}

incomeBtn.addEventListener('click', function () {
    toggleExpenseType(incomeBtn, outcomeBtn);
});

outcomeBtn.addEventListener('click', function () {
    toggleExpenseType(outcomeBtn, incomeBtn);
});

addBtn.addEventListener('click', function () {
    const reference = referenceInput.value;
    const amount = parseFloat(amountInput.value);

    if (!selectedType || !reference || isNaN(amount) || !categoryType) {
        alert('Please fill out all fields and select Income/Outcome');
        return;
    }

    const expense = {
        type: selectedType,
        reference: reference,
        amount: amount,
        category: categoryType
    };

    expenses.push(expense);

    if (selectedType === 'Income') {
        totalAmount += amount;
    } else if (selectedType === 'Outcome') {
        totalAmount -= amount;
    }

    referenceInput.value = '';
    amountInput.value = '';

    const allCategoryButtons = document.querySelectorAll('.categoryDiv button');
    allCategoryButtons.forEach(button => {
        button.classList.remove('active');
    })

    incomeBtn.classList.remove('active');
    outcomeBtn.classList.remove('active');

    console.log(expense);
    console.log(expenses);
    console.log(totalAmount);
});

