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
	}
};