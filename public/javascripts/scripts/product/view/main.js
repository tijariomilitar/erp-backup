Product.view = {
	info: (product, form) => {
		let html = "";

		html += "<tr>";
		html += "<td>Cód</td>";
		html += "<td>Nome</td>";
		html += "<td>Tamanho</td>";
		html += "<td>Cor</td>";
		html += "</tr>";

		html += "<tr>";
		html += "<td class='nowrap'>"+product.code+"</td>";
		html += "<td>"+product.name+"</td>";
		html += "<td>"+product.size+"</td>";
		html += "<td>"+product.color+"</td>";
		html += "</tr>";

		document.getElementById(form).innerHTML = html;
	},
	filter: (products, pagination) => {
		if(products.length){
			var html = "<tr>";
			html += "<td>Cód</td>";
			html += "<td>Nome</td>";
			html += "<td>Tamanho</td>";
			html += "<td>Cor</td>";
			html += "</tr>";

			for (let i = pagination.page * pagination.pageSize; i < products.length && i < (pagination.page + 1) * pagination.pageSize; i++){
				html += "<tr>";
				html += "<td><a class='tbl-show-link nowrap' onclick='Product.controller.manage.show("+products[i].id+")'>"+products[i].code+"</a></td>";
				html += "<td>"+products[i].name+"</td>";
				html += "<td>"+products[i].size+"</td>";
				html += "<td>"+products[i].color+"</td>";
				html += "</tr>";
			};
			document.getElementById("product-manage-filter-table").innerHTML = html;
			document.getElementById("product-manage-filter-box").style.display = "block";
		} else {
			document.getElementById("product-manage-filter-table").innerHTML = "Sem resultados";
			document.getElementById("product-manage-filter-box").style.display = "block";
		};
	}
};