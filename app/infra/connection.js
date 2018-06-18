function ConnectionJira (type ,url){
	var unirest = require("unirest");
    var req = unirest(type,url) ;
    var retorno ;

    req.auth({
      user: 'joao.balbino',
      pass: 'Coffe_jp231588',
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
            
            return resp.body
            
            
            
        }; 
    });
}