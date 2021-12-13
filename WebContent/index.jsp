<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<title>Investimentos</title>
	<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="css/customListagem.css">
    <script src="js/customListagem.js"></script>
</head>
<body>
    <div class="container">
        <div class="row"><div class="col"><h1>&nbsp;</h1></div></div>
    </div>
    <div class="container">
        <div class="row"><div class="col"><h3><b>INVESTIMENTOS</b></h3></div></div>
    </div>
    <div class="container">
            <table class="table">
                <thead>
                    <th>NOME</th>
                    <th>OBJETIVO</th>
                    <th>SALDO TOTAL</th>
                </thead>
                <tbody id="listagem">
                </tbody>
            </table>
    </div>

    <!-- Modal Sem Carencia -->
    <div class="modal" id="carencia">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Investimentos</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                    Desculpe, no momento seus investimentos estão sem carência.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    </div>

</body>
</html>