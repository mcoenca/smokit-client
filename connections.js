//Fichiers dépendant des repositories, car les url de requetes et les headers dépendent de si on est sur l'app/ en local/vers heroku...


//Var connection
var Connect=function($deja_connect) {
	//On prend la variable username dans l'input "Connect" si on est pas déja connecté et on le met dans localStorage
	if($deja_connect==false){
		username=$('#username_connect').val();
		localStorage.setItem('username',username);
	}

	//on fait la requete GET correspondante
	$.ajax({
			url: "http://holdit.herokuapp.com/users/name/"+username+".json",
			dataType: "json",
			type: "get",
			headers: { 
        			Accept : "application/json"
   				 },
		success: function(donnees){
			//alert('connection réussie');
			Connection_success(donnees);
		},
		error: function(xhr,textStatus,errorThrown){
			//alert('erreur de connection');
			Connection_failure(textStatus,errorThrown,false);
		}
	});
};

//Connection création
var Create = function() {
	//On prend la variable username dans l'input de texte "Nouvel util"
	username=$('#username_create').val();
	//on fait la requete POST correspondante
	$.ajax({
			url: "http://holdit.herokuapp.com/users",
			type: "post",
			dataType: "json",
			headers: { 
        			Accept : "application/json"
   				 },
			data: {"authenticity_token":"WE9L/lhK8otgTy/+UZd8jOjGYBnRMs2I37JUL3v3tjQ=", "user[name]":username},
		success: function(donnees){
		localStorage.setItem('username',username);
			Connection_success(donnees);
		},
		error: function(xhr,textStatus,errorThrown){
			Connection_failure(textStatus, errorThrown, true)
		}
	});
};

//Connection Stats
var Stats = function() {
	//Remet à zéro les stats et affiche l'écran
	$(".smoke_list").remove();
	$(".connected").hide();
	$(".stats").show();
	$("#title_stats").text("Tes stats, "+username+" !");
	//requete ajax pour  remplir le tableau joli !
	$.ajax({
		url: "http://holdit.herokuapp.com/users/name/"+username+".json",
		dataType: "json",
		headers: { 
        		Accept : "application/json"
   			 },
		type: "get",
	success: function(donnees){
		Stats_success(donnees);
	},
	error: function(xhr,textStatus,errorThrown){
		Stats_failure(textStatus, errorThrown);
	}
	});

};

//Création de Smoke
var Smoke = function() {

	//On prend la variable username la où elle est ! C'est à dire déja bien réglée
	//on fait la requete POST correspondante
	$.ajax({
			url: "http://holdit.herokuapp.com/newsmoke",
			type: "post",
			dataType: "json",
   			headers: { 
        			Accept : "application/json"
   				 },
			data: {"authenticity_token":"WE9L/lhK8otgTy/+UZd8jOjGYBnRMs2I37JUL3v3tjQ=",
 				"user[name]":username,
				"smoke[smoke_latitude]":1,
				"smoke[smoke_longitude]":2,
				"smoke[smoke_date]":new Date()},
		success: function(donnees){
			Smoke_success(donnees);
		},
		error: function(xhr,textStatus,errorThrown){
			Smoke_failure(textStatus,errorThrown);
		}
	});			

};
