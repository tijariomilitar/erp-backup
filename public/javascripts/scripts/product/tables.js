function renderManageProducts(products, pageSize, page, location){
	var html = "<tr>";
	html += "<td>Cód</td>";
	html += "<td>Nome</td>";
	html += "<td>Tamanho</td>";
	html += "<td>Cor</td>";
	html += "</tr>";
	for (let i = page * pageSize; i < products.length && i < (page + 1) * pageSize;i++){
		html += "<tr>";
		html += "<td><a class='tbl-show-link nowrap' onclick='showProduct("+products[i].id+", "+true+")'>"+products[i].code+"</a></td>";
		html += "<td>"+products[i].name+"</td>";
		html += "<td>"+products[i].size+"</td>";
		html += "<td>"+products[i].color+"</td>";
		html += "<td ><a class='tbl-show-link nowrap' onclick='editProduct("+products[i].id+")'>Edit</a></td>";
		html += "<td><a class='tbl-show-link nowrap' onclick='removeProduct("+products[i].id+")'>Rem</a></td>";
		html += "</tr>";
	};
	
	document.getElementById("product-manage-filter-tbl").innerHTML = html;
	document.getElementById("product-manage-filter-div").style.display = "block";
	$("#"+location+"PageNumber").text("" + (page + 1) + " de " + Math.ceil(products.length / pageSize));
};

function renderCatalogProducts(products, pageSize, page, location){
	var html = "<tr>";
	html += "<td>Cód</td>";
	html += "<td>Nome</td>";
	html += "<td>Tamanho</td>";
	html += "<td>Cor</td>";
	html += "</tr>";
	for (let i = page * pageSize; i < products.length && i < (page + 1) * pageSize;i++){
		html += "<tr>";
		html += "<td class='nowrap'>"+products[i].code+"</td>";
		html += "<td>"+products[i].name+"</td>";
		html += "<td>"+products[i].size+"</td>";
		html += "<td>"+products[i].color+"</td>";
		html += "<td><a class='tbl-show-link nowrap' onclick='showProduct("+products[i].id+", "+false+")'>Exibir</a></td>";
		html += "</tr>";
	};
	document.getElementById("product-catalog-filter-tbl").innerHTML = html;
	document.getElementById("product-catalog-filter-div").style.display = "block";
	$("#"+location+"PageNumber").text("" + (page + 1) + " de " + Math.ceil(products.length / pageSize));
};

function fillProductSelect(products, select){
	select.innerHTML = "";
	for(i in products){
		select.innerHTML += "<option value='"+products[i].id+"'>"+products[i].code+" | "+products[i].name+" | "+products[i].color+" | "+products[i].size+"</option>"
	};
};

function renderKartProducts(location, products, pageSize, page){
	var html = '';
	products.forEach((product) => {
		html += '<option value="'+product.code+'">#'+ product.code +' | '+ product.name +' | '+ product.size +' | '+ product.color +'</option>';
	});
	document.getElementById('kart-product-code').innerHTML = html;
};

function renderCashierKartProducts(location, products, pageSize, page){
	var html = '';
	products.forEach((product) => {
		html += '<option value="'+product.code+'">#'+ product.code +' | '+ product.name +' | '+ product.size +' | '+ product.color +'</option>';
	});
	document.getElementById('kart-product-code').innerHTML = html;
};