/** @format */

// declare main varibals
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
// console.log(title,price,taxes,ads,discount,total,count,category,submit)

let mood = 'create';
let tmp;


function gettotal() {
	if (price.value != "") {
		let result = +price.value + +taxes.value + +ads.value - +discount.value;
		console.log(result);
		total.innerHTML = result;
		total.style.background = "#040";
	} else {
		total.innerHTML = "";
		total.style.background = "#a00d02";
	}
}

let datapro;
if (localStorage.product != null) {
	datapro = JSON.parse(localStorage.product);
} else {
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
		category: category.value.toLowerCase(),
	};

	if(mood === 'create'){
		if (newpro.count > 1) {
			for (i = 0; i < newpro.count; i++) {
				datapro.push(newpro);
			}
		} else {
			datapro.push(newpro);
		}
	}else {
		datapro[tmp] = newpro;
		mood = 'create';
		submit.innerHTML = 'create'
		count.style.display = 'block'
	}

	localStorage.setItem("product", JSON.stringify(datapro));
	cleardata();
	showdata();
};

function cleardata() {
	title.value = "";
	price.value = "";
	taxes.value = "";
	ads.value = "";
	discount.value = "";
	total.innerHTML = "";
	count.value = "";
	category.value = "";
}

function showdata() {
	let table = "";

	for (let i = 0; i < datapro.length; i++) {
		table += `
        <tr>
        <td>${i + 1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button id="update" onclick="updateData(${i})" >update</button></td>
        <td><button onclick=' deleteData()' id="delete" >delete</button></td>
    </tr>`;
	gettotal()
	}

	document.getElementById("tbody").innerHTML = table;
	let deleteAll = document.getElementById("deleteAll");
	if (datapro.length > 0) {
		deleteAll.innerHTML = `
        <button onclick= 'deleteAll()'> delete all (${datapro.length}) </button>
        `;
	} else { 
		deleteAll.innerHTML = "";
	}
}

showdata();

function deleteData(i) {
	datapro.splice(i, 1);
	localStorage.product = JSON.stringify(datapro);
	showdata();
}

function deleteAll() {
	localStorage.clear();
	datapro.splice(0);
	showdata();
}


function updateData(i) {
	title.value = datapro[i].title
	price.value = datapro[i].price
	taxes.value = datapro[i].taxes
	ads.value = datapro[i].ads
	discount.value = datapro[i].discount
	category.value = datapro[i].category
	count.style.display = 'none'
	submit.innerHTML = 'update'
	gettotal()
	mood = 'update'
	tmp = i;
	scroll({
		top: 0,
		behavior: "smooth",
	})
}	

let searchMood = 'title'

function getSearchMood(id) {

	let search = document.getElementById('search')
	if (id ===  "search-title" ) {
		searchMood = 'title'
	}else{
		searchMood = 'category'
	}
	search.placeholder = 'search by ' + searchMood
	search.value = " "
	search.focus()
	searchData()
}

"ahmed".toLowerCase()

function searchData(value) {
	let table = '';
	for (let i = 0; i < datapro.length; i++) {
	if (searchMood == "title") {

				if(datapro[i].title.includes(value.toLowerCase())){
					table += `
					<tr>
					<td>${i + 1}</td>
					<td>${datapro[i].title}</td>
					<td>${datapro[i].price}</td>
					<td>${datapro[i].taxes}</td>
					<td>${datapro[i].ads}</td>
					<td>${datapro[i].discount}</td>
					<td>${datapro[i].total}</td>
					<td>${datapro[i].category}</td>
					<td><button id="update" onclick="updateData(${i})" >update</button></td>
					<td><button onclick=' deleteData()' id="delete" >delete</button></td>
				</tr>`;
				}
			}else {
			if(datapro[i].category.includes(value.toLowerCase())){
				table += `
				<tr>
				<td>${i + 1}</td>
				<td>${datapro[i].title}</td>
				<td>${datapro[i].price}</td>
				<td>${datapro[i].taxes}</td>
				<td>${datapro[i].ads}</td>
				<td>${datapro[i].discount}</td>
				<td>${datapro[i].total}</td>
				<td>${datapro[i].category}</td>
				<td><button id="update" onclick="updateData(${i})" >update</button></td>
				<td><button onclick=' deleteData()' id="delete" >delete</button></td>
			</tr>`;
			}
		}
} 
	document.getElementById("tbody").innerHTML = table;
}
 