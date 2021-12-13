<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<title>Investimentos</title>
	<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="css/customSaque.css">
    <script src="js/customSaque.js"></script>
    <script src="js/jquery.maskMoney.js" type="text/javascript"></script>
</head>
<body>
    <div class="container">
        <div class="row"><div class="col"><h3>&nbsp;</h3></div></div>
    </div>
    <div class="container">
        <div class="row"><div class="col"><h3><b>INVESTIMENTOS</b></h3></div></div>
    </div>
    <div class="container">
        <div class="container-fluid fundo">
            <div class="row">
                <div class="col-1"><h1><i class="fas fa-user-alt"></i></h1></div>
                <div class="col-3">
                    <div>
                        <div class="col"><small>NOME</small></div>
                        <div class="col"><label id="nome">Fulano</label></div>
                    </div>
                </div>
                <div class="col-1 border-left"><h1><i class="fas fa-chart-line"></i></h1></div>
                <div class="col-3">
                    <div>
                        <div class="col"><small>OBJETIVO</small></div>
                        <div class="col"><label id="objetivo">Comprar Tal Coisa</label></div>
                    </div>
                </div>
                <div class="col-1 border-left"><h1><i class="fas fa-donate"></i></h1></div>
                <div class="col-3">
                    <div>
                        <div class="col"><small>SALDO TOTAL</small></div>
                        <div class="col"><label id="saldoTotal">R$ XX.XXX,XX</label></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row"><div class="col"><h3>&nbsp;</h3></div></div>
    </div>
    <div class="container">
        <div class="row"><div class="col"><h3><b>RESGATE</b></h3></div></div>
    </div>
    <div class="container">
        <table class="table">
            <thead>
                <th>AÇÃO</th>
                <th>SALDO ACUMULADO</th>
                <th>VALOR A RESGATAR</th>
            </thead>
            <tbody id="listagem">
            </tbody>
        </table>
    </div>
    <div class="container">
        <div class="row"><div class="col"><h3>&nbsp;</h3></div></div>
    </div>
    <div class="container">
        <table class="table">
            <tbody>
                <tr>
                    <td><b>Valor do Resgate:</b>&nbsp;R$&nbsp;<label id="resgate">0,00</label><label class="text-danger etiq" id="etiqResgate"></label></td>
                </tr>
            </tbody>
        </table>
        <div class="row">
            <div class="col-6">&nbsp;</div>
            <div class="col"><button class="btn btn-secondary btn-block" onclick="location.href = 'index.jsp'"><small>CANCELAR</small></button></div>
            <div class="col"><button class="btn btn-primary btn-block" onclick="resgate()"><small>CONFIRMAR RESGATE</small></button></div>
        </div>
    </div>
    <div class="container">
        <div class="row"><div class="col"><h3>&nbsp;</h3></div></div>
    </div>
    <!-- Modal Resgate (OK) -->
    <div class="modal" id="resgateOk">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body text-center">
                    <h3><b>Resgate efetuado com sucesso!</b></h3>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary borda" data-dismiss="modal" onclick="location.href = 'listagem.html'">Novo Resgate</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Resgate (Não OK) -->
    <div class="modal" id="resgateNok">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body text-center">
                    <h3><b>Dados Inválidos!</b></h3>
                    <p>Você preencheu um ou mais campos com um valor acima do permitido:</p>
                    <div class="row">
                        <div class="col">&nbsp;</div>
                        <div class="col-8">
                            <table>
                                <tbody id="erros"></tbody>
                            </table>
                        </div>
                        <div class="col">&nbsp;</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary borda" data-dismiss="modal">Corrigir</button>
                </div>
            </div>
        </div>
    </div>
</body>
</html>