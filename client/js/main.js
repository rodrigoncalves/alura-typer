var frase = $('.frase').text();
var numPalavras = frase.split(" ").length;
var tamanhoFrase = $("#tamanho-frase");
tamanhoFrase.text(numPalavras);

var campo = $(".campo-digitacao");
campo.on("input", function() {
	var conteudo = campo.val();

	var qtdPalavras = conteudo.split(/\S+/).length - 1;
	$("#contador-palavras").text(qtdPalavras);

	var qtdCaracteres = conteudo.length;
	$("#contador-caracteres").text(qtdCaracteres);
});

var tempoRestante = $("#tempo-digitacao").text();
campo.one("focus", function() {
	var cronometroID = setInterval(function() {
		if (tempoRestante <= 0) {
			campo.attr("disabled", true);
			clearInterval(cronometroID);
		}
		$("#tempo-digitacao").text(tempoRestante);
		tempoRestante--;
	}, 1000);
})
