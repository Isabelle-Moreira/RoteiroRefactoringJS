const { readFileSync } = require('fs');

function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR",
    { style: "currency", currency: "BRL",
      minimumFractionDigits: 2 }).format(valor/100);
}



class Repositorio {
  constructor() {
    this.pecas = JSON.parse(readFileSync('./pecas.json'));
  }

  getPeca(apresentacao) {
    return pecas[apresentacao.id];
  }
}






class ServicoCalculoFatura {

  constructor(repo) {
    this.repo = repo;
  }

  CalcularCredito(apre) {
    let creditos = 0;
    creditos += Math.max(apre.audiencia - 30, 0);
    if (this.repo.getPeca(apre).tipo === "comedia") 
      creditos += Math.floor(apre.audiencia / 5);
    return creditos;   
  }

  CalcularTotalCreditos(fatura) {
    let creditos = 0;
    for (let apre of fatura.apresentacoes) {
      creditos += Math.max(apre.audiencia - 30, 0);
      if (this.repo.getPeca(apre).tipo === "comedia") {
        creditos += this.CalcularCredito(apre);
      }
    }
    return creditos;
  }

  CalcularTotalApresentacao(apre) {
    let total = 0;
    const peca = this.repo.getPeca(apre);
    switch (peca.tipo) {
    case "tragedia":
      total = 40000;
      if (apre.audiencia > 30) {
        total += 1000 * (apre.audiencia - 30);
      }
      return total;
    case "comedia":
      total = 30000;
      if (apre.audiencia > 20) {
        total += 10000 + 500 * (apre.audiencia - 20);
      }
      total += 300 * apre.audiencia;
      return total;
    default:
        throw new Error(`Peça desconhecia: ${peca.tipo}`);
    }
  }                        

  CalcularTotalFatura(fatura) {
    let totalFatura = 0;
    for (let apre of fatura.apresentacoes) {
      totalFatura += this.CalcularTotalApresentacao(apre);
    }
    return totalFatura;
  }
}

const calc = new ServicoCalculoFatura(new Repositorio());


function gerarFaturaStr(fatura,calc) {
  let faturaStr = `Fatura ${fatura.cliente}\n`;
  for (let apre of fatura.apresentacoes) {
    faturaStr += `  ${calc.repo.getPeca(apre).nome}: ${formatarMoeda(calc.CalcularTotalApresentacao(apre))} (${apre.audiencia} assentos)\n`;
  }
  faturaStr += `Valor total: ${formatarMoeda(calc.CalcularTotalFatura(fatura))}\n`;
  faturaStr += `Créditos acumulados: ${calc.CalcularTotalCreditos(fatura)} \n`;
  return faturaStr;
}

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
const pecas = JSON.parse(readFileSync('./pecas.json'));


const faturaStr = gerarFaturaStr(faturas,calc);
/*const faturaHTML = gerarFaturaHTML(faturas, pecas,calc);*/

console.log(faturaStr);
/*console.log(faturaHTML);*/

