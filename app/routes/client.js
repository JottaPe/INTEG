module.exports = function(app){

    // Exemplo de invocaÃ§Ã£o do mÃ©todo GET 
    app.get('/filter',function(req,res){
        
        var unirest = require("unirest");
        var req = unirest("GET","http://jiraproducao.totvs.com.br/rest/api/latest/search?jql=Component in ('PRIME SP', 'PRIME BSO SP') AND issuetype != apoio");
        var issues;
        
        // Autenticação 
        req.auth({
          user: 'joao.balbino',
          pass: 'Jottape_2315',
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
     });

     app.get('/issue',function(req,res){
        
        var unirest = require("unirest");
        var req = unirest("GET","http://jiraproducao.totvs.com.br/rest/api/latest/issue/MPBS-437") ;
        var Issue ;

        req.auth({
          user: 'joao.balbino',
          pass: 'Jottape_2315',
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
     });

}

