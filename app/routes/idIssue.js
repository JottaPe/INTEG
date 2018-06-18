function idIssue() {
    var unirest = require("unirest");
    var req = unirest("GET","http://jiraproducao.totvs.com.br/rest/api/latest/issue/MTEC-1045") ;
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
}
