let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category')
let submit = document.getElementById('submit');
let table=document.getElementById('table');

//get total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "#040";
    }
    else {
        total.innerHTML = "";
        total.style.backgroundColor = "#a00d02"
    }

}



//create 
function clearInputs(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    category.value='';
    count.value='';
}

let dataPro;

if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
}
else {
    dataPro = [];
}
submit.addEventListener('click', function () {

   let newPro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: WebTransportDatagramDuplexStream.innerHTML,
        category: category.value,
        count: count.value
    }
    dataPro.push(newPro);
    localStorage.setItem("product", JSON.stringify(dataPro));
   clearInputs();
  displayInputs();
})
//read
function displayInputs(){
 let table='';
    for(let i=0; i<dataPro.length; i++){
         table+=`
         
           <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button id="update">update</button></td>
                        <td><button id="delete">delete</button></td>


                    </tr>
         
         `
    }
    document.getElementById('tbody').innerHTML=table;

}
displayInputs();