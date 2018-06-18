module.exports = function(app){

    // Exemplo de invocação do método GET 
    app.get('/filter',function(req,res){
        FilterIssues(req,res);
     });

     app.get('/issue',function(req,res){
        IdIssue();        
     });

}

function FilterIssues(req,res) {
    var unirest = require("unirest");
    var req = unirest("GET","http://jiraproducao.totvs.com.br/rest/api/latest/search?jql= project = 'MPRIMESP' ");
    var issues;

    // Autentica��o 
    req.auth({
        user: 'joao.balbino',
        pass: 'Jottape_231588',
        sendImmediately: true
    });

    //Cabe�alho REST
    req.headers({
        'Accept': 'application/json',
        'User-Agent': 'Unirest Node.js'
    });            

    //Par�metros de requis�o 
    req.query({maxResults: '10'});

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

function idIssue() {
    var unirest = require("unirest");
    var req = unirest("GET","http://jiraproducao.totvs.com.br/rest/api/latest/issue/MPRIMESP-15866") ;
    var Issue ;

    console.log("PASSOU AQUI ");

    req.auth({
        user: 'joao.balbino',
        pass: 'Jottape_231588',
        sendImmediately: true
    });
    req.headers({
        'Accept': 'application/json',
        'User-Agent': 'Unirest Node.js'
    })
    req.end(function(resp){
        if (resp.error) {
            console.log("Deu Ruim");
            res.send(resp.body);
        }else {
            
            Issue = resp.body
            
            res.render('client/issue',{issue:resp.body});
            
        }; 
    });
}
