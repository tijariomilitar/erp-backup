Product.feedstock = {
	list: async (product_id) => {
		let response = await fetch("/product/feedstock/list/id/"+product_id);
		response = await response.json();
		console.log(response.product);

		if(API.verifyResponse(response)){ return false };
		
		return response.product;
	}
};