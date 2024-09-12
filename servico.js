module.exports = class ServicoCalculoFatura {

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
  