
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
// console.log(title, price, total)

let mode = 'create';
let temp;



// get total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'rgb(118, 192, 7)';
    } else
    //to clear data from total when user delete the data & change bakeground to previous color
    {
        total.innerHTML = '';
        total.style.background = 'rgb(192, 32, 7)';
    }

}
//CREATE PRODUCR

let datapro;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product);

}
else {
    datapro = [];
}


submit.onclick = function () {

    let newpro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }
if(title.value != '' &&
 price.value != '' &&
  category.value != '' &&
  newpro.count<100)//to have clean dtat
{
    if (mode === 'create') {
        if (newpro.count > 1) {

            for (let i = 0; i < newpro.count; i++) {
                datapro.push(newpro);
            }
        } else {
            datapro.push(newpro);
        }

    } else {
        datapro[temp] = newpro;
        mode = 'create';
        count.style.display = 'block';
        submit.innerHTML = "create";
    }
    clearInput();
    //put here to delete data just when create product
}


   

    //save at local storage
    localStorage.setItem('product', JSON.stringify(datapro));
    showData();
    


}

showData();
//clear input

function clearInput() {

    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';

}
//read data

function showData() {
    getTotal();


    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        //+= => to add new row & save previus row
        table += ` 
        <tr>
        <td>${i+1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td> <button onclick=updateData(${i}) id="update">update</button></td>
        <td><button  onclick=deleteData(${i}) id="delete">delete</button></td>
        
    </tr>`
    }

    document.getElementById('tbody').innerHTML = table;
    let btnDeleteAll = document.getElementById('deleteAll');
    if (datapro.length > 0) {
        btnDeleteAll.innerHTML = `
        <button onclick=deleteAll() >Delete All (${datapro.length})</button>

        `
    }
    else {
        btnDeleteAll.innerHTML = ''
    }


}


//delete
function deleteData(i) {
    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro);
    showData();

}

//delete all
function deleteAll() {
    localStorage.clear();
    datapro.splice(0);//0 =>delete everythingh in the array
    showData();

}

//update

function updateData(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    total.innerHTML = datapro[i].total;
    category.value = datapro[i].category;
    count.style.display = 'none';
    submit.innerHTML = 'update'
    getTotal();
    mode = 'update';
    temp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })
}

//search

let searchMode = 'title';
//mode
function getSearchMode(id) {
    let search = document.getElementById('search');

    if (id == 'searchTitle') {
        searchMode = 'title'

    }
    else {
        searchMode = 'category'

    }
    search.focus();
    search.placeholder = 'search by ' + searchMode;
    search.value='';
    showData();

}

//search data
function searchData(value) {
    let table = '';

    for (let i = 0; i < datapro.length; i++) {

        if (searchMode == 'title') {


            if (datapro[i].title.includes(value)) {
                table += `
                 <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td> <button onclick=updateData(${i}) id="update">update</button></td>
                    <td><button  onclick=deleteData(${i}) id="delete">delete</button></td>

                    </tr>`

            }


        }
        else {


            if (datapro[i].category.includes(value.toLowerCase())) {
                table += `
                     <tr>
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td> <button onclick=updateData(${i}) id="update">update</button></td>
                        <td><button  onclick=deleteData(${i}) id="delete">delete</button></td>
    
                        </tr>`

            }


        }
        document.getElementById('tbody').innerHTML = table;


    }


}




















