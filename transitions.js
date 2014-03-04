//Les différentes fonctions si requete réussies ou ratées pour différencier les requetes et les modifs dy code client et serveur

////////////////////////////////////////////////////////Connection et création
var Connection_success = function($donnees) {
	//Connection réussie ! Ici on va écrire les modifications pour passer de non connecté à connecté dans le DOM
		$(".connected").show();
		$(".disconnected").hide();
		$("#title_smoke").text(username);
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


	//$(['src:"assets/clope_allumee.png"']).fadeIn("slow");
	//$(['src:"assets/clope_cramee.png"']).fadeIn("slow");
	//$(['src:"assets/clope_eteinte.png"']).show();
	//$(['src:"assets/clope_allumee.png"']).hide();
	//$(['src:"assets/clope_cramee.png"']).hide();

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
		
		var i=0;
		var liste = new Array();

		$.each($donnees['smokes'],function() {

			liste[i] = this.smoke_date.setUTCMilliseconds(0);
			liste[i] = this.smoke_date.setUTCSeconds(0);
			liste[i] = this.smoke_date.setUTCMinutes(0);
			liste[i] = this.smoke_date.setUTCHours(0);
			liste[i] = this.smoke_date.getTime(0);
				i=i+1;
		});

		/*
		$.each($donnees['smokes'],function() {
				liste[i]=this.smoke_date;
				i=i+1;
		});

		for (var i = 0; i < liste.length; i++){
			liste[i] = liste[i].setUTCMilliseconds(0);
			liste[i] = liste[i].setUTCSeconds(0);
			liste[i] = liste[i].setUTCMinutes(0);
			liste[i] = liste[i].setUTCHours(0);
			liste[i] = liste[i].getTime(0);
		}
		*/

		var d = new Array(); //Tableau Nbre de clopes Par Jour


		var L = 0; //à modifier: garder le dernier L en mémoire ?
		var T = 1; //à modifier: garder le dernier T en mémoire ?

		var compteur=0;

		if (liste[0]!=0) { //première clope

			while ( T-1 < liste.length ) {       // Compte le nombre de nouvelles clopes/jour
				
				while ( T+compteur-1 < liste.length && liste[T+compteur-1]=liste[T-1] ) {   //même jour que la/les clope(s) précédente(s) ?
					compteur=compteur+1;
				}
				
				
				//remplissage du tableau d
				d[0][0] = liste[0];
				while ( d[0][d.length-1] != liste[T-1] ) {     //création des jours manquants
					d[0][d.length]=d[0][d.length-1] + 1000*60*60*24;
					d[1][d.length]=0;
				}
				while ( L < d.length ) {
					if ( d[0][L] == liste[T-1] ) {		//ajout des clopes
						d[1][L]=d[1][L] + compteur;
					}
					else {
						L=L+1;
					}
				}

				T=T+compteur;
				compteur=0;
			}
		}




		// var d = [[1196463600000, 0], [1196550000000, 0], [1196636400000, 0], [1196722800000, 77], [1196809200000, 3636], [1196895600000, 3575], [1196982000000, 2736], [1197068400000, 1086], [1197154800000, 676], [1197241200000, 1205], [1197327600000, 906], [1197414000000, 710], [1197500400000, 639], [1197586800000, 540], [1197673200000, 435], [1197759600000, 301], [1197846000000, 575], [1197932400000, 481], [1198018800000, 591], [1198105200000, 608], [1198191600000, 459], [1198278000000, 234], [1198364400000, 1352], [1198450800000, 686], [1198537200000, 279], [1198623600000, 449], [1198710000000, 468], [1198796400000, 392], [1198882800000, 282], [1198969200000, 208], [1199055600000, 229], [1199142000000, 177], [1199228400000, 374], [1199314800000, 436], [1199401200000, 404], [1199487600000, 253], [1199574000000, 218], [1199660400000, 476], [1199746800000, 462], [1199833200000, 448], [1199919600000, 442], [1200006000000, 403], [1200092400000, 204], [1200178800000, 194], [1200265200000, 327], [1200351600000, 374], [1200438000000, 507], [1200524400000, 546], [1200610800000, 482], [1200697200000, 283], [1200783600000, 221], [1200870000000, 483], [1200956400000, 523], [1201042800000, 528], [1201129200000, 483], [1201215600000, 452], [1201302000000, 270], [1201388400000, 222], [1201474800000, 439], [1201561200000, 559], [1201647600000, 521], [1201734000000, 477], [1201820400000, 442], [1201906800000, 252], [1201993200000, 236], [1202079600000, 525], [1202166000000, 477], [1202252400000, 386], [1202338800000, 409], [1202425200000, 408], [1202511600000, 237], [1202598000000, 193], [1202684400000, 357], [1202770800000, 414], [1202857200000, 393], [1202943600000, 353], [1203030000000, 364], [1203116400000, 215], [1203202800000, 214], [1203289200000, 356], [1203375600000, 399], [1203462000000, 334], [1203548400000, 348], [1203634800000, 243], [1203721200000, 126], [1203807600000, 157], [1203894000000, 288]];

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

//Quand on clique sur le bouton go_stats->home
var go_stats_home = function() {
		username='';
		$(".disconnected").show();
		$(".stats").hide();
};


