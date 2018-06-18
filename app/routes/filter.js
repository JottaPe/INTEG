function FilterIssues(req,res) {
    var unirest = require("unirest");
    var req = unirest("GET","http://jiraproducao.totvs.com.br/rest/api/latest/search?jql=Component Project in ('Manuten��o PRIME SP', 'Manuten��o PRIME BSO SP') AND issuetype != Associado (Sub-tarefa) AND status = Recusada AND resolution = Recusado AND resolved >= startOfMonth() AND reporter = elza.santos");
    var issues;

    // Autentica��o 
    req.auth({
        user: 'joao.balbino',
        pass: 'Coffe_jp231588',
        sendImmediately: true
    });

    //Cabe�alho REST
    req.headers({
        'Accept': 'application/json',
        'User-Agent': 'Unirest Node.js'
    });            

    //Par�metros de requis�o 
    req.query({maxResults: '1'});

    //Final da requis�o 
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