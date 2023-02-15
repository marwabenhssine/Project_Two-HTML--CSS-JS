
//Select Elements
let title = document.querySelector("#title")
let price = document.querySelector("#prices");
let taxes = document.querySelector("#taxes")
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let total = document.querySelector("#total");
let submit = document.getElementById("submit")



let mood = "create";
let temp;

function getTotal() {
    
    if(price.value !== '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value

        total.innerHTML = result;
        total.style.background = "#024f2b";
    } else {
        total.innerHTML = '';
        total.style.background = '#760000'
    }

}

let dataPro;
if (localStorage.getItem("product") !== null) {
    
    dataPro = JSON.parse(localStorage.getItem("product")); 
    
} else {
    dataPro = []; 
}

submit.onclick = function () {
    let newPro = {
        title: title.value.toLocaleLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLocaleLowerCase(),
    };
    if (title.value != '' &&  price.value !=="" && category.value !=="" && newPro.count < 100) { // this makes data never create if the title id empty
        
        //update
        //09
        if (mood === "create") {
          
          if (newPro.count > 1) {
            for (let i = 0; i < newPro.count; i++) {
              dataPro.push(newPro); //Here we create a new product
            }
          } else {
          
              dataPro.push(newPro);
          }
        } else {
          dataPro[temp] = newPro; // update data
          mood = "create";
          submit.innerHTML = "create"; 
          count.style.display = "block"; 
        } 
          clearData();
    }
  localStorage.setItem("product", JSON.stringify(dataPro));

//   clearData();
  showData();
}
//03 clear Data
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';

}


function showData() { 
    getTotal()
    let table = "";
    for (let i = 0 +1; i < dataPro.length; i++) {
      
        // table = dataPro ==> "NOT CORRECT" this will fetch all the array as the length as the array
        table += `<tr>  
                    <td>${i}</td> 
                    <td>${dataPro[i].title}</td> 
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                   
                    
                    <td><button onclick=updateData(${i}) id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>`;
    }
    document.querySelector("#tbody").innerHTML = table;
      
    //06
    let btnDelete = document.getElementById("deleteAll");
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `<button onclick="deleteAll()">delete All(${dataPro.length})</button>`;
    } else {
        btnDelete.innerHTML = '';
    }
}
showData();


function deleteData(i) {  

    dataPro.splice(i, 1);
    
    localStorage.product = JSON.stringify(dataPro);

     showData()
}
function deleteAll() {

     //delete Data from localStorage
    localStorage.clear()
    
    //delete data from array
    dataPro.splice(0)
    
    //update the data after delete
    showData()

}
//08 Count
function updateData(i) {

  /*Step 1: nhoto el data fel form*/

    //  console.log(i)
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount

    //10 wa9teli nhotou el data bèsh te7dhar cauz edha manhthèsh el total el color y9o3d a7mar thats mean dosen't work
    getTotal();

    //we do not need the count: we hide it
    count.style.display = "none";
    category.value = dataPro[i].category;

    //11 change the button Submit(from  create to update)
    submit.innerHTML = "update"

    //13 change the mood when we click th btn of update
    mood = 'update';

    //17 assign the alwahmi variable to the local parameter(i) for allow us to use it in other function

    temp = i;
    scroll({
        top: 0,
        behavior:'smooth',
    })
}
//18 Search
//step 1
let searchMood = 'title'; //default search

function getSearchMood(id) { // we can use target.className
    let search = document.getElementById('search');
    if (id == 'searchTitle') {
        searchMood = 'title';
        search.placeholder = 'Search By Title'
        
    } else {
        searchMood = 'category';
        search.placeholder = 'Search By Category'
    }

    search.focus() 
    search.value = '';
    showData()
}

function searchData(value) {

    let table = '';
    if (searchMood === "title") {

        for (let i = 0; i < dataPro.length; i++) {

            if (dataPro[i].title.includes(value.toLocaleLowerCase())) { //if the value include in the title ==) true show up all those result in new array
                //console.log(i)
                     table += `<tr>  
                    <td>${i}</td> 
                    <td>${dataPro[i].title}</td> 
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                   
                    
                    <td><button onclick=updateData(${i}) id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>`; 
            }
        }
    } else {
         for (let i = 0; i < dataPro.length; i++) {
           if (dataPro[i].category.includes(value.toLocaleLowerCase())) {
             table += `<tr>  
                    <td>${i}</td> 
                    <td>${dataPro[i].title}</td> 
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick=updateData(${i}) id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>`;
           }
         }
    }
    document.querySelector("#tbody").innerHTML = table;
}

