(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    function calcTempo(mil) {
        const min = Math.floor(mil / 60000);
        const sec = Math.floor((mil % 60000) / 1000);
        const valor = 6.5;
        const devido = min * valor / 60;
        const arredondamentoDeValor = parseFloat(devido.toFixed(2));
        return `
        ${min} minutos e ${sec} seguntos 
         O Valor Devido e ${arredondamentoDeValor}$`;
    }
    function Patio() {
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        function salvar(Veiculo) {
            localStorage.setItem("patio", JSON.stringify(Veiculo));
        }
        function adicionar(Veiculo, salva) {
            var _a, _b;
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${Veiculo.nome}</td>
            <td>${Veiculo.placa}</td>
            <td>${Veiculo.entrada}</td>
            <td>
                <button class="delete" data-placa="${Veiculo.placa}" > X </button>
            </td>            
            `;
            (_a = row.querySelector(".delete")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                remover(this.dataset.placa);
            });
            (_b = $("#patio")) === null || _b === void 0 ? void 0 : _b.appendChild(row);
            if (salva)
                salvar([...ler(), Veiculo]);
        }
        function remover(placa) {
            const { entrada, nome } = ler().find(veiculo => veiculo.placa === placa);
            const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());
            if (!confirm(`o Veiculos Permaneceu Por ${tempo} 
            Deseja Encerrar ? `))
                return;
            salvar(ler().filter((veiculo) => veiculo.placa !== placa));
            render();
        }
        function render() {
            $("#patio").innerHTML = "";
            const patio = ler();
            if (patio.length) {
                patio.forEach((Veiculo) => adicionar(Veiculo));
            }
        }
        return {
            ler,
            adicionar,
            remover,
            salvar,
            render
        };
    }
    Patio().render();
    (_a = $("#cadastrar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        var _a, _b;
        var nome = (_a = $("#nome")) === null || _a === void 0 ? void 0 : _a.value;
        var placa = (_b = $("#placa")) === null || _b === void 0 ? void 0 : _b.value;
        if (!nome || !placa) {
            alert("Canpos Obrigatorios");
            return;
        }
        Patio().adicionar({ nome, placa, entrada: new Date().toISOString() }, true);
        placa = '';
        nome = '';
    });
})();
