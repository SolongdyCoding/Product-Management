const btnAdd = document.querySelector("#btnAdd");
const btnClear = document.querySelector("#btnClear");
const productName = document.querySelector("#productName");
const price = document.querySelector("#price");
const qty = document.querySelector("#qty");
const total = document.querySelector("#total");
let totalNum = 0;
const table = document.querySelector("tbody");
const tableC = document.querySelector("table");

let i = 0;

window.addEventListener("DOMContentLoaded", function () {
  for (let j = 0; j < this.localStorage.length; j++) {
    const rowLoad = RowElement(
      JSON.parse(localStorage.getItem(`Product${j + 1}`)).nameProduct,
      JSON.parse(localStorage.getItem(`Product${j + 1}`)).price,
      JSON.parse(localStorage.getItem(`Product${j + 1}`)).qty
    );

    productArr.push({
      nameProduct: JSON.parse(localStorage.getItem(`Product${j + 1}`))
        .nameProduct,
      price: JSON.parse(localStorage.getItem(`Product${j + 1}`)).price,
      qty: JSON.parse(localStorage.getItem(`Product${j + 1}`)).qty,
    });

    totalNum = 0;

    for (let m = 0; m < productArr.length; m++) {
      totalNum =
        totalNum +
        JSON.parse(localStorage.getItem(`Product${m + 1}`)).price *
          JSON.parse(localStorage.getItem(`Product${m + 1}`)).qty;
    }

    table.appendChild(rowLoad);

    total.textContent = totalNum;
  }
});

const productArr = [];

btnAdd.addEventListener("click", () => {
  i = Init(i, localStorage);
  console.log(i);

  productArr.push({
    nameProduct: productName.value,
    price: price.value,
    qty: qty.value,
  });

  console.log(productArr);

  productName.value = "";
  price.value = "";
  qty.value = "";

  localStorage.setItem(`Product${i + 1}`, JSON.stringify(productArr[i]));

  const rowElement = RowElement(
    JSON.parse(localStorage.getItem(`Product${i + 1}`)).nameProduct,
    JSON.parse(localStorage.getItem(`Product${i + 1}`)).price,
    JSON.parse(localStorage.getItem(`Product${i + 1}`)).qty
  );

  table.appendChild(rowElement);

  totalNum = 0;

  for (let l = 0; l < productArr.length; l++) {
    totalNum =
      totalNum +
      JSON.parse(localStorage.getItem(`Product${l + 1}`)).price *
        JSON.parse(localStorage.getItem(`Product${l + 1}`)).qty;
  }

  total.textContent = totalNum;

  i++;
});

btnClear.addEventListener("click", () => {
  localStorage.clear();
  for (let k = 0; k < productArr.length; k++) {
    table.firstElementChild.remove();
  }
  productArr.splice(0, productArr.length);
  total.textContent = 0;
});

function RowElement(pName, pPrice, pQty) {
  const tr = document.createElement("tr");
  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  const td3 = document.createElement("td");
  const td4 = document.createElement("td");
  td1.textContent = pName;
  tr.appendChild(td1);
  td2.textContent = pPrice;
  tr.appendChild(td2);
  td3.textContent = pQty;
  tr.appendChild(td3);
  td4.textContent = parseFloat(pPrice) * parseFloat(pQty);
  tr.appendChild(td4);
  return tr;
}

function Init(init, lS) {
  if (lS.length == 0) {
    init = 0;
  } else {
    init = lS.length;
  }
  return init;
}
