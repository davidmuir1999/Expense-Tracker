const incomeBtn = document.getElementById("incomeBtn");
const expenseBtn = document.getElementById("expenseBtn");
const referenceInput = document.getElementById("referenceId");
const amountInput = document.getElementById("expenseAmount");
const categoryList = document.getElementById("categoriesContainer");
const addBtn = document.getElementById("addBtn");
const addExpense = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const modal = document.getElementById("expenseModal");
const incomeVsExpenses = document.getElementById("incomeVsExpenses");
const spendingByCategory = document.getElementById("spendingByCategory");

let selectedType = null;
let categoryType = null;
let expenses = [
  {
    type: "Income",
    reference: "Salary",
    amount: 3000,
    category: "Income",
    date: "Sept 1st",
  },
  {
    type: "Expense",
    reference: "Food",
    amount: 200,
    category: "Groceries",
    date: "Sept 12th",
  },
  {
    type: "Expense",
    reference: "Rent",
    amount: 1200,
    category: "Bills",
    date: "Sept 23rd",
  },
  {
    type: "Expense",
    reference: "Freelance",
    amount: 500,
    category: "Income",
    date: "Sept 29th",
  },
];

let spendingByCategoryChart;

const categoryObj = [
  {
    categoryName: "Bills",
    icon: "fa-solid fa-lightbulb",
    background: "#42A5F5",
  },
  {
    categoryName: "Charity",
    icon: "fa-solid fa-hand-holding-heart",
    background: "#FF7043",
  },
  {
    categoryName: "Eating Out",
    icon: "fa-solid fa-utensils",
    background: "#66BB6A",
  },
  {
    categoryName: "Entertainment",
    icon: "fa-solid fa-face-laugh",
    background: "#EC407A",
  },
  {
    categoryName: "Expenses",
    icon: "fa-solid fa-receipt",
    background: "#8D6E63",
  },
  {
    categoryName: "Family",
    icon: "fa-solid fa-house",
    background: "#FFCA28",
  },
  {
    categoryName: "Finances",
    icon: "fa-solid fa-money-bill",
    background: "#FFA726",
  },
  {
    categoryName: "General",
    icon: "fa-solid fa-shapes",
    background: "#7E57C2",
  },
  {
    categoryName: "Gifts",
    icon: "fa-solid fa-gift",
    background: "#26C6DA",
  },
  {
    categoryName: "Groceries",
    icon: "fa-solid fa-cart-shopping",
    background: "#EF5350",
  },
  {
    categoryName: "Holidays",
    icon: "fa-solid fa-suitcase",
    background: "#AB47BC",
  },
  {
    categoryName: "Income",
    icon: "fa-solid fa-arrow-left",
    background: "#29B6F6",
  },
  {
    categoryName: "Personal",
    icon: "fa-solid fa-heart",
    background: "#FF7043",
  },
  {
    categoryName: "Savings",
    icon: "fa-solid fa-seedling",
    background: "#66BB6A",
  },
  {
    categoryName: "Shopping",
    icon: "fa-solid fa-bag-shopping",
    background: "#5C6BC0",
  },
  {
    categoryName: "Transfers",
    icon: "fa-solid fa-money-bill-transfer",
    background: "#FFCA28",
  },
];

function updateHeaderBlock(){
    const currentDateElement = document.getElementById('currentDate');
    const remainingBalanceElement = document.getElementById('balance');

    currentDateElement.textContent = getCurrentDateAndMonth();

    const { totalIncome, totalExpense } = calculateIncomeAndExpenses(expenses);
    const remainingBalance = totalIncome - totalExpense;

    remainingBalanceElement.textContent = `Amount Left: £${remainingBalance}`
}

