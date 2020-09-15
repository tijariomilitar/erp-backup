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
		let response = await fetch("/product/filter?name="+name+"&code="+code+"&color="+color)
		response = await response.json();

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

	let product = {
		location: document.getElementById("product-filter-form").elements.namedItem("location").value,
		name: document.getElementById("product-filter-form").elements.namedItem("name").value,
		code: document.getElementById("product-filter-form").elements.namedItem("code").value,
		color: document.getElementById("product-filter-form").elements.namedItem("color").value
	};

	let products = await Product.filter(product.code, product.name, product.color);

	const pagination = { pageSize: 10, page: 0};
	$(() => { lib.carousel.execute("product-manage-filter-box", Product.manage.table.filter, products, pagination); });

	document.getElementById('product-filter-form').elements.namedItem("submit").disabled = false;
	document.getElementById('ajax-loader').style.visibility = 'hidden';
});