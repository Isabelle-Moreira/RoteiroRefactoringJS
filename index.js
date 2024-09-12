const { readFileSync } = require('fs');
var Repositorio = require("./repositorio.js");
var ServicoCalculoFatura = require("./servico.js") ;
var gerarFaturaStr = require("./apresentacao.js");


const calc = new ServicoCalculoFatura(new Repositorio());

/*function gerarFaturaHTML(fatura, pecas,calc) {
  let faturaHTML = `<html>\n`;
  faturaHTML += `<p>Fatura ${fatura.cliente}</p>\n`;
  faturaHTML += `<ul>\n`;

  for (let apre of fatura.apresentacoes) {
    faturaHTML += `  <li>${getPeca(apre).nome}: ${formatarMoeda(calc.CalcularTotalApresentacao(apre))} (${apre.audiencia} assentos)</li>\n`;
  }

  faturaHTML += `</ul>\n`;
  faturaHTML += `<p>Valor total: ${formatarMoeda(calc.CalcularTotalFatura(fatura))}</p>\n`;
  faturaHTML += `<p>Créditos acumulados: ${calc.CalcularTotalCreditos(fatura)}</p>\n`;
  faturaHTML += `</html>`;

  return faturaHTML;
}*/

const faturas = JSON.parse(readFileSync('./faturas.json'));
const faturaStr = gerarFaturaStr(faturas,calc);
/*const faturaHTML = gerarFaturaHTML(faturas, pecas,calc);*/
console.log(faturaStr);
/*console.log(faturaHTML);*/

