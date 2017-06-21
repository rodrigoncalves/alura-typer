var tempoInicial = 3;
var campo = $(".campo-digitacao");

// $(document).ready(function() {
$(function() {
	atualizaTamanhoFrase();
	inicializaContadores();
	inicializaCronometro();
	inicializaMarcadores();
	$("#botao-reiniciar").click(reiniciarJogo);
});

function atualizaTamanhoFrase() {
	var frase = $(".frase").text();
	var numPalavras = frase.split(" ").length;
	var tamanhoFrase = $("#tamanho-frase");
	tamanhoFrase.text(numPalavras);
}

function inicializaContadores() {
	$("#tempo-digitacao").text(tempoInicial);

	campo.on("input", function() {
		var conteudo = campo.val();

		var qtdPalavras = conteudo.split(/\S+/).length - 1;
		$("#contador-palavras").text(qtdPalavras);

		var qtdCaracteres = conteudo.length;
		$("#contador-caracteres").text(qtdCaracteres);
	});
}

function inicializaCronometro() {
	var tempoRestante = $("#tempo-digitacao").text();
	var botaoReiniciar = $("#botao-reiniciar");
	botaoReiniciar.attr("disabled", true);

	campo.one("focus", function() {
		var cronometroID = setInterval(function() {
			if (tempoRestante <= 0) {
				clearInterval(cronometroID);
				finalizaJogo();
			}
			$("#tempo-digitacao").text(tempoRestante);
			tempoRestante--;
		}, 1000);
	});
}

function finalizaJogo() {
	var botaoReiniciar = $("#botao-reiniciar");
	botaoReiniciar.attr("disabled", false);
	campo.attr("disabled", true);
	campo.toggleClass("campo-desativado");

	inserePlacar();
}

function reiniciarJogo() {
	campo.attr("disabled", false);
	campo.val("");
	$("#tempo-digitacao").text(tempoInicial);
	$("#contador-caracteres").text("0");
	$("#contador-palavras").text("0");

	inicializaCronometro();
	campo.toggleClass("campo-desativado");

	campo.removeClass("borda-verde");
	campo.removeClass("borda-vermelha");
}

function inicializaMarcadores() {
	var frase = $(".frase").text();
	campo.on("input", function() {
		var digitado = campo.val();
		var ehCorreto = frase.startsWith(digitado);
		campo.toggleClass("borda-verde", ehCorreto);
		campo.toggleClass("borda-vermelha", !ehCorreto);
	});
}


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
