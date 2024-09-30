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
const expenseTrends = document.getElementById("expenseTrends");
const topExpenses = document.getElementById("topExpenses");
const savingsRate = document.getElementById("savingsRate");
const expenseFrequency = document.getElementById("expenseFrequency");

let selectedType = null;
let categoryType = null;
let expenses = [];

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

const incomeVsExpensesChart = new Chart(incomeVsExpenses, {
  type: "bar",
  data: {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Amount",
        data: [0, 0],
        backgroundColor: ["rgba(76, 175, 80, 0.2)", "rgba(244, 67, 54, 0.2)"],
        borderColor: ["rgba(76, 175, 80, 1)", "rgba(244, 67, 54, 1)"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

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
  
    const { totalIncome, totalExpense } = calculateIncomeAndExpenses(expenses);

    incomeVsExpensesChart.data.datasets[0].data = [totalIncome, totalExpense];
  
    incomeVsExpensesChart.update();

    modal.scrollTop = 0;

    toggleModal();
  });
