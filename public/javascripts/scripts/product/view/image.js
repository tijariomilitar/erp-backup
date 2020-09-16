Product.view.image = {
	show: (images, pagination) => {
		let html = "";
	    for (let i = pagination.page * pagination.pageSize; i < images.length && i < (pagination.page + 1) * pagination.pageSize;i++){
			html += "<img class='image-box' src='"+images[i].url+"'>";
			html += "<div clas='box-1'>";
			html += "</div>";
		};

		document.getElementById('product-manage-image').innerHTML = html;
		document.getElementById('product-manage-image-box').style.display = 'block';
	}
};