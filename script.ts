interface Veiculos{
    nome: string;
    placa: string;
    entrada: Date | string;
}

(function () {
    const $ = (query: string): HTMLInputElement | null => document.querySelector(query);

    function calcTempo(mil: number){
        const min = Math.floor(mil / 60000);
        const sec = Math.floor((mil % 60000) / 1000);

        const valor = 6.5;

        const devido = min * valor / 60;
        const arredondamentoDeValor = parseFloat(devido.toFixed(2))

        return `
        ${min} minutos e ${sec} seguntos 
         O Valor Devido e ${arredondamentoDeValor}$`;
    }

    function Patio(){ 
        
        function ler(): Veiculos[] {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }

        function salvar(Veiculo: Veiculos[]){
            localStorage.setItem("patio", JSON.stringify(Veiculo))
        }

        function adicionar(Veiculo: Veiculos, salva?: boolean){
            const row = document.createElement("tr");

            row.innerHTML = `
            <td>${Veiculo.nome}</td>
            <td>${Veiculo.placa}</td>
            <td>${Veiculo.entrada}</td>
            <td>
                <button class="delete" data-placa="${Veiculo.placa}" > X </button>
            </td>            
            `;            

            row.querySelector(".delete")?.addEventListener("click", function () {
                remover(this.dataset.placa);
            });

            $("#patio")?.appendChild(row);

           if(salva)salvar([...ler(), Veiculo]);
        }       

        function remover(placa: string){
            const {entrada, nome} = ler().find(veiculo => veiculo.placa === placa);

            const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());

            if(!confirm(`o Veiculos Permaneceu Por ${tempo} 
            Deseja Encerrar ? `)) return;

            salvar(ler().filter((veiculo) => veiculo.placa !== placa));
            render();
        }

        function render(){
            $("#patio")!.innerHTML = "";

            const patio = ler();

            if(patio.length){
                patio.forEach((Veiculo) => adicionar(Veiculo));
            }
        }

        return{
            ler,
            adicionar,
            remover,
            salvar,
            render
        }
    }

    Patio().render();

    $("#cadastrar")?.addEventListener("click", () => {
        const nome = $("#nome")?.value;
        const placa = $("#placa")?.value;

        if(!nome || !placa){
            alert("Canpos Obrigatorios");
            return;
        }

        Patio().adicionar({ nome, placa, entrada: new Date().toISOString()}, true);
    });
    
})();