$(() => {
	$("#product-feedstock-add-form").on('submit', (event) => {
		event.preventDefault();
		document.getElementById('product-feedstock-add-form').elements.namedItem("submit").disabled = true;

		let feedstock_id = document.getElementById("product-feedstock-add-form").elements.namedItem('feedstock_id');
		
		if(feedstock_id.value < 1 || !feedstock_id.value) 	{
			alert("É necessário selecionar a matéria-prima");
			return document.getElementById('product-feedstock-add-form').elements.namedItem("submit").disabled = false;
		};

		let uom = feedstock_id.options[feedstock_id.selectedIndex].text.split(' | ')[3];
		document.getElementById("product-feedstock-add-form").elements.namedItem('feedstock_uom').value = uom;

		let amount = document.getElementById("product-feedstock-add-form").elements.namedItem('feedstock_amount').value;
		let measure = document.getElementById("product-feedstock-add-form").elements.namedItem('feedstock_measure').value;

		if(uom == "un") {
			if(amount < 0.01 || !amount) {
				alert("É necessário preencher a quantidade de matéria-prima");
				return document.getElementById('product-feedstock-add-form').elements.namedItem("submit").disabled = false;
			};

			document.getElementById("product-feedstock-add-form").elements.namedItem('feedstock_measure').value = 1;
		} else if (uom == "cm") {
			if(amount < 0.01 || !amount) {
				alert("É necessário preencher a quantidade de matéria-prima");
				return document.getElementById('product-feedstock-add-form').elements.namedItem("submit").disabled = false;
			};			

			if(measure < 0.01 || !measure){
				alert("É necessário preencher a medida da matéria-prima");
				return document.getElementById('product-feedstock-add-form').elements.namedItem("submit").disabled = false;
			};
		};

		document.getElementById('ajax-loader').style.visibility = 'visible';

		$.ajax({
			url: '/product/feedstock/add',
			method: 'post',
			data: $("#product-feedstock-add-form").serialize(),
			success: (response) => {
				if(API.verifyResponse(response, "product-feedstock-add-form")){return};
				
				document.getElementById('ajax-loader').style.visibility = 'hidden';

				alert(response.done);

				productFeedstockList(document.getElementById("product-feedstock-add-form").elements.namedItem('product_id').value);

				document.getElementById("product-feedstock-add-form").elements.namedItem('id').value = "";
				document.getElementById("product-feedstock-add-form").elements.namedItem('feedstock_id').innerHTML = "";
				document.getElementById("product-feedstock-add-form").elements.namedItem('feedstock_id').disabled = false;
				document.getElementById("product-feedstock-add-form").elements.namedItem('feedstock_amount').value = "";
				document.getElementById("product-feedstock-add-form").elements.namedItem('feedstock_measure').value = "";
				document.getElementById('product-feedstock-add-form').elements.namedItem("submit").disabled = false;
			}
		});
	});
});


const Product = {
	feedstock: {
		edit: (id, feedstock_id, feedstock_uom, feedstock_amount, feedstock_measure, product_id) => {
			document.getElementById('ajax-loader').style.visibility = 'visible';
			
			$.ajax({
				url: '/feedstock/id/'+feedstock_id,
				method: 'get',
				success: function(feedstock){
					document.getElementById("product-feedstock-div").style.display = "block";

					document.getElementById("product-feedstock-add-form").elements.namedItem("id").value = id;
					document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_id").innerHTML = "<option value="+feedstock[0].id+">"+feedstock[0].code+" | "+feedstock[0].name+" | "+feedstock[0].color+" | "+feedstock[0].uom+"</option>";
					document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_id").disabled = true;
					if(feedstock_uom == "un"){
						document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_amount").value = feedstock_amount;
						document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_amount").disabled = false;
						document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_measure").disabled = true;
						document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_measure").value = "";
					} else if(feedstock_uom == "cm"){
						document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_amount").value = feedstock_amount;
						document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_amount").disabled = false;
						document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_measure").value = feedstock_measure;
						document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_measure").disabled = false;
					};

					document.getElementById('ajax-loader').style.visibility = 'hidden';
				}
			});
		},
		// onchange="Product.feedstock.uom.inputs(this)"
		uom: {
			inputs: (uom) => {
				if(uom){
					uom = uom.options[uom.selectedIndex].text.split(' | ');
					if(uom[3] == "un"){
						document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_amount").disabled = false;
						document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_measure").disabled = true;
						document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_measure").value = "";
					} else if(uom[3] == "cm"){
						document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_amount").disabled = false;
						document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_measure").disabled = false;
					};
				} else {
					if(document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_uom").value == "un"){
						document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_measure").disabled = true;
						document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_measure").value = "";
					} else if(document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_uom").value == "cm"){
						document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_amount").disabled = false;
						document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_measure").disabled = false;
					};
				};
			}
		},
		category: {
			save: (select) => {
				console.log(select);
			}
		}
	}
};


