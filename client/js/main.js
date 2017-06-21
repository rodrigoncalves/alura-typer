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
