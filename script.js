const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//     { id:1, text: 'Flower', amount: -20 },
//     { id:2, text: 'Salary', amount: 300 },
//     { id:3, text: 'Book', amount: -10 },
//     { id:4, text: 'Camera', amount: 300 }
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

function addTransaction(e){
    e.preventDefault();

    if(text.value.trim() === '' || amount.value.trim() === ''){
        alert('Please add a text and amount');
    }
    else{
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: Number(amount.value)
        }
        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();
        text.value = '';
        amount.value = '';
    }
}

function generateID() {
    return Math.floor(Math.random()*10000);
}

function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>
    `;
    list.appendChild(item);
}

function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    let total = 0, income = 0, expense = 0;
    for(let i=0;i<amounts.length;i++){
        total += amounts[i];
        if(amounts[i] > 0){
            income += amounts[i];
        }
        else{
            expense += amounts[i];
        }
    }
    total = total.toFixed(2);
    expense = -1*expense.toFixed(2);
    income = income.toFixed(2);
    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}

function removeTransaction(id){
    transactions = transactions.filter(transaction => {
        return transaction.id !== id;
    });

    updateLocalStorage();
    init();
}

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}


function init(){
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM);
    updateValues();
}


init();


form.addEventListener('submit', addTransaction);