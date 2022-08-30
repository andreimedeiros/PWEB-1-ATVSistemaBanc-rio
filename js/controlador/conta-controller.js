class ContaController {
    constructor() {
        this.repositorioContas = new RepositorioContas();
    }

    adicionarConta(conta) {
        this.repositorioContas.adicionar(conta);
    }

    listar() {
        this.repositorioContas.getContas().forEach(conta =>
            this.inserirContaNoHTML(conta)
        );
    }

    inserir(evento) {
        evento.preventDefault();
        const elementoNumero = document.querySelector('#numero');
        const elementoSaldo = document.querySelector('#saldo');
        const elementoAniversario = document.querySelector('#dataAniversario')
        const tipoConta = document.querySelector('#tipoconta')
        const tipoContaValor = tipoConta.value

        // console.log(tipoContaValor)

        if (tipoContaValor == "conta") {
            const conta = new Conta(elementoNumero.value,
                Number(elementoSaldo.value), elementoAniversario.value);
            this.repositorioContas.adicionar(conta);
            this.inserirContaNoHTML(conta);
            // console.log(conta)
        }
        if (tipoContaValor == "poupanca") {
            const poupanca = new Poupanca(elementoNumero.value,
                Number(elementoSaldo.value), elementoAniversario.value);
            this.repositorioContas.adicionar(poupanca);
            this.inserirContaNoHTML(poupanca);
            console.log(poupanca)
            console.log(poupanca.dataAniversario)
        }
        if (tipoContaValor == "contabonificada") {
            const contab = new ContaBonificada(elementoNumero.value,
                Number(elementoSaldo.value));
            this.repositorioContas.adicionar(contab);
            this.inserirContaNoHTML(contab);
            // console.log(contab)
        }

    }

    inserirContaNoHTML(conta) {
        const elementoP = document.createElement('p');
        elementoP.textContent = 'Conta ' + conta.numero + ': ' + conta.saldo;
        const botaoApagar = document.createElement('button');
        botaoApagar.textContent = 'X';

        botaoApagar.addEventListener('click', (event) => {
            this.repositorioContas.remover(conta.numero);
            event.target.parentElement.remove();
        });

        elementoP.appendChild(botaoApagar);
        document.body.appendChild(elementoP);
    }
}
