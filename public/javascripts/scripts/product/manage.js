Product.save = (form) => {
	$.ajax({
		url: '/product/save',
		method: 'post',
		data: $("#"+form).serialize(),
		success: (response) => {
			if(API.verifyResponse(response, "product-create-form")){return};
			alert(response.done);
		}
	});
};

Product.edit = (id) => {
	document.getElementById('ajax-loader').style.visibility = 'visible';
	$.ajax({
		url: '/product/id/'+id,
		method: 'get',
		success: (response) => {
			if(API.verifyResponse(response)){return};

			document.getElementById('ajax-loader').style.visibility = 'hidden';

			document.getElementById('product-create-form').elements.namedItem("id").value = response.product[0].id;
			document.getElementById('product-create-form').elements.namedItem("name").value = response.product[0].name;
			document.getElementById('product-create-form').elements.namedItem("code").value = response.product[0].code;
			document.getElementById('product-create-form').elements.namedItem("color").value = response.product[0].color;
			document.getElementById('product-create-form').elements.namedItem("size").value = response.product[0].size;

			document.getElementById('ajax-loader').style.visibility = 'hidden';
		}
	});
};

Product.manage = {
	show: (id) => {
		document.getElementById('ajax-loader').style.visibility = 'visible';
		$.ajax({
			url: '/product/id/'+id,
			method: 'get',
			success: (response) => {
				if(API.verifyResponse(response)){return};

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
			html += "<button class='btn-generic-medium' onclick='Product.image.add("+product.id+")'>Adicionar Imagem</button>";
			html += "<button class='btn-generic-medium' onclick='Product.feedstock.manage("+product.id+")'>Adicionar Matéria-Prima</button>";
			html += "<button class='btn-generic-medium' onclick=''>Listar Matérias-Prima</button>";

			document.getElementById("product-manage-menu-box").innerHTML = html;
		}
	},
	table: {
		render: (products, pageSize, page, location) => {
			var html = "<tr>";
			html += "<td>Cód</td>";
			html += "<td>Nome</td>";
			html += "<td>Tamanho</td>";
			html += "<td>Cor</td>";
			html += "</tr>";
			for (let i = page * pageSize; i < products.length && i < (page + 1) * pageSize;i++){
				html += "<tr>";
				html += "<td><a class='tbl-show-link nowrap' onclick='Product.manage.show("+products[i].id+", "+true+")'>"+products[i].code+"</a></td>";
				html += "<td>"+products[i].name+"</td>";
				html += "<td>"+products[i].size+"</td>";
				html += "<td>"+products[i].color+"</td>";
				html += "<td ><a class='tbl-show-link nowrap' onclick='Product.edit("+products[i].id+")'>Edit</a></td>";
				html += "<td><a class='tbl-show-link nowrap' onclick='Product.remove("+products[i].id+")'>Rem</a></td>";
				html += "</tr>";
			};
			document.getElementById("product-manage-filter-tbl").innerHTML = html;
			document.getElementById("product-manage-filter-div").style.display = "block";
			$("#"+location+"PageNumber").text("" + (page + 1) + " de " + Math.ceil(products.length / pageSize));
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

document.getElementById("product-create-form").addEventListener("submit", (event) => {
	event.preventDefault();
	document.getElementById('product-create-form').elements.namedItem("submit").disabled = true;
	document.getElementById('ajax-loader').style.visibility = 'visible';

	Product.save('product-create-form');

	document.getElementById("product-filter-form").elements.namedItem("name").value = document.getElementById("product-create-form").elements.namedItem("name").value;
	$("#product-filter-form").submit();

	document.getElementById("product-create-form").elements.namedItem("id").value = "";
	document.getElementById("product-create-form").elements.namedItem("code").value = "";
	document.getElementById("product-create-form").elements.namedItem("name").value = "";
	document.getElementById("product-create-form").elements.namedItem("color").value = "";
	document.getElementById("product-create-form").elements.namedItem("size").value = "";

	document.getElementById('product-create-form').elements.namedItem("submit").disabled = false;
	document.getElementById('ajax-loader').style.visibility = 'hidden';
});