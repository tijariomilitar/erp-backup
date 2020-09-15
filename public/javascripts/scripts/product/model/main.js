Product.save = async (form) => {
	let product = {
		id: document.getElementById(form).elements.namedItem("id").value,
		code: document.getElementById(form).elements.namedItem("code").value,
		name: document.getElementById(form).elements.namedItem("name").value,
		color: document.getElementById(form).elements.namedItem("color").value,
		size: document.getElementById(form).elements.namedItem("size").value
	};

	let response = await fetch("/product/save", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(product)
	});
	response = await response.json();

	console.log(response);
	
	if(API.verifyResponse(response, form)){ return false };
	alert(response.done);

	return response.product[0];
};

Product.findById = async (id) => {
	let response = await fetch("/product/id/" + id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.product[0];
};

Product.filter = async (code, name, color) => {
	let response = await fetch("/product/filter?name="+name+"&code="+code+"&color="+color)
	response = await response.json();

	if(API.verifyResponse(response)){ return false };

	return response.products;
};

Product.delete = async (id) => {
	let r = confirm('Deseja realmente excluir o produto?');
	if(r){
		let response = await fetch("/product/delete?id="+id, { method: 'DELETE' });
		response = await response.json();

		if(API.verifyResponse(response)){ return false };
		
		alert(response.done);
		
		return true;
	};

};