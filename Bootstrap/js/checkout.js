let orderItem = document.querySelectorAll('.order-item');
let addBtn = document.querySelectorAll('.add');
let reduceBtn = document.querySelectorAll('.reduce');
let inputCount = document.querySelectorAll('.count-number');
let itemSubtotal = document.querySelectorAll('.subtotal');
let unitPrice = document.querySelectorAll('.unit-price');

let sumCount = document.querySelector('.sum-count');
let sumSubtotal = document.querySelector('.sum-subtotal');
let sumFee = document.querySelector('.sum-fee');
let sumTotal = document.querySelector('.sum-total');

window.onload = function () {
    calculateItemSubtotal();
};

addBtn.forEach(function (elem, index) {
    elem.addEventListener('click', function () {
        buttonHandler(index, 1);
    });
});

reduceBtn.forEach(function (elem, index) {
    elem.addEventListener('click', function () {
        buttonHandler(index, -1);
    });
});

inputCount.forEach(function (elem, index) {
    elem.addEventListener('change', function () {
        if (inputCount[index].value <= 0) {
            inputCount[index].value = 1;
        };

        calculateItemSubtotal();
    });
});

// 處理 + / - 按鈕事件
function buttonHandler(index, num) {
	if (inputCount[index].value == 1 && num == -1) {
		let yes = confirm('你是否要將該商品從購物車中刪除？');
		if (yes) {
			orderItem[index].remove();
		} else {
			return;
		};
	};

	inputCount[index].value = Number(inputCount[index].value) + num;
	calculateItemSubtotal();
};

// 計算每個單品小計
function calculateItemSubtotal() {
    itemSubtotal.forEach(function (elem, index) {
        elem.innerHTML = Number(unitPrice[index].textContent) * Number(inputCount[index].value);
    });

    calculateOrderSum();
};

function calculateOrderSum() {
    let count = 0;
    let subtotal = 0;
    let fee = 8;

    for (let i = 0; i < orderItem.length; i++) {
        count += Number(inputCount[i].value);
        subtotal += Number(itemSubtotal[i].textContent);
    };

    if (subtotal >= 50) {
        fee = 0;
    };

    sumCount.innerHTML = count;
    sumSubtotal.innerHTML = subtotal;
    sumFee.innerHTML = fee;
    sumTotal.innerHTML = subtotal + fee;
};


// $('.add').click(function () {
    
// })