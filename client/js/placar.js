function inserePlacar() {
	var tbody = $(".placar").find("tbody");
	var usuario = "Rodrigo";
	var numPalavras = $("#contador-palavras").text();

	var linha = novaLinha(usuario, numPalavras);
	linha.find(".botao-remover").click(removeLinha);

	tbody.prepend(linha);
}

function novaLinha(usuario, numPalavras) {
	var linha = $("<tr>");
	var colunaUsuario = $("<td>").text(usuario);
	var colunaPalavras = $("<td>").text(numPalavras);

	var colunaRemover = $("<td>");
	var link = $("<a>").addClass("botao-remover").attr("href", "#");
	var icon = $("<i>").addClass('small material-icons').text("delete");

	link.append(icon);
	colunaRemover.append(link);

	linha.append(colunaUsuario);
	linha.append(colunaPalavras);
	linha.append(colunaRemover);

	return linha;
}

function removeLinha() {
	event.preventDefault();
	$(this).parent().parent().remove();
}
