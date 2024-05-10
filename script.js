async function buscaEndereco(cep) {
  var mensagemErro = document.getElementById("erro");
  mensagemErro.innerHTML = "";

  try {
    var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    var consultaCepConvertida = await consultaCep.json();
    if (consultaCepConvertida.erro) {
      mensagemErro.innerHTML = `<p>CEP não existente! Tente novamente!</p>` 
      throw Error("CEP não existente!");
    }
    var cidade = document.getElementById("cidade");
    var logadouro = document.getElementById("endereco");
    var bairro = document.getElementById("bairro");
    var estado = document.getElementById("estado");

    cidade.value = consultaCepConvertida.localidade;
    logadouro.value = consultaCepConvertida.logradouro;
    bairro.value = consultaCepConvertida.bairro;
    estado.value = consultaCepConvertida.uf;

    console.log(consultaCepConvertida);

    return consultaCepConvertida;
  } catch (erro) {
    mensagemErro.innerHTML = `<p>CEP não encontrado! Tente novamente!</p>` 
    console.log(erro);
  }
}

var cep = document.getElementById("cep");
//recebe o valor quando o usuario clilca fora do input como forma de informar que acacabou e envia para a pesquisa dinamica
cep.addEventListener("focusout", () => buscaEndereco(cep.value));
