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
    	$('#smoke2').fadeOut( 5000, function() {
    		//alert( "Animation2 complete." );

    		$('#smoke1').delay(10000).show( 0, function() {
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
			d[i][0]=today-1000*60*60*24*(7-i);
			d[i][1]=0;
		}
	}

	var L = 0; //à modifier: garder le dernier L en mémoire ?
	var T = 1; //à modifier: garder le dernier T en mémoire ?
	var compteur=0;

	if (liste[0]!=0) { //première clope
		while ( T-1 < liste.length ) {       // Compte le nombre de nouvelles clopes/jour
				
			if ( (liste[T-1] > today-1000*60*60*24*8) ) {

				while ( (T+compteur-1 < liste.length) && (liste[T+compteur-1]==liste[T-1]) ) {   //même jour que la/les clope(s) précédente(s) ?
					compteur=compteur+1;
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
			tickLength: 5
		},
		selection: {
			mode: "x"
		},
		grid: {
			markings: weekendAreas
		}
	};

	var plot = $.plot("#placeholder", [d], options);

	var overview = $.plot("#overview", [d], {
		series: {
			lines: {
				show: true,
				lineWidth: 1
			},
			shadowSize: 0
		},
		xaxis: {
			ticks: [],
			mode: "time"
		},
		yaxis: {
			ticks: [],
			min: 0,
			autoscaleMargin: 0.1
		},
		selection: {
			mode: "x"
		}
	});

	// now connect the two

	$("#placeholder").bind("plotselected", function (event, ranges) {

		// do the zooming

		plot = $.plot("#placeholder", [d], $.extend(true, {}, options, {
			xaxis: {
				min: ranges.xaxis.from,
				max: ranges.xaxis.to
			}
		}));

		// don't fire event on the overview to prevent eternal loop

		overview.setSelection(ranges, true);
	});

	$("#overview").bind("plotselected", function (event, ranges) {
		plot.setSelection(ranges);
	});

	/*$.each($donnees['smokes'],function(){
		$("#stat_table").append("<tr class='smoke_list'><th>"+this.smoke_date+
		"</th><th>"+this.smoke_latitude+
		"</th><th>"+this.smoke_longitude+
		"</th></tr>")
	}); 
	*/
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


