let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category')
let submit = document.getElementById('submit');
let table = document.getElementById('table');
let globalIndex;
let mood = 'create';
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
function clearInputs() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    category.value = '';
    count.value = '';
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
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        category: category.value.toLowerCase(),
        count: count.value
    }
    if(title.value !=''&& 
        price.value!='' &&
        category.value!=''
    && count.value<=100)
    {
          if (mood === 'create') {
        if (newPro.count > 1) {
            for (let i = 0; i < newPro.count; i++) {
                dataPro.push(newPro);
            }
        }
        else {
            dataPro.push(newPro);
        }
    }

    else {
        dataPro[globalIndex] = newPro;
        submit.innerHTML = 'Create';
        mood = 'create';
        count.style.display = 'block';
    }
    clearInputs();

    }
  

    localStorage.setItem("product", JSON.stringify(dataPro));
    displayInputs();
})



//read
function displayInputs() {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
         
           <tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick =update(${i}) id="update">update</button></td>
                        <td><button onclick=deletData(${i}) id="delete">delete</button></td>


                    </tr>
         
         `
    }
    document.getElementById('tbody').innerHTML = table;
    let btndelete = document.getElementById('deleteAll');
    if (dataPro.length > 0) {
        btndelete.innerHTML = ` <button onclick=deleteall()>delete All(${dataPro.length})</button>  `


    }
    else {
        btndelete.innerHTML = '';
    }
    getTotal();
}
displayInputs();


//delete
function deletData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    displayInputs();

}
function deleteall() {
    localStorage.clear();
    dataPro = [];
    displayInputs();
}










//update
function update(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    submit.innerHTML = 'Update';
    count.style.display = 'none';
    getTotal();
    globalIndex = i;
    mood = 'update';
    scroll({
        top: 0,
        behavior: "smooth"
    })
}



//search
let searchMood = 'title';
function getSearchMood(id) {
    let search = document.getElementById('search');
    if (id == 'searchTitle') {
        searchMood = 'title';
    }
    else {
        searchMood = 'category';
    }
    search.placeholder = 'Search By ' + searchMood;

    search.focus();
    search.value = '';
    displayInputs();

}
function searchData(value) {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {

        if (searchMood === 'title') {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
         
        <tr>
                     <td>${i + 1}</td>
                     <td>${dataPro[i].title}</td>
                     <td>${dataPro[i].price}</td>
                     <td>${dataPro[i].taxes}</td>
                     <td>${dataPro[i].ads}</td>
                     <td>${dataPro[i].discount}</td>
                     <td>${dataPro[i].total}</td>
                     <td>${dataPro[i].category}</td>
                     <td><button onclick =update(${i}) id="update">update</button></td>
                     <td><button onclick=deletData(${i}) id="delete">delete</button></td>


                 </tr>
      
      `
            }
        }
        else {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += `
         
        <tr>
                     <td>${i + 1}</td>
                     <td>${dataPro[i].title}</td>
                     <td>${dataPro[i].price}</td>
                     <td>${dataPro[i].taxes}</td>
                     <td>${dataPro[i].ads}</td>
                     <td>${dataPro[i].discount}</td>
                     <td>${dataPro[i].total}</td>
                     <td>${dataPro[i].category}</td>
                     <td><button onclick =update(${i}) id="update">update</button></td>
                     <td><button onclick=deletData(${i}) id="delete">delete</button></td>


                 </tr>
      
      `
            }
        }
    }

    document.getElementById('tbody').innerHTML = table;

}