function categoryGenerator(obj) {
  obj.forEach((category) => {
    let categoryDiv = document.createElement("div");
    let categoryBtn = document.createElement("button");
    let categoryTitle = document.createElement("p");
    let categoryIcon = document.createElement("i");

    categoryIcon.className = category.icon;
    categoryTitle.textContent = category.categoryName;
    categoryBtn.style.backgroundColor = category.background;
    categoryBtn.type = "button";
    categoryDiv.className = "categoryDiv";

    categoryBtn.addEventListener("click", () => {
      const allButtons = document.querySelectorAll(".categoryDiv button");
      allButtons.forEach((button) => button.classList.remove("active"));

      categoryBtn.classList.add("active");
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
  if (!clickedBtn.classList.contains("active")) {
    clickedBtn.classList.add("active");
    otherBtn.classList.remove("active");
    selectedType = clickedBtn.textContent;
  }
}

incomeBtn.addEventListener("click", function () {
  toggleExpenseType(incomeBtn, expenseBtn);
});

expenseBtn.addEventListener("click", function () {
  toggleExpenseType(expenseBtn, incomeBtn);
});

function getCurrentDateAndMonth() {
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleDateString("en-UK", { month: "short" });
  const oridinalSuffix = getOridinalSuffix(day);

  function getOridinalSuffix(day) {
    if (day > 3 && day < 21) {
      return "th";
    }

    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }
  return `${month} ${day}${oridinalSuffix}`;
}

function toggleModal() {
  modal.classList.toggle("active");
  addExpense.classList.toggle("active");
  document.body.classList.toggle("modal-active");
}

addExpense.addEventListener("click", toggleModal);
closeModal.addEventListener("click", toggleModal);

function calculateIncomeAndExpenses(expenses) {
  let totalIncome = 0;
  let totalExpense = 0;

  expenses.forEach((expense) => {
    if (expense.type === "Income") {
      totalIncome += expense.amount;
    }
    if (expense.type === "Expense") {
      totalExpense += expense.amount;
    }
  });

  return { totalIncome, totalExpense };
}

function calculateSpendingByCategory(expenses) {
  const categoryTotals = {};

  expenses.forEach((expense) => {
    if (expense.type === "Expense") {
      if (!categoryTotals[expense.category]) {
        categoryTotals[expense.category] = 0;
      }
      categoryTotals[expense.category] += expense.amount;
    }
  });

  return categoryTotals;
}

const incomeVsExpensesChart = new Chart(incomeVsExpenses, {
  type: "bar",
  data: {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Amount",
        data: [0, 0],
        backgroundColor: ["#4caf50", "#f44336"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    layout: {
      padding: {
        left: 24,
        right: 24,
        bottom: 24,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.label + ": £" + tooltipItem.raw.toFixed(2);
          },
        },
      },
    },
  },
});

function getCategoryColor(categoryName) {
  const category = categoryObj.find((cat) => cat.categoryName === categoryName);
  return category.background;
}

function createSpendingByCategoryChart(categoryTotals) {
  const categories = Object.keys(categoryTotals);
  const amounts = Object.values(categoryTotals);

  const backgroundColors = categories.map((category) =>
    getCategoryColor(category)
  );

  if (spendingByCategoryChart) {
    spendingByCategoryChart.destroy();
  }

  spendingByCategoryChart = new Chart(spendingByCategory, {
    type: "doughnut",
    data: {
      labels: categories,
      datasets: [
        {
          label: "Spending by Category",
          data: amounts,
          backgroundColor: backgroundColors,
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.label + ": £" + tooltipItem.raw.toFixed(2);
            },
          },
        },
      },
      layout: {
        padding: {
          left: 24,
          right: 24,
          bottom: 24,
        },
      },
    },
  });
}

function updateIncomeVsExpensesChart() {
  const { totalIncome, totalExpense } = calculateIncomeAndExpenses(expenses);

  incomeVsExpensesChart.data.datasets[0].data = [totalIncome, totalExpense];

  incomeVsExpensesChart.update();
}

function updateSpendingByCategoryChart() {
  const categoryTotals = calculateSpendingByCategory(expenses);

  createSpendingByCategoryChart(categoryTotals);
}

function populateActivityTable(expenses) {
    const reverseExpenses = expenses.reverse()
    const tableBody = document.querySelector('#transactionList tbody');
    tableBody.innerHTML = '';

    reverseExpenses.forEach((expense) => {
        const row = document.createElement('tr');

        const dateCell = document.createElement('td');
        const referenceCell = document.createElement('td');
        const categoryCell = document.createElement('td');
        const typeCell = document.createElement('td');
        const amountCell = document.createElement('td');

        dateCell.textContent = expense.date;
        referenceCell.textContent = expense.reference;
        categoryCell.textContent = expense.category;
        typeCell.textContent = expense.type;
        
        amountCell.textContent = `£${expense.amount.toFixed(2)}`;

        row.appendChild(referenceCell);
        row.appendChild(amountCell);
        row.appendChild(categoryCell);
        row.appendChild(typeCell);
        row.appendChild(dateCell);

        tableBody.appendChild(row);
    });
}

function initialize() {
  updateIncomeVsExpensesChart();
  updateSpendingByCategoryChart();
  populateActivityTable(expenses);
  updateHeaderBlock()
}

window.addEventListener("DOMContentLoaded", initialize);

addBtn.addEventListener("click", function () {
  const reference = referenceInput.value;
  const amount = parseFloat(amountInput.value);

  if (!selectedType || !reference || isNaN(amount) || !categoryType) {
    alert("Please fill out all fields");
    return;
  }

  const expense = {
    type: selectedType,
    reference: reference,
    amount: amount,
    category: categoryType,
    date: getCurrentDateAndMonth(),
  };

  referenceInput.value = "";
  amountInput.value = "";

  const allCategoryButtons = document.querySelectorAll(".categoryDiv button");
  allCategoryButtons.forEach((button) => {
    button.classList.remove("active");
  });

  incomeBtn.classList.remove("active");
  expenseBtn.classList.remove("active");

  expenses.push(expense);

  initialize();

  modal.scrollTop = 0;

  toggleModal();
});
