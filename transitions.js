//Les différentes fonctions si requete réussies ou ratées pour différencier les requetes et les modifs dy code client et serveur

////////////////////////////////////////////////////////Connection et création
var Connection_success = function($donnees) {
	//Connection réussie ! Ici on va écrire les modifications pour passer de non connecté à connecté dans le DOM
		//alert('connection reussie');
		$(".connected").show();
		$("#title_smoke").text(username);
		
		//cache et remise à zéro de la page d'accueil
		$(".disconnected").hide();
		$('#error1').hide();
		$('#error2').hide();
};
var Connection_failure = function($textStatus,$errorThrown,$creation) {
	//Connection ou création ratée, on affiche un message d'erreur
	console.log($textStatus);
//alert($textStatus);
//alert($errorThrown);
	console.log($errorThrown);
	//alert('Bug connection !');
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
	//alert('Smoke créée... !');

	$('#smoke1').fadeOut( 100, function() {
    	//alert( "Animation1 complete." );
    	$('#smoke1').prop('disabled', true);
    	$('#smoke2').fadeOut( 4000, function() {
    		//alert( "Animation2 complete." );

    		$('#smoke1').delay(5000).show( 0, function() {
    			//alert( "Animation3 complete." );
    			$('#smoke1').prop('disabled', false);
    				$('#smoke2').show( 0, function() {
    				//alert( "Animation4 complete." );
    			});
    		});
    	});	
    });

};

var Smoke_failure = function($textStatus, $errorThrown) {
	//Création de smoke ratée, message d'erreur !
	console.log($textStatus);
	console.log($errorThrown);
	alert("La connexion au server n'a pas réussi, réessaie !");

};

var Stats_success = function($donnees) {
//Ca a marché, on va afficher bien les données dans le DOM .stats
var l = $donnees['smokes'].length;
//console.log(l);
//Parcours à refaire pour une meilleure présentation
	
	var i=0;
	var liste = new Array();
	var date= new Date();
	var today= Date.parse(Date().substring(0,15)).getTime();

	$.each($donnees['smokes'],function() { 
		date = Date.parse( this.smoke_date.substring(0,10) );
		liste[i] = date.getTime();
			i=i+1;
	});

	var d = new Array(); //Tableau Nbre de clopes Par Jour
	for (i=0;i<7;i++) {
		d[i]=new Array();
			for (j=0;j<2;j++) {
				d[i][j]=0;
		}
	}

	for (j=0;j<2;j++) {
		for (i=0;i<7;i++) {
			d[i][0]=today-1000*60*60*24*(6-i);
			d[i][1]=0;
		}
	}

	var d1 = new Array(); //Tableau Nbre de clopes Par Jour
	for (i=0;i<7;i++) {
		d1[i]=new Array();
			for (j=0;j<2;j++) {
				d1[i][j]=0;
		}
	}

	for (j=0;j<2;j++) {
		for (i=0;i<7;i++) {
			d1[i][0]=today-1000*60*60*24*(13-i);
			d1[i][1]=0;
		}
	}

	var L = 0; //parcourt d
	var L1 = 0; // parcourt d1
	var T = 1; //parcourt liste // à modifier: garder le dernier T en mémoire ?
	var compteur=0;

	if (liste[0]!=0) { //première clope
		while ( T-1 < liste.length ) {       // Compte le nombre de nouvelles clopes/jour
				
			if ( (liste[T-1] > today-1000*60*60*24*14) && (liste[T-1] < today-1000*60*60*24*7) ) {

				while ( (T+compteur-1 < liste.length) && (liste[T+compteur-1]==liste[T-1]) ) {   //même jour que la/les clope(s) précédente(s) ?
					compteur=compteur+1;
				}
				while ( L < 6 && d1[L1][0] != liste[T-1] ) {
					L1=L1+1;
				}
				d1[L1][1]=d1[L1][1] + compteur;
				L1=L1+1;
				T=T+compteur;
				compteur=0;
			}
			else if ( (liste[T-1] > today-1000*60*60*24*7) ) {

				while ( (T+compteur-1 < liste.length) && (liste[T+compteur-1]==liste[T-1]) ) {   //même jour que la/les clope(s) précédente(s) ?
					compteur=compteur+1;
				}
				while ( L < 6 && d[L][0] != liste[T-1] ) {
					L=L+1;
				}
				d[L][1]=d[L][1] + compteur;
				L=L+1;
				T=T+compteur;
				compteur=0;
			} 
			T=T+1;
		}
	}

	// first correct the timestamps - they are recorded as the daily
	// midnights in UTC+0100, but Flot always displays dates in UTC
	// so we have to add one hour to hit the midnights in the plot

	for (var i = 0; i < d.length; ++i) {
		d[i][0] += 60 * 60 * 1000;
	}

	// helper for returning the weekends in a period

	function weekendAreas(axes) {

		var markings = [],
			d = new Date(axes.xaxis.min);

		// go to the first Saturday

		d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 1) % 7))
		d.setUTCSeconds(0);
		d.setUTCMinutes(0);
		d.setUTCHours(0);

		var i = d.getTime();

		// when we don't set yaxis, the rectangle automatically
		// extends to infinity upwards and downwards

		do {
			markings.push({ xaxis: { from: i, to: i + 2 * 24 * 60 * 60 * 1000 } });
			i += 7 * 24 * 60 * 60 * 1000;
		} while (i < axes.xaxis.max);

		return markings;
	}

	var options = {
		xaxis: {
			mode: "time",
			tickLength: 5,
			timeformat: "%a %d %m"
		},
		bars: { 
			show: true, 
			fill: true,
			align: "center",
			barWidth: 24*60*60*1000,
		},
		//selection: {
		//	mode: "x"
		//},
		grid: {
			markings: weekendAreas,
			hoverable: true,
			clickable: true,
			backgroundColor: null,
		}
	};

	$("<div id='tooltip' class='stats'></div>").css({
		position: "absolute",
		display: "none",
		//border: "1px solid #fdd",
		padding: "2px",
		//"background-color": "#fee",
		opacity: 0.80,
	}).appendTo("body");

	$("#placeholder").bind("plotclick", function (event, pos, item) {
		if (item) {
			var y = item.datapoint[1].toFixed(2);

			$("#tooltip").html(y)
				.css({top: item.pageY-20, left: item.pageX-20})
				.fadeIn(200);
		}
	});

	var plot = $.plot("#placeholder", [d], options);
	
};

var Stats_failure = function($textStatus, $errorThrown) {
	//Ca a raté, message d'erreur
	console.log($textStatus);
	console.log($errorThrown);
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
	//Reset des cookies 
		localStorage.removeItem('username');
		$(".disconnected").show();
		$(".connected").hide();
};

//Quand on clique sur le bouton go_stats->home
var go_stats_home = function() {
		username='';
		localStorage.removeItem('username');
		$(".disconnected").show();
		$(".stats").hide();
};

//Fonction de la geoloc
var onSuccess = function(position) {
//En cas de succès on modifie les variables lat et long de la smoke

 $("#latitude_data").text(position.coords.latitude);
 $("#longitude_data").text(position.coords.latitude);


	la=position.coords.latitude;
	alert(la);
	lon=position.coords.longitude;
	alert(lon);
};


var onError = function(error) {
//alert('error geoloc');
//On ne fait rien en cas d'erreur 
};


