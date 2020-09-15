Product.controller.manage = {
	show: async (product_id) => {
		document.getElementById('ajax-loader').style.visibility = 'visible';
		
		let product = await Product.findById(product_id);
		if(!product){ return false };

		document.getElementById("product-manage-show-box").style.display = "none";
		document.getElementById("product-feedstock-add-box").style.display = "none";
		document.getElementById("product-feedstock-box").style.display = "none";

		document.getElementById("product-manage-show-box").style.display = "block";

		Product.view.manage.menu(product);
		Product.view.info(product, "product-manage-info-table");
		
		const pagination = { pageSize: 1, page: 0};
		$(() => { lib.carousel.execute("product-manage-image-box", Product.view.image.show, product.images, pagination); });
		
		document.getElementById('ajax-loader').style.visibility = 'hidden';
	}
};