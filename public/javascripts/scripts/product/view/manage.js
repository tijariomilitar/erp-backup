Product.view.manage = {
	show: (images, pagination) => {
		let html = "";
	    for (let i = pagination.page * pagination.pageSize; i < images.length && i < (pagination.page + 1) * pagination.pageSize;i++){
			html += "<img class='image-box' src='"+images[i].url+"'>";
			html += "<div clas='box-1'>";
			html += "<br>";
			html += "<button class='btn-generic-big' onclick='Product.controller.image.remove("+images[i].id+", "+images[i].product_id+")'>Excluir</button>";
			html += "</div>";
		};

		document.getElementById('product-manage-image').innerHTML = html;
		document.getElementById('product-manage-image-box').style.display = 'block';
	},
	filter: (products, pagination) => {
		if(products.length){
			var html = "<tr>";
			html += "<td>Cód</td>";
			html += "<td>Nome</td>";
			html += "<td>Tamanho</td>";
			html += "<td>Cor</td>";
			html += "<td></td>";
			html += "<td></td>";
			html += "</tr>";

			for (let i = pagination.page * pagination.pageSize; i < products.length && i < (pagination.page + 1) * pagination.pageSize; i++){
				html += "<tr>";
				html += "<td><a class='tbl-show-link nowrap' onclick='Product.controller.manage.show("+products[i].id+")'>"+products[i].code+"</a></td>";
				html += "<td>"+products[i].name+"</td>";
				html += "<td>"+products[i].size+"</td>";
				html += "<td>"+products[i].color+"</td>";
				html += "<td><img class='img-tbl-btn' src='/images/icon/edit.png' onclick='Product.controller.edit("+products[i].id+")'></td>";
				html += "<td><img class='img-tbl-btn' src='/images/icon/trash.png' onclick='Product.controller.delete("+products[i].id+")'></td>";
				html += "</tr>";
			};
			document.getElementById("product-manage-filter-table").innerHTML = html;
			document.getElementById("product-manage-filter-box").style.display = "block";
		} else {
			document.getElementById("product-manage-filter-table").innerHTML = "Sem resultados";
			document.getElementById("product-manage-filter-box").style.display = "block";
		};
	},
	menu: (product) => {
		var html = "";
		html += "<h4 style='opacity:0.6'>MENU PRINCIPAL</h4>";
		html += "<button class='btn-generic-medium' onclick='Product.image.controller.add("+product.id+")'>Adicionar Imagem</button>";
		html += "<button class='btn-generic-medium' onclick='Product.feedstock.form.display("+product.id+", `product-feedstock-add-form`)'>Adicionar Matéria-Prima</button>";
		html += "<button class='btn-generic-medium' onclick='Product.feedstock.list("+product.id+")'>Listar Matérias-Prima</button>";

		document.getElementById("product-manage-menu-box").innerHTML = html;
	},
	image: {
		show: (images, pagination) => {
			let html = "";
		    for (let i = pagination.page * pagination.pageSize; i < images.length && i < (pagination.page + 1) * pagination.pageSize;i++){
				html += "<img class='image-box' src='"+images[i].url+"'>";
				html += "<div clas='box-1'>";
				html += "<br>";
				html += "<button class='btn-generic-big' onclick='Product.image.controller.remove("+images[i].id+", "+images[i].product_id+")'>Excluir</button>";
				html += "</div>";
			};

			document.getElementById('product-manage-image').innerHTML = html;
			document.getElementById('product-manage-image-box').style.display = 'block';
		}
	}
};