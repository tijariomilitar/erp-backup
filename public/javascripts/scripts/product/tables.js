Product.table = {
	info: () => {
		// <table class="tbl-info width-fill" id="product-show-tbl">
		// 	<tr>
		// 		<td>Cód</td>
		// 		<td>Nome</td>
		// 		<td>Tamanho</td>
		// 		<td>Cor</td>
		// 	</tr>
		// 	<tbody id="product-show-tbody"></tbody>
		// </table>

		let html = "<table class='tbl-info width-fill' id='product-show-table>'";

		html += "<tr>";
		html += "<td>Cód</td>";
		html += "<td>Nome</td>";
		html += "<td>Tamanho</td>";
		html += "<td>Cor</td>";
		html += "</tr>";

		html += "<tr>";
		html += "<td class='nowrap'>"+response.product[0].code+"</td>";
		html += "<td>"+response.product[0].name+"</td>";
		html += "<td>"+response.product[0].size+"</td>";
		html += "<td>"+response.product[0].color+"</td>";
		html += "</tr>";
		html += "</table>";
	},
	catalog: {
		render: (products, pageSize, page, location) => {
			var html = "<tr>";
			html += "<td>Cód</td>";
			html += "<td>Nome</td>";
			html += "<td>Tamanho</td>";
			html += "<td>Cor</td>";
			html += "</tr>";
			for (let i = page * pageSize; i < products.length && i < (page + 1) * pageSize;i++){
				html += "<tr>";
				html += "<td class='nowrap'>"+products[i].code+"</td>";
				html += "<td>"+products[i].name+"</td>";
				html += "<td>"+products[i].size+"</td>";
				html += "<td>"+products[i].color+"</td>";
				html += "<td><a class='tbl-show-link nowrap' onclick='Product.show("+products[i].id+", "+false+")'>Exibir</a></td>";
				html += "</tr>";
			};
			document.getElementById("product-catalog-filter-tbl").innerHTML = html;
			document.getElementById("product-catalog-filter-div").style.display = "block";
			$("#"+location+"PageNumber").text("" + (page + 1) + " de " + Math.ceil(products.length / pageSize));
		}
	}
};

Product.select = {
	fill: (products, select) => {
		select.innerHTML = "";
		for(i in products){
			select.innerHTML += "<option value='"+products[i].id+"'>"+products[i].code+" | "+products[i].name+" | "+products[i].color+" | "+products[i].size+"</option>"
		};
	}
};