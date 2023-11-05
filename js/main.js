let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
let totalSumTotal = document.getElementById("totalSumTotal");
let mood = "create";
let temp;
let totalSum = 0;

//function to get total
function getTotal() {
    if (price.value !== "") {
        let result = (+price.value + +taxes.value + +ads.value)
            - +discount.value;
        total.innerHTML = result;
        total.style.background = "#040"
    } else {
        total.innerHTML = "";
        total.style.background = "#a00d02";
    }
}
//save data in local storage
let dataProduct;
if (localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product);
} else {
    dataProduct = [];
}
// function to create product
submit.onclick = function () {
    let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    //To create multiple products [count]
    if (title.value != "" && price.value != "" && count.value < 100) {       //function to validate data
        if (mood === "create") {
            if (newProduct.count > 1) {
                for (let i = 0; i < newProduct.count; i++) {
                    dataProduct.push(newProduct);
                }
            } else {
                dataProduct.push(newProduct);
            }
        } else {
            dataProduct[temp] = newProduct;
            mood = "create";
            submit.innerHTML = "create";
            count.style.display = "block"
        }
        clearData();
    }

    localStorage.setItem("product", JSON.stringify(dataProduct))
    showData();
}
//function to clear inputs after creation
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}
//function to read data
function showData() {
    getTotal();
    let tabel = "";
    for (let i = 0; i < dataProduct.length; i++) {
        tabel += `
        <tr>
        <td>${i + 1}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>
        `;

    }
    document.getElementById("tbody").innerHTML = tabel;
    let deleteAllBtn = document.getElementById("deleteall");
    if (dataProduct.length > 0) {
        deleteAllBtn.innerHTML = `
        <button onclick="deleteAll()">Delete All (${dataProduct.length}) </button>
        `;
    } else {
        deleteAllBtn.innerHTML = '';
    }
}
showData();
//function to update
function updateData(i) {
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    getTotal();
    count.style.display = "none";
    category.value = dataProduct[i].category;
    submit.innerHTML = "update";
    mood = "update";
    temp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })
}
//function to delete item
function deleteData(i) {
    dataProduct.splice(i, 1);
    localStorage.product = JSON.stringify(dataProduct);
    showData();
}
//function to delete all items
function deleteAll() {
    localStorage.clear();
    dataProduct.splice(0);
    showData();
};
//function to search
let searchMood = "title";
function getSearchMood(id) {
    if (id == "searchtitle") {
        searchMood = "title";
        search.placeholder = 'بحث بالاسم';
    } else {
        searchMood = "category";
        search.placeholder = 'بحث بالقسم';
    }
    search.focus();
    search.value = "";
    showData();
}

function searchData(value) {
    let tabel = "";
    if (searchMood == "title") {
        for (let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i].title.includes(value.toLowerCase())) {
                tabel += `
                    <tr>
                    <td>${i + 1}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                    </tr>
                    `;
            }
        }

    } else {
        for (let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i].category.includes(value.toLowerCase())) {
                tabel += `
                    <tr>
                    <td>${i + 1}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                    </tr>
                    `;
            }
        }
    }
    document.getElementById("tbody").innerHTML = tabel;
}
for (let i = 0; i < dataProduct.length; i++) {
    totalSum += Number(dataProduct[i].total);
}
totalSumTotal.innerHTML = `المجموع الكلي :   ${totalSum}`;
totalSumTotal.style.cssText = "padding:0; font-size:18px; background-color:#040;"

