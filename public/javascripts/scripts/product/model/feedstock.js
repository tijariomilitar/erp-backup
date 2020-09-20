Product.feedstock = {
	list: async (product_id) => {
		let response = await fetch("/product/feedstock/list/product_id/"+product_id);
		response = await response.json();

		if(API.verifyResponse(response)){ return false };
		
		return response.feedstocks;
	},
	category: {
		save: async (category) => {
			let response = await fetch("/product/feedstock/category/save", {
				method: "POST",
				headers: {'Content-Type': 'application/json'},
			    body: JSON.stringify(category)
			});
			response = response.json();

			if(API.verifyResponse(response)){ return false };
			alert(response.done);

			return true;
		},
		list: async (product_id) => {
			let response = await fetch("/product/feedstock/category/list/product_id/"+product_id);
			response = await response.json();

			if(API.verifyResponse(response)){ return false };
			
			return response.product_feedstock_categories;
		}
	}
};