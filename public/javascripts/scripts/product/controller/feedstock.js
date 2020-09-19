Product.controller.feedstock = {
	list: async (product_id) => {
		if(document.getElementById("product-feedstock-box").style.display == "none"){
			document.getElementById('ajax-loader').style.visibility = 'visible';

			let product = {
				feedstocks: await Product.feedstock.list(product_id),
				feedstock_categories: await Product.feedstock.category.list(product_id)
			};

			// const product.feedstocks = 
			// const feedstock_categories = ;

			console.log(product);

			// let feedstock = [];

			// for(i in product.feedstocks){
			// 	if(!product.feedstocks[i].category_id){
			// 		console.log('ok')
			// 	};
			// };

			return document.getElementById('ajax-loader').style.visibility = 'hidden';
			
			$.ajax({
				url: "/product/feedstock/list/id/"+product_id,
				method: "get",
				success: (response) => {

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
	}
};