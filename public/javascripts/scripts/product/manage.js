Product.manage = {
	show: (id) => {
		document.getElementById('ajax-loader').style.visibility = 'visible';
		$.ajax({
			url: '/product/id/'+id,
			method: 'get',
			success: (response) => {
				if(API.verifyResponse(response)){return};

				document.getElementById("product-manage-show-box").style.display = "none";
				document.getElementById("product-feedstock-add-box").style.display = "none";
				document.getElementById("product-feedstock-box").style.display = "none";

				document.getElementById("product-manage-show-box").style.display = "block";

				Product.manage.menu.fill(response.product[0]);
				Product.manage.table.info(response.product[0]);
				
				const pagination = { pageSize: 1, page: 0};
				$(() => { lib.carousel.execute("product-manage-image-box", Product.image.show, response.product[0].images, pagination); });
				
				document.getElementById('ajax-loader').style.visibility = 'hidden';
			}
		});
	},
	menu: {
		fill: (product) => {
			var html = "";
			html += "<h4 style='opacity:0.6'>MENU PRINCIPAL</h4>";
			html += "<button class='btn-generic-medium' onclick='Product.image.add("+product.id+")'>Adicionar Imagem</button>";
			html += "<button class='btn-generic-medium' onclick='Product.feedstock.form.display("+product.id+", `product-feedstock-add-form`)'>Adicionar Matéria-Prima</button>";
			html += "<button class='btn-generic-medium' onclick='Product.feedstock.list("+product.id+")'>Listar Matérias-Prima</button>";

			document.getElementById("product-manage-menu-box").innerHTML = html;
		}
	},
	table: {
		filter: (products, pagination) => {
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
				html += "<td><a class='tbl-show-link nowrap' onclick='Product.manage.show("+products[i].id+", "+true+")'>"+products[i].code+"</a></td>";
				html += "<td>"+products[i].name+"</td>";
				html += "<td>"+products[i].size+"</td>";
				html += "<td>"+products[i].color+"</td>";
				/*onclick='Product.edit("+products[i].id+")'*/
				html += "<td><img class='img-tbl-btn' src='/images/icon/edit.png' onclick='Product.edit("+products[i].id+")'></td>";
				html += "<td><img class='img-tbl-btn' src='/images/icon/trash.png' onclick='Product.delete("+products[i].id+")'></td>";
				html += "</tr>";
			};
			document.getElementById("product-manage-filter-table").innerHTML = html;
			document.getElementById("product-manage-filter-box").style.display = "block";
		},
		info: (product) => {
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

			document.getElementById("product-manage-info-table").innerHTML = html;
		}
	}
};