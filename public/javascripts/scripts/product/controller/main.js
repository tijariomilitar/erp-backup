const Product = {}; 
Product.controller = {};

document.getElementById("product-create-form").addEventListener("submit", async (event) => {
	event.preventDefault();
	event.target.elements.namedItem("submit").disabled = true;
	document.getElementById('ajax-loader').style.visibility = 'visible';

	let product = {
		id: event.target.elements.namedItem("id").value,
		code: event.target.elements.namedItem("code").value,
		name: event.target.elements.namedItem("name").value,
		color: event.target.elements.namedItem("color").value,
		size: event.target.elements.namedItem("size").value
	};

	product = await Product.save(product, "product-create-form");
	if(!product){ return false };

	document.getElementById("product-filter-form").elements.namedItem("code").value = product.code;
	document.getElementById("product-filter-form").submit.click();

	event.target.elements.namedItem("id").value = "";
	event.target.elements.namedItem("code").value = "";
	event.target.elements.namedItem("name").value = "";
	event.target.elements.namedItem("color").value = "";
	event.target.elements.namedItem("size").value = "";

	event.target.elements.namedItem("submit").disabled = false;
	document.getElementById('ajax-loader').style.visibility = 'hidden';
});

Product.controller.edit = async (id) => {
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
	event.target.elements.namedItem("submit").disabled = true;
	document.getElementById('ajax-loader').style.visibility = 'visible';

	let product = {
		name: event.target.elements.namedItem("name").value,
		code: event.target.elements.namedItem("code").value,
		color: event.target.elements.namedItem("color").value
	};

	let products = await Product.filter(product.code, product.name, product.color);

	const pagination = { pageSize: 10, page: 0};
	if(event.target.elements.namedItem("location").value == "product-manage"){
		$(() => { lib.carousel.execute("product-manage-filter-box", Product.view.manage.filter, products, pagination); });
	};

	document.getElementById('product-filter-form').elements.namedItem("submit").disabled = false;
	document.getElementById('ajax-loader').style.visibility = 'hidden';
});

Product.controller.delete = async (id) => {
	let r = confirm('Deseja realmente excluir o produto?');
	if(r){
		document.getElementById('ajax-loader').style.visibility = 'visible';
		
		if(!await Product.delete(id)){ return false };
		
		document.getElementById("product-filter-form").submit.click();
		
		document.getElementById('ajax-loader').style.visibility = 'hidden';
	};
};