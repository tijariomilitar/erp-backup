const Product = {
	findById: async (id) => {
		let response = await fetch("/product/id/" + id);
		response = await response.json();
		
		if(API.verifyResponse(response)){ return false };
		
		return response.product;
	},
	show: (id) => {
		document.getElementById('ajax-loader').style.visibility = 'visible';
		$.ajax({
			url: '/product/id/'+id,
			method: 'get',
			success: (response) => {
				if(API.verifyResponse(response)){return};

				
				document.getElementById('ajax-loader').style.visibility = 'hidden';
			}
		});
	},
	filter: async (code, name, color) => {
		console.log(code);
		console.log(name);
		console.log(color);
		let response = await fetch("/product/filter?name="+name+"&code="+code+"&color="+color)
		response = await response.json();
		console.log(response);

		if(API.verifyResponse(response)){ return false };
		return response.products;
	},
	remove: async (id) => {
		let r = confirm('Deseja realmente excluir o produto?');

		if(r){
			document.getElementById('ajax-loader').style.visibility = 'visible';
			$.ajax({
				url: '/product/remove?id='+id,
				method: 'delete',
				success: function(response){
					if(API.verifyResponse(response)){return};

					document.getElementById('product-manage-show-box').style.display = "none";
					document.getElementById('ajax-loader').style.visibility = 'hidden';
					
					alert(response.done);

					$("#product-filter-form").submit();
				}
			});
		};
	}
};

document.getElementById("product-filter-form").addEventListener("submit", async (event) => {
	event.preventDefault();
	document.getElementById('product-filter-form').elements.namedItem("submit").disabled = true;
	document.getElementById('ajax-loader').style.visibility = 'visible';

	console.log()

	let product = {
		location: document.getElementById("product-filter-form").elements.namedItem("location").value,
		name: document.getElementById("product-filter-form").elements.namedItem("name").value,
		code: document.getElementById("product-filter-form").elements.namedItem("code").value,
		color: document.getElementById("product-filter-form").elements.namedItem("color").value
	};

	let products = await Product.filter(product.code, product.name, product.color);

	console.log(products);

	document.getElementById('product-filter-form').elements.namedItem("submit").disabled = false;
	document.getElementById('ajax-loader').style.visibility = 'hidden';
});


// $(function(){
// 	$("#product-filter-form").on('submit', (event) => {
// 		event.preventDefault();

// 		let location = document.getElementById("product-filter-form").elements.namedItem('location').value;
// 		let name = document.getElementById("product-filter-form").elements.namedItem('name').value;
// 		let code = document.getElementById("product-filter-form").elements.namedItem('code').value;
// 		let color = document.getElementById("product-filter-form").elements.namedItem('color').value;

// 		document.getElementById('ajax-loader').style.visibility = 'visible';

// 		console.log(location);
		
// 		$.ajax({
// 			url: "/product/filter?name="+name+"&code="+code+"&color="+color,
// 			method: 'get',
// 			success: (response) => {
// 				if(API.verifyResponse(response)){return};
				
// 				let pageSize = 15;
// 				let page = 0;


// 				function paging(){
// 					if(response.products.length){
// 						if(location==="productManage"){
// 							Product.manage.table.render(response.products, pageSize, page, location);
// 						} else if (location==="productCatalog"){
// 							Product.table.catalog.render(response.products, pageSize, page, location);
// 						} else if (location==="productProduction"){
// 							fillProductSelect(response.products, document.getElementById("product-production-kart-form").elements.namedItem('product_id'));
// 						};
// 					} else {
// 						if(location==="productManage"){
// 							lib.clearTable('product-manage-filter-tbl', location);
// 						} else if (location==="productCatalog"){
// 							lib.clearTable('product-catalog-filter-table', location);
// 						} else if (location==="productProduction"){
// 							document.getElementById("product-production-kart-form").elements.namedItem("product_id").innerHTML = "<option value=''>Sem registros</option>";
// 						};
// 					};
// 				};

// 				document.getElementById('ajax-loader').style.visibility = 'hidden';

// 				function buttonsPaging(){
// 					$("#"+location+"Next").prop('disabled', response.products.length <= pageSize || page >= response.products.length / pageSize - 1);
// 					$("#"+location+"Previous").prop('disabled', response.products.length <= pageSize || page == 0);
// 				};

// 				$(function(){
// 				    $("#"+location+"Next").click(function(){
// 				        if(page < response.products.length / pageSize - 1){
// 				            page++;
// 				            paging();
// 				            buttonsPaging();
// 				        };
// 				    });
// 				    $("#"+location+"Previous").click(function(){
// 				        if(page > 0){
// 				            page--;
// 				            paging();
// 				            buttonsPaging();
// 				        };
// 				    });
// 				    paging();
// 				    buttonsPaging();
// 				});
// 			}
// 		});
// 	});
// });

// if(document.getElementById('product-feedstock-box').style.display == 'none'){
// 	productFeedstockList(`+response.product[0].id+`);
// } else {
// 	document.getElementById('product-feedstock-box').style.display = 'none'; 
// };