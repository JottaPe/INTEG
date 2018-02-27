module.exports = function(app){

    // Exemplo de invocação do método GET 
    app.get('/filter',function(req,res){
        
        var unirest = require("unirest");
        var req = unirest("GET","http://jiraproducao.totvs.com.br/rest/api/latest/search?jql=Component in ('PRIME SP', 'PRIME BSO SP') AND issuetype != apoio");
        var issues;

        req.auth({
          user: 'joao.balbino',
          pass: 'Jottape_2315',
          sendImmediately: true
        });
        
        req.headers({
            'Accept': 'application/json',
            'User-Agent': 'Unirest Node.js'
        });            
        
        req.query({maxResults: '100'});

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

