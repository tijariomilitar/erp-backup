Product.controller.image = {
	add: async (product_id) => {
		let image_url = prompt("Preencha com a URL da imagem");
		if(image_url){
			if(image_url.length < 7){
				return alert('URL inválida!');
			};
			if(image_url.length > 200){
				return alert('URL inválida!');
			};

			let img = '<img src="'+ image_url +'"/>';

			$(img).on("load", async () =>  {
				document.getElementById('ajax-loader').style.visibility = 'visible';

				if(!await Product.image.add(product_id, image_url)){ return false };

				await Product.controller.manage.show(product_id);

				document.getElementById('ajax-loader').style.visibility = 'hidden';
			}).bind('error', () => {
				return alert('URL inválida!');
			});
		};
	},
	show: (images, pagination) => {
		let htmlImage = "";
	    for (let i = pagination.page * pagination.pageSize; i < images.length && i < (pagination.page + 1) * pagination.pageSize;i++){
			htmlImage += "<img class='image-box' src='"+images[i].url+"'>";
			htmlImage += "<div clas='box-1'>";
			htmlImage += "<br>";
			htmlImage += "<button class='btn-generic-big' onclick='Product.image.remove("+images[i].id+", "+images[i].product_id+")'>Excluir</button>";
			htmlImage += "</div>";
		};

		document.getElementById('product-manage-image').innerHTML = htmlImage;
		document.getElementById('product-manage-image-box').style.display = 'block';
	},
	remove: async (image_id, product_id) => {
		let r = confirm("Deseja realmente excluir a image?");
		if(r){
			document.getElementById('ajax-loader').style.visibility = 'visible';

			if(!await Product.image.remove(image_id)){ return false };

			await Product.controller.manage.show(product_id);

			document.getElementById('ajax-loader').style.visibility = 'hidden';
		};
	}
};