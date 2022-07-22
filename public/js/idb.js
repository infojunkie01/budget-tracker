let db;
const request = indexedDB.open('budget_tracker', 1);

request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore('new_transaction', { auto_increment: true });
}

request.onsuccess = function(event) {
    db = event.target.result;

    if (navigator.onLine) {
        //uploadTransaction();
    }
}

request.onerror = function(event) {
    console.log(event.target.errorCode);
}

function saveRecord(record) {
    const transaction = db.transaction(['new_transaction'], 'readwrite');

    const transactionObjectStore = transaction.objectStore('new_transaction')

    transactionObjectStore.add(record);
}

window.addEventListener('online', uploadTransaction)