const productController = {};

document.getElementById("product-create-form").addEventListener("submit", async (event) => {
	event.preventDefault();
	document.getElementById('product-create-form').elements.namedItem("submit").disabled = true;
	document.getElementById('ajax-loader').style.visibility = 'visible';

	let product = await Product.save('product-create-form');
	if(!product){ return false };

	document.getElementById("product-filter-form").elements.namedItem("code").value = product.code;
	document.getElementById("product-filter-form").submit();

	console.log('depois');

	document.getElementById("product-create-form").elements.namedItem("id").value = "";
	document.getElementById("product-create-form").elements.namedItem("code").value = "";
	document.getElementById("product-create-form").elements.namedItem("name").value = "";
	document.getElementById("product-create-form").elements.namedItem("color").value = "";
	document.getElementById("product-create-form").elements.namedItem("size").value = "";

	document.getElementById('product-create-form').elements.namedItem("submit").disabled = false;
	document.getElementById('ajax-loader').style.visibility = 'hidden';
});

Product.edit = async (id) => {
	let product = await Product.findById(id);
	if(!product){ return false };

	document.getElementById('product-create-form').elements.namedItem("id").value = product.id;
	document.getElementById('product-create-form').elements.namedItem("name").value = product.name;
	document.getElementById('product-create-form').elements.namedItem("code").value = product.code;
	document.getElementById('product-create-form').elements.namedItem("color").value = product.color;
	document.getElementById('product-create-form').elements.namedItem("size").value = product.size;
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
	if(product.location == "product-manage"){
		$(() => { lib.carousel.execute("product-manage-filter-box", Product.manage.table.filter, products, pagination); });
	};

	document.getElementById('product-filter-form').elements.namedItem("submit").disabled = false;
	document.getElementById('ajax-loader').style.visibility = 'hidden';
});