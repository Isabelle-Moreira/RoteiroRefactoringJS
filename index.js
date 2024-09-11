const { readFileSync } = require('fs');


 // função query
 function getPeca(apresentacao) {
  return pecas[apresentacao.id];
}

function gerarFaturaStr (fatura, pecas) {

    //let totalFatura = 0;
    //let creditos = 0;
    //let faturaStr = `Fatura ${fatura.cliente}\n`;
    //const formato = new Intl.NumberFormat("pt-BR",
    //                      { style: "currency", currency: "BRL",
    //                        minimumFractionDigits: 2 }).format;

    function calcularCredito(apre) {
      let creditos = 0;
      creditos += Math.max(apre.audiencia - 30, 0);
      if (getPeca(apre).tipo === "comedia") 
         creditos += Math.floor(apre.audiencia / 5);
      return creditos;   
    }

    function formatarMoeda(valor) {
      return new Intl.NumberFormat("pt-BR",
        { style: "currency", currency: "BRL",
          minimumFractionDigits: 2 }).format(valor/100);
    }



    function calcularTotalApresentacao(apre) {
      let total = 0;
      const peca = getPeca(apre);
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

    function calcularTotalFatura() {
      let totalFatura = 0;
      for (let apre of fatura.apresentacoes) {
        totalFatura += calcularTotalApresentacao(apre);
      }
      return totalFatura;
    }


    function calcularTotalCreditos() {
      let creditos = 0;
      for (let apre of fatura.apresentacoes) {
        creditos += Math.max(apre.audiencia - 30, 0);
        if (getPeca(apre).tipo === "comedia") {
          creditos += Math.floor(apre.audiencia / 5);
        }
      }
      return creditos;
    }
    let faturaStr = `Fatura ${fatura.cliente}\n`;
    for (let apre of fatura.apresentacoes) {
      faturaStr += `  ${getPeca(apre).nome}: ${formatarMoeda(calcularTotalApresentacao(apre))} (${apre.audiencia} assentos)\n`;
    }

    faturaStr += `Valor total: ${formatarMoeda(calcularTotalFatura())}\n`;
    faturaStr += `Créditos acumulados: ${calcularTotalCreditos()} \n`;
    return faturaStr;
  }

const faturas = JSON.parse(readFileSync('./faturas.json'));
const pecas = JSON.parse(readFileSync('./pecas.json'));
const faturaStr = gerarFaturaStr(faturas, pecas);
console.log(faturaStr);
