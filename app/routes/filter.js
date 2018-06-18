function FilterIssues(req,res) {
    var unirest = require("unirest");
    var req = unirest("GET","http://jiraproducao.totvs.com.br/rest/api/latest/search?jql=Component Project in ('Manutenção PRIME SP', 'Manutenção PRIME BSO SP') AND issuetype != Associado (Sub-tarefa) AND status = Recusada AND resolution = Recusado AND resolved >= startOfMonth() AND reporter = elza.santos");
    var issues;

    // Autenticação 
    req.auth({
        user: 'joao.balbino',
        pass: 'Coffe_jp231588',
        sendImmediately: true
    });

    //Cabeçalho REST
    req.headers({
        'Accept': 'application/json',
        'User-Agent': 'Unirest Node.js'
    });            

    //Parâmetros de requisão 
    req.query({maxResults: '1'});

    //Final da requisão 
    req.end(function(resp){

        if (resp.error) {
            console.log("Deu Ruim");
            res.send(resp.body);
        }else {

            issues = resp.body
            res.render('client/itens',{filter:resp.body});

        }; 
    });   
}