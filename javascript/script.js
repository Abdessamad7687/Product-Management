// var
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");


let tmp
var mode = "create"

// get total

function getTotal() {
   if (price.value != '') {
      let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
      total.innerHTML = result;
      total.style.background = "green";
   }
   else {
      total.innerHTML = '';
   }
}

// create product
let dataProduct;
if (localStorage.product != null) {
   dataProduct = JSON.parse(localStorage.product);
}
else {
   dataProduct = [];
}

submit.addEventListener("click", function () {
   if (mode === "create") {
      let newProduct = {
         title: title.value,
         price: price.value,
         taxes: taxes.value,
         ads: ads.value,
         discount: discount.value,
         total: total.innerHTML,
         count: count.value,
         category: category.value
      }


         dataProduct.push(newProduct);
         localStorage.setItem('product', JSON.stringify(dataProduct));
         clearData()
         showData()
      

   }
   else {
      EditProduct(tmp)
      clearData()
      showData()
      mode = "create"
      submit.textContent = 'create'
   }

});

showData()



function clearData() {
   title.value = ""
   price.value = ""
   taxes.value = ""
   ads.value = ""
   discount.value = ""
   total.innerHTML = ""
   count.value = ""
   category.innerHTML = ""
}


function showData() {
   let table = "";
   for (let index = 0; index < dataProduct.length; index++) {
      table += `
      <tr>
            <td>${index + 1}</td>
            <td>${dataProduct[index].title}</td>
            <td>${dataProduct[index].price}</td>
            <td>${dataProduct[index].taxes}</td>
            <td>${dataProduct[index].ads}</td>
            <td>${dataProduct[index].discount}</td>
            <td>${dataProduct[index].total}</td>
            <td>${dataProduct[index].category}</td>
            <td><button id="update" onclick="EditProduct(${index})">Update</button></td>
            <td><button id="delete" onclick="deleteProduct(${index})">Delete</button></td>
      </tr> 
      `
   }
   document.getElementById("tbody").innerHTML = table;
}

function deleteProduct(id) {
   dataProduct.splice(id, 1)
   localStorage.setItem('product', JSON.stringify(dataProduct))
   showData()
}

function EditProduct(id) {
   mode = "update"
   submit.textContent = 'Update Product'
   tmp = id

   let newProduct = {
      title: title.value,
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerHTML,
      count: count.value,
      category: category.value
   }

   title.value = dataProduct[id].title,
      price.value = dataProduct[id].price,
      taxes.value = dataProduct[id].taxes,
      ads.value = dataProduct[id].ads,
      discount.value = dataProduct[id].discount,
      total.innerHTML = dataProduct[id].total,
      count.value = dataProduct[id].count,
      category.value = dataProduct[id].category
   total.style.background = "green"


   dataProduct[tmp] = newProduct
   localStorage.setItem('product', JSON.stringify(dataProduct))
   total.style.background = "red"
   showData()
}
