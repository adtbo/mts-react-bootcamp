let customers = [
    {
        accountNumber: '123456',
        accountName: 'Anakin Skywalker',
        balance: 1000,
    },
    {
        accountNumber: '234567',
        accountName: 'Padme Amidala',
        balance: 2000,
    },
    {
        accountNumber: '345678',
        accountName: 'Leia Organa',
        balance: 500,
    },
    {
        accountNumber: '345678',
        accountName: 'Luke Skywalker',
        balance: 100,
    }
];
const actions = {
    WITHDRAW: 'withdraw',
    DEPOSIT: 'deposit',
};
const errors = {
    INSUFFICIENT: 'Balance is insuficient!',
    NO_ACCOUNT: 'Customer account not found!',
};
let selectedCustomer = {};
let transactionType = '';

const formAccount = document.getElementById('form-account');
const withdrawButton = document.getElementById('withdraw-action');
const depositButton = document.getElementById('deposit-action');
const formAmount = document.getElementById('form-amount');
const transactionAmount = document.getElementById('transaction-amount');
const alertModal = document.getElementById('alert-modal');
const closeModal = document.getElementsByClassName('modal-close')[0];

const getCustomer = (accountNumber) => (
    new Promise((resolve, reject) => {
        const customer = customers.find((item) => (
            item.accountNumber === accountNumber
        ));

        if ( !!customer ) {
            resolve(customer);
        } else {
            reject(errors.NO_ACCOUNT);
        }
    })
);

const onActionButtonClick = (type) => (event) => {
    event.preventDefault();

    transactionType = type;
    formAmount.style.display = 'flex';
    transactionAmount.placeholder = `Input ${type} amount`;
    transactionAmount.value = null;
};

const updateBalance = (balance) => {
    const userBalance = document.getElementById('user-balance');

    userBalance.innerText = balance;
};

const toggleInfoSection = (isShow, balance) => {
    const infoContainer = document.getElementById('info-container');
    const transactionAction = document.getElementById('transaction-action');
    
    updateBalance(balance);
    if(isShow){
        infoContainer.style.display = 'flex';
        transactionAction.style.display = 'flex';
    } else {
        formAmount.style.display = 'none';
        infoContainer.style.display = 'none';
        transactionAction.style.display = 'none';
    };
};

const onDeposit = (customer, amount) => (
    new Promise((resolve, reject) => {
        const customerExist = customers.find((item) => (
            item.accountNumber === customer.accountNumber
        )); //make sure customer exist

        if ( !!customerExist ) {
            resolve(customer.balance + amount);
        } else {
            reject(errors.NO_ACCOUNT);
        }
    })
);

const onWithdraw = (customer, amount) => (
    new Promise((resolve, reject) => {
        const customerExist = customers.find((item) => (
            item.accountNumber === customer.accountNumber
        )); //make sure customer exist

        if ( !!customerExist ) {
            if(amount > customer.balance){
                reject(errors.INSUFFICIENT);
            }
            resolve(customer.balance - amount);
        } else {
            reject(errors.NO_ACCOUNT);
        }
    })
);

const onSubmitTransaction = (processTransaction, amount) => {
    processTransaction(selectedCustomer, amount).then(result => {
        alertModal.style.display = "block";
        selectedCustomer.balance = result;
        updateBalance(result);
    }).catch(err => {
        alert(err);
    });
};

formAccount.addEventListener('submit', (e) => {
    e.preventDefault();

    const accountNumberValue = document.getElementById('account-number').value;

    getCustomer(accountNumberValue).then((result) => {
        selectedCustomer = result;
        toggleInfoSection(true, selectedCustomer.balance);
    }).catch(err => {
        selectedCustomer = {};
        toggleInfoSection(false, null);
        alert(err);
    });
});

formAmount.addEventListener('submit', (e) => {
    e.preventDefault();

    onSubmitTransaction(
        transactionType === actions.DEPOSIT ? onDeposit : onWithdraw,
        Number(transactionAmount.value)
    );
});

closeModal.onclick = function() {
    alertModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == alertModal) {
        alertModal.style.display = "none";
    }
}

withdrawButton.addEventListener('click', onActionButtonClick(actions.WITHDRAW));
depositButton.addEventListener('click', onActionButtonClick(actions.DEPOSIT));


