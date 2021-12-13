    let saldoTotal = 0.00;

    var listaInvest;
    var listaAcao;

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

        // Coleta do ID do Investidor para carga das AÇÕES PARA RESGATE
        let searchParams = new URLSearchParams(window.location.search);
        let param;
        if (searchParams.has('id')) {param = searchParams.get('id');}
        
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

        // Função criada para popular dados do INVESTIMENTO e do RESGATE
        function popular(jsonObj) {
            tabela = $("#listagem");
            var saldo;
            var dadosInvestimentos = JSON.stringify(jsonObj.response.data.listaInvestimentos);
            listaInvest = JSON.parse(dadosInvestimentos);
            
            // DADOS DO INVESTIMENTO
            if((param=='')||(listaInvest[param]['indicadorCarencia']=="N")){
                var nome = listaInvest[param]['nome'];
                var objetivo = listaInvest[param]['objetivo'];
                saldo = parseFloat(listaInvest[param]['saldoTotal']);
                saldoTotal = saldo.formatMoney(2, "R$ ", ".", ",");
                //saldoTotal = numeroParaReal(saldo);
                $("#nome").text(nome);
                $("#objetivo").text(objetivo);
                $("#saldoTotal").text(saldoTotal);

                // DADOS DO RESGATE
                var dadosAcoes = JSON.stringify(jsonObj.response.data.listaInvestimentos[param].acoes);
                listaAcao = JSON.parse(dadosAcoes);
                for (var i = 0; i < listaAcao.length; i++) {
                    var id = listaAcao[i]['id'];
                    var nome = listaAcao[i]['nome'];
                    var rascunho = parseFloat(listaAcao[i]['percentual']);
                    var acumulado = (saldo/100)*rascunho;
                    percentual = acumulado.formatMoney(2, "R$ ", ".", ",");
                    //percentual = numeroParaReal(acumulado);
                    tabela.append(
                        '<tr>'+
                            '<td>' + nome + '<input type="hidden" id="nome'+id+'" value="'+nome+'"></td>'+
                            '<td>' + percentual + '<input type="hidden" id="percentual'+id+'" value="'+percentual+'"></td>'+
                            '<td><input class="form-control btn-block GRANA" id="acao'+id+'" type="text" placeholder="Digite quanto quer resgatar" onkeyup="compara('+id+')" onchange="acumulador()"><p class="text-danger etiq" id="etiqueta'+id+'"></p></td>'+
                        '</tr>'
                    );
                }
            }else{
                $("#nome").text("-");
                $("#objetivo").text("-");
                $("#saldoTotal").text("-");
                tabela.append('<tr><td colspan="3" class="text-center"> Nenhum Dado Disponível </td></tr>');
            }
            
            $(".GRANA").maskMoney({prefix: "R$ ",decimal: ",",thousands: "."});

        }
    
    });

    function compara(id){
        var p = $("#percentual"+id).val();
        p = realParaNumero(p);
        var a = $("#acao"+id).val();
        a = realParaNumero(a);
        if(a>p)
            $("#etiqueta"+id).text("O valor a resgatar não pode ser maior que "+numeroParaReal(p));
        else
            $("#etiqueta"+id).text("");
    }

    function acumulador(){
        var acum = 0.00;
        var total = 0.00;
        for (var i = 1; i <= listaAcao.length; i++) {
            acum = $("#acao"+i).val();
            if((acum=="")||(!isNaN(acum))||(acum === undefined)){}else{total += realParaNumero(acum);}
        }
        var rascunho = numeroParaReal(total);
        $("#resgate").text(rascunho);
        var saldo = realParaNumero(saldoTotal);
        if(total>saldo)
            $("#etiqResgate").text("O valor a resgatar não pode ser maior que "+saldoTotal);
        else
            $("#etiqResgate").text("");
    }

    function numeroParaReal(num){
        var num = num.toFixed(2).split('.');
        num[0] = "R$ " + num[0].split(/(?=(?:...)*$)/).join('.');
        return num.join(',');
    }

    function realParaNumero(txt){
        var flt = txt.replace(/[^0-9,]*/g, '').replace(',', '.');
        var v = parseFloat(flt);
        return v;
    }

    function resgate(){

        var liberaAcao = 0;
        var liberaTotal = false;
        var acum = 0.00;
        var total = 0.00;

        for (var i = 1; i <= listaAcao.length; i++) {
            var n = $("#nome"+i).val();
            var pc = $("#percentual"+i).val();
            var p;
            if((pc=="")||(!isNaN(pc))||(pc === undefined)){
                // nada
            }else{
                p = realParaNumero(pc);
            }
            var a = $("#acao"+i).val();
            if((a=="")||(!isNaN(a))||(a === undefined)){
                // nada
            }else{
                a = realParaNumero(a);
                if(a>p){
                    $("#erros").append('<tr><td><b>'+n+': </b></td><td>O valor a resgatar não pode ser maior que '+pc+'</td></tr>');
                    liberaAcao++;
                } 
                acum = $("#acao"+i).val();
                if((acum=="")||(!isNaN(acum))||(acum === undefined)){}else{total += realParaNumero(acum);}
            }
        }

        var saldo = realParaNumero(saldoTotal);
        if(total>saldo){
            liberaTotal = false;
        }else{
            liberaTotal = true;
        }

        if((liberaAcao<=0)&&(liberaTotal)){
            $("#resgateOk").modal('show');
        }else{
            $("#resgateNok").modal('show');
        }
        
    }