function productFeedstockList(product_id){
	document.getElementById('ajax-loader').style.visibility = 'visible';

	document.getElementById("product-feedstock-box").style.display = "block";
	
	$.ajax({
		url: "/product/feedstock/list/id/"+product_id,
		method: "get",
		success: (response) => {
			if(API.verifyResponse(response, "product-feedstock-add-form")){return};
			
			document.getElementById('ajax-loader').style.visibility = 'hidden';

			if(response.product.feedstocks.length){
				var html = "";

				html += "<tr>";
				html += "<td>Cód</td>";
				html += "<td>Nome</td>";
				html += "<td>Cor</td>";
				html += "<td>Qtd</td>";
				html += "<td>Cm</td>";
				html += "</tr>";

				response.product.feedstocks.sort((a, b) => {
				  return a.code - b.code;
				});

				for(i in response.product.feedstocks){
					html += "<tr>";
					html += "<td class='nowrap'>"+response.product.feedstocks[i].code+"</td>";
					html += "<td>"+response.product.feedstocks[i].name+"</td>";
					html += "<td>"+response.product.feedstocks[i].color+"</td>";
					if(response.product.feedstocks[i].uom == 'un'){
						html += "<td>"+response.product.feedstocks[i].amount+"un</td>";
						html += "<td></td>";
					} else if(response.product.feedstocks[i].uom == 'cm'){
						html += "<td>"+response.product.feedstocks[i].amount+"un</td>";
						html += "<td>"+response.product.feedstocks[i].measure+"cm</td>";
					};
					html += "<td><a class='tbl-show-link nowrap' onclick='Product.feedstock.edit("+response.product.feedstocks[i].id+", "+response.product.feedstocks[i].feedstock_id+", `"+response.product.feedstocks[i].uom+"`, "+response.product.feedstocks[i].amount+", "+response.product.feedstocks[i].measure+", "+response.product.feedstocks[i].product_id+")'>Edit</a></td>";
					html += "<td><a class='tbl-show-link nowrap' onclick='removeProductFeedstock("+response.product.feedstocks[i].id+", "+response.product.feedstocks[i].product_id+")'>Rem</a></td>";
					html += "</tr>";
				};

				document.getElementById("product-feedstock-tbl").innerHTML = html;
			} else {
				document.getElementById("product-feedstock-tbl").innerHTML = "Sem registros!";
			};

			document.getElementById('ajax-loader').style.visibility = 'hidden';
		}
	});
};

function productFeedstockClear(tbl){
	document.getElementById(tbl).innerHTML = "Sem registros";
};

function editProductFeedstock(id, feedstock_id, feedstock_amount, feedstock_measure, product_id){
	document.getElementById('ajax-loader').style.visibility = 'visible';
	
	$.ajax({
		url: '/feedstock/id/'+feedstock_id,
		method: 'get',
		success: function(feedstock){
			document.getElementById("product-feedstock-div").style.display = "block";

			document.getElementById("product-feedstock-add-form").elements.namedItem('id').value = id;
			document.getElementById("product-feedstock-add-form").elements.namedItem('feedstock_id').innerHTML = "<option value="+feedstock[0].id+">"+feedstock[0].code+" | "+feedstock[0].name+" | "+feedstock[0].color+" | "+feedstock[0].uom+"</option>";
			document.getElementById("product-feedstock-add-form").elements.namedItem('feedstock_id').disabled = true;
			document.getElementById("product-feedstock-add-form").elements.namedItem('feedstock_amount').value = feedstock_amount;
			document.getElementById("product-feedstock-add-form").elements.namedItem('feedstock_measure').value = feedstock_measure;

			document.getElementById('ajax-loader').style.visibility = 'hidden';
		}
	});
};

function removeProductFeedstock(id, product_id){
	let r = confirm('Deseja realmente excluir a matéria prima?');

	if(r){
		document.getElementById('ajax-loader').style.visibility = 'visible';
		$.ajax({
			url: '/product/feedstock/remove?id='+id,
			method: 'delete',
			success: function(response){
				if(response.unauthorized){
					alert(response.unauthorized);
					window.location.href = '/login';
					return;
				};

				document.getElementById('ajax-loader').style.visibility = 'hidden';

				productFeedstockList(product_id);
				alert(response.done);
			}
		});
	};
};