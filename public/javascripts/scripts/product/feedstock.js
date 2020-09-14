Product.feedstock = {
	manage: (product_id) => {
		
	},
	list: (product_id, update) => {
		if(!update){
			lib.displayDiv("product-feedstock-box");
		};
		if(document.getElementById("product-feedstock-box").style.display == "block"){
			document.getElementById('ajax-loader').style.visibility = 'visible';
			
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
						html += "<td></td>";
						html += "<td></td>";
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
							// onclick='Product.feedstock.edit("+response.product.feedstocks[i].id+", "+response.product.feedstocks[i].feedstock_id+", `"+response.product.feedstocks[i].uom+"`, "+response.product.feedstocks[i].amount+", "+response.product.feedstocks[i].measure+", "+response.product.feedstocks[i].category_id+", "+response.product.feedstocks[i].product_id+")'
							// onclick='Product.feedstock.remove("+response.product.feedstocks[i].id+", "+response.product.feedstocks[i].product_id+")'
							html += "<td><img class='img-tbl-btn' src='/images/icon/edit.png'></td>";
							html += "<td><img class='img-tbl-btn' src='/images/icon/trash.png'></td>";
							html += "</tr>";
						};

						document.getElementById("product-feedstock-box").style.display = "block";
						document.getElementById("product-feedstock-table").innerHTML = html;
					} else {
						document.getElementById("product-feedstock-table").innerHTML = "Sem registros!";
					};

					document.getElementById('ajax-loader').style.visibility = 'hidden';
				}
			});
		};
	},
	edit: (id, feedstock_id, feedstock_uom, feedstock_amount, feedstock_measure, feedstock_category_id, product_id) => {
		document.getElementById('ajax-loader').style.visibility = 'visible';

		$.ajax({
			url: '/feedstock/id/'+feedstock_id,
			method: 'get',
			success: (feedstock) => {
				document.getElementById("product-feedstock-box").style.display = "block";
				document.getElementById("product-feedstock-add-box").style.display = "block";

				Product.feedstock.category.list(product_id, "product-feedstock-add-form");

				document.getElementById("product-feedstock-add-form").elements.namedItem("id").value = id;
				document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_id").innerHTML = "<option value="+feedstock[0].id+">"+feedstock[0].code+" | "+feedstock[0].name+" | "+feedstock[0].color+" | "+feedstock[0].uom+"</option>";
				document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_id").disabled = true;
				if(feedstock_uom == "un"){
					document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_amount").value = feedstock_amount;
					document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_amount").disabled = false;
					document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_measure").disabled = true;
					document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_measure").value = "";
					document.getElementById("product-feedstock-add-form").elements.namedItem("category_id").value = feedstock_category_id;
				} else if(feedstock_uom == "cm"){
					document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_amount").value = feedstock_amount;
					document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_amount").disabled = false;
					document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_measure").value = feedstock_measure;
					document.getElementById("product-feedstock-add-form").elements.namedItem("feedstock_measure").disabled = false;
					document.getElementById("product-feedstock-add-form").elements.namedItem("category_id").value = feedstock_category_id;
				};

				document.getElementById('ajax-loader').style.visibility = 'hidden';
			}
		});
	},
	remove: (id, product_id) => {
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

					Product.feedstock.list(product_id);
					alert(response.done);
				}
			});
		};
	},
	form: {
		display: (product_id, form) => {
			lib.displayDiv("product-feedstock-add-box");
			if(document.getElementById("product-feedstock-add-box").style.display == "block"){
				document.getElementById("product-feedstock-category-create-form").elements.namedItem("product_id").value = product_id;
				document.getElementById("product-feedstock-add-form").elements.namedItem("product_id").value = product_id;
				Product.feedstock.category.list(product_id, form);
			};
		}
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
		save: (form) => {
			$.ajax({
				url: "/product/feedstock/category/save/",
				method: "post",
				data: $("#"+form).serialize(),
				success: (response) => {
					if(API.verifyResponse(response, "product-feedstock-category-create-form")){return};
					
					Product.feedstock.category.list(document.getElementById("product-feedstock-category-create-form").elements.namedItem("product_id").value, "product-feedstock-add-form");
										
					alert(response.done);
				}
			});
		},
		list: (product_id, form) => {
			$.ajax({
				url: "/product/feedstock/category/list/"+product_id,
				method: "get",
				async: false,
				success: (response) => {
					if(API.verifyResponse(response, form)){return};

					if(document.getElementById(form).elements.namedItem("category_id").nodeName == "SELECT"){
						var html = "<option value=''>S/ categoria</option>";
						for(i in response.product_feedstock_categories){
							html += "<option value='"+response.product_feedstock_categories[i].id+"'>"+response.product_feedstock_categories[i].name+"</option>";
						};
						document.getElementById(form).elements.namedItem("category_id").innerHTML = html;
					};
				}
			});
		}
	}
};

document.getElementById("product-feedstock-category-create-form").addEventListener("submit", async (event) => {
	event.preventDefault();
	document.getElementById('ajax-loader').style.visibility = 'visible';
	Product.feedstock.category.save("product-feedstock-category-create-form");
	
	document.getElementById("product-feedstock-category-create-form").elements.namedItem("category_name").value = "";
	document.getElementById('ajax-loader').style.visibility = 'hidden';
});

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

				Product.feedstock.list(document.getElementById("product-feedstock-add-form").elements.namedItem('product_id').value);
				
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

function productFeedstockClear(tbl){
	document.getElementById(tbl).innerHTML = "Sem registros";
};