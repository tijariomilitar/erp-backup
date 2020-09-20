Product.controller.feedstock = {
	list: async (product_id) => {
		if(document.getElementById("product-feedstock-box").style.display == "none"){
			document.getElementById('ajax-loader').style.visibility = 'visible';

			let product = { id: product_id };
			product.feedstocks = await Product.feedstock.list(product_id);
			product.feedstock_categories = await Product.feedstock.category.list(product_id);

			let feedstocks = [];

			for(i in product.feedstock_categories){
				product.feedstock_categories[i].feedstocks = [];
				product.feedstock_categories[i].feedstocks.name = product.feedstock_categories[i].name;
				for(j in product.feedstocks){
					if(product.feedstock_categories[i].id == product.feedstocks[j].category_id){
						product.feedstocks[j].category_name = product.feedstock_categories[i].name;
						product.feedstock_categories[i].feedstocks.push(product.feedstocks[j]);
					};
				};
				if(product.feedstock_categories[i].feedstocks.length){
					feedstocks.push(product.feedstock_categories[i].feedstocks);
				};
			};

			let noCategory = [];
			for(i in product.feedstocks){
				noCategory.name = "Sem categoria";
				if(!product.feedstocks[i].category_id){
					product.feedstocks[i].category_name = noCategory.name;
					noCategory.push(product.feedstocks[i]);
				};
			};
			feedstocks.push(noCategory);

			const pagination = { pageSize: 3, page: 0};
			$(() => { lib.carousel.execute("product-feedstock-box", Product.view.feedstock.list, feedstocks, pagination); });

			return document.getElementById('ajax-loader').style.visibility = 'hidden';
		};
	},
	edit: () => {
		return console.log("edit");
	},
	remove: async (product_feedstock_id) => {
		console.log('remove');
	},
	form: {
		display: async (product_id) => {
			if(document.getElementById("product-feedstock-add-box").style.display == "none"){
				document.getElementById("product-feedstock-category-create-form").elements.namedItem("product_id").value = product_id;
				document.getElementById("product-feedstock-add-form").elements.namedItem("product_id").value = product_id;

				const product_feedstock_categories = await Product.feedstock.category.list(product_id);

				let html = "";
				for(i in product_feedstock_categories){
					html += "<option value='"+product_feedstock_categories[i].id+"'>"+product_feedstock_categories[i].name+"</option>";
				};

				document.getElementById("product-feedstock-add-form").elements.namedItem("category_id").innerHTML = html;
			};
		}
	}
};

document.getElementById("product-feedstock-category-create-form").addEventListener("submit", async (event) => {
	event.preventDefault();
	document.getElementById('ajax-loader').style.visibility = 'visible';

	let category = {
		id: document.getElementById("product-feedstock-category-create-form").elements.namedItem("id").value,
		product_id: document.getElementById("product-feedstock-category-create-form").elements.namedItem("product_id").value,
		category_name: document.getElementById("product-feedstock-category-create-form").elements.namedItem("category_name").value
	};

	Product.feedstock.category.save(category);
	
	document.getElementById("product-feedstock-category-create-form").elements.namedItem("category_name").value = "";
	document.getElementById('ajax-loader').style.visibility = 'hidden';
});