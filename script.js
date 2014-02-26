//Attend le chargement du DOM
$(function(){
	//Réglage de la page au début : déclaration variable globale et cachage de connecté et stats
	var username='';
	$(".connected").hide();
	$(".stats").hide();

	//Quand on clique sur le bouton d'id 'Connect'
	$('#connect').click(function() {
		//On prend la variable username dans l'input "Connect"
		username=$('#username_connect').val();
		//on fait la requete GET correspondante
		$.ajax({
			url: "/users/name/"+username+".json",
			dataType: "json",
			type: "get",
			success: function(donnees){
				//Connection réussie ! Ici on va écrire les modifications pour passer de non connecté à connecté dans le DOM

				$(".connected").show();
				$(".disconnected").hide();
				$("#title_smoke").text("Smok'it, "+username+" !");
				//var l = donnees['smokes'].length;
				//console.log(l);
			},
			error: function(xhr,textStatus,errorThrown){
				//Connection ratée... On rajoute l'erreur dans le DOM
				console.log(textStatus);
				console.log(errorThrown);
				$('#error1').show();
				$('#username_connect').css("border-color","red");
			}
		});

	});

	//Quand on clique sur le bouton d'id 'Nouvel utilisateur'
	$('#create').click(function() {
		//On prend la variable username dans l'input de texte "Nouvel util"
		username=$('#username_create').val();
		//on fait la requete POST correspondante
		$.ajax({
			url: "/users",
			type: "post",
			dataType: "json",
			data: {"authenticity_token":"WE9L/lhK8otgTy/+UZd8jOjGYBnRMs2I37JUL3v3tjQ=", "user[name]":username},
			success: function(donnees){
				//Création réussie ! Ici on va écrire les modifications pour passer de non connecté à connecté dans le DOM
				$(".connected").show();
				$(".disconnected").hide();
				$("#title_smoke").text("Smok'it, "+username+" !");
			},
			error: function(xhr,textStatus,errorThrown){
				//Connection ratée... On rajoute l'erreur dans le DOM
				console.log(textStatus);
				console.log(errorThrown);
				$('#error2').show();
				$('#username_create').css("border-color","red");
			}
		});

	});

	//Quand on clique sur le bouton d'id 'Nouvel utilisateur'
	$('#smoke').click(function() {
		//On prend la variable username la où elle est ! C'est à dire déja bien réglée
		//on fait la requete POST correspondante
		$.ajax({
			url: "/newsmoke",
			type: "post",
			dataType: "json",
			data: {"authenticity_token":"WE9L/lhK8otgTy/+UZd8jOjGYBnRMs2I37JUL3v3tjQ=",
 				"user[name]":username,
				"smoke[smoke_latitude]":1,
				"smoke[smoke_longitude]":2,
				"smoke[smoke_date]":new Date()
			},
			success: function(donnees){
				//Smoke réussie ! On affiche l'animation pour le montrer au monsieur
			alert('Smoke créée...       Tu as perdu 1min de ton espérance de vie et 0.3€, champion!');
			},
			error: function(xhr,textStatus,errorThrown){
				//Connection ratée... On affiche une animation pour le montrer au monsieur
				console.log(textStatus);
				console.log(errorThrown);
			alert("La connexion au server n'a pas réussi, mais tu vas quand même avoir le cancer.. LOL");
			}
		});

	});

	//Quand on clique sur le bouton go_smoke -> stats
	$('#go_smoke_stats').click(function() {
	//Remet à zéro les stats et affiche l'écran
		$(".smoke_list").remove();
		$(".connected").hide();
		$(".stats").show();
		$("#title_stats").text("Tes stats, "+username+" !");
	//requete ajax pour  remplir le tableau joli !
		$.ajax({
		url: "/users/name/"+username+".json",
		dataType: "json",
		type: "get",
		success: function(donnees){
			//Ca a marché, on va afficher bien les données dans le DOM .stats
			var l = donnees['smokes'].length;
			console.log(l);
			//Parcours à refaire pour une meilleure présentation
			$.each(donnees['smokes'],function(){
				$("#stat_table").append("<tr class='smoke_list'><th>"+this.smoke_date+
				"</th><th>"+this.smoke_latitude+
				"</th><th>"+this.smoke_longitude+
				"</th></tr>");
			});

		},
		error: function(xhr,textStatus,errorThrown){
			//Ca a raté, message d'erreur
			console.log(textStatus);
			console.log(errorThrown);
			alert('impossible de récupérer les stats...');
			}
		});

	});
	//Quand on clique sur le bouton go_stats->smoke
	$('#go_stats_smoke').click(function() {
		$(".connected").show();
		$(".stats").hide();
		$("#title_stats").text("Tes stats, "+username+" !");
	});
});
