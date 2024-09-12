var formatarMoeda = require("./util.js");

module.exports = function gerarFaturaStr(fatura,calc) {
    let faturaStr = `Fatura ${fatura.cliente}\n`;
    for (let apre of fatura.apresentacoes) {
      faturaStr += `  ${calc.repo.getPeca(apre).nome}: ${formatarMoeda(calc.CalcularTotalApresentacao(apre))} (${apre.audiencia} assentos)\n`;
    }
    faturaStr += `Valor total: ${formatarMoeda(calc.CalcularTotalFatura(fatura))}\n`;
    faturaStr += `Créditos acumulados: ${calc.CalcularTotalCreditos(fatura)} \n`;
    return faturaStr;
  }
  