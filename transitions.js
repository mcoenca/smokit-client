//Les différentes fonctions si requete réussies ou ratées pour différencier les requetes et les modifs dy code client et serveur

////////////////////////////////////////////////////////Connection et création
var Connection_success = function($donnees) {
	//Connection réussie ! Ici on va écrire les modifications pour passer de non connecté à connecté dans le DOM
		$(".connected").show();
		$(".disconnected").hide();
		$("#title_smoke").text("Smok'it, "+username+" !");
};
var Connection_failure = function($textStatus,$errorThrown,$creation) {
	//Connection ou création ratée, on affiche un message d'erreur
	console.log($textStatus);
	console.log($errorThrown);
	if ($creation) {
		$('#error2').show();
		$('#username_create').css("border-color","red");
	}
	else {
		$('#error1').show();
		$('#username_connect').css("border-color","red");	
	}
};

//Création ou error de smoke
var Smoke_success = function($donnees) {
	//Création de smoke réussie, petite animation
	alert('Smoke créée... !');
};

var Smoke_failure = function($textStatus, $errorThrown) {
	//Création de smoke ratée, message d'erreur !
	console.log(textStatus);
	console.log(errorThrown);
	alert("La connexion au server n'a pas réussi, réessaie !");
};

var Stats_success = function($donnees) {
	//Ca a marché, on va afficher bien les données dans le DOM .stats
	var l = $donnees['smokes'].length;
	console.log(l);
	//Parcours à refaire pour une meilleure présentation
		$.each($donnees['smokes'],function(){
			$("#stat_table").append("<tr class='smoke_list'><th>"+this.smoke_date+
			"</th><th>"+this.smoke_latitude+
			"</th><th>"+this.smoke_longitude+
			"</th></tr>")
		});
};

var Stats_failure = function($textStatus, $errorThrown) {
	//Ca a raté, message d'erreur
	console.log(textStatus);
	console.log(errorThrown);
	alert('impossible de récupérer les stats...');
};

/////////////////////////////////////////////////////Fonctions de transitions pures

//Quand on clique sur le bouton go_stats->smoke
var go_stats_smoke = function() {
		$(".connected").show();
		$(".stats").hide();
		$("#title_stats").text("Tes stats, "+username+" !");
};

//Quand on clique sur le bouton go_smoke->home
var go_smoke_home = function() {
		username='';
		$(".disconnected").show();
		$(".connected").hide();
};
