$(document).ready(function () {

    // Dados da API (EndPoint)
    var investimentos;
    var requestURL = 'https://run.mocky.io/v3/7b2dfe42-37a3-4094-b7ce-8ee4f8012f30';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        investimentos = request.response;
        popular(investimentos);
    }

    // Função criada para converter numeral em moeda BR-REAL
    Number.prototype.formatMoney = function(places, symbol, thousand, decimal) {
        places = !isNaN(places = Math.abs(places)) ? places : 2;
        symbol = symbol !== undefined ? symbol : "$";
        thousand = thousand || ",";
        decimal = decimal || ".";
        var number = this, 
            negative = number < 0 ? "-" : "",
            i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
    };
    
    // Função criada para popular tabela INVESTIMENTOS
    function popular(jsonObj) {
        tabela = $("#listagem");
        var bruto = JSON.stringify(jsonObj.response.data.listaInvestimentos);
        var lista = JSON.parse(bruto);
        for (var i = 0; i < lista.length; i++) {
            var nome = lista[i]['nome'];
            var objetivo = lista[i]['objetivo'];
            var saldoTotal = parseFloat(lista[i]['saldoTotal']);
            saldoTotal = saldoTotal.formatMoney(2, "R$ ", ".", ",");
            var carencia = lista[i]['indicadorCarencia'];
            tabela.append(
                '<tr ' + (carencia=='S'? 'onclick="semcarencia()"' : 'class="linha" onclick="submeter('+i+')"') + '>'+
                    '<td ' + (carencia=='S'? 'style="color:#bbb;"' : '') + '>' + nome + '</td>'+
                    '<td ' + (carencia=='S'? 'style="color:#bbb;"' : '') + '>' + objetivo + '</td>'+
                    '<td ' + (carencia=='S'? 'style="color:#bbb;"' : '') + '>' + saldoTotal + '<form id="frm'+i+'" action="investimentos.jsp"><input type="hidden" name="id" value="' + i + '"></form></td>'+
                '</tr>'
            );
        }
    }

});

function submeter(num){
    $("#frm"+num).submit();
}

function semcarencia(){
    $("#carencia").modal('show');
}