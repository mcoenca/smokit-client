//Attend le chargement du DOM que ce soit en Ruby (page load)
var username='';

//Execute après le chargement du DOM
var ready = function(){

document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
//
function onDeviceReady() {
alert('onDeviceReady');
var options = { timeout: 31000, enableHighAccuracy: true, maximumAge: 90000 };
navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

// onSuccess Geolocation
//

/*var onSuccess = function($position) {
alert('success');
};

var onError=function($error) {
alert('error');
};

alert('test1');
navigator.geolocation.getCurrentPosition(onSuccess, onError);
alert('test2');

// onError Callback receives a PositionError object
//
alert('avantonerror');
onSuccess('prout');
alert('apresonerror');

*/

//Accueil
$(".disconnected").show();
//alert('test3');
//Réglage de ce qu'on accepte comme input grace au plugin jquery alphanum(). Evite création d'utilisateurs aux noms mauvais pour les requetes. A COMPLETER DANS LE BACKEND
	$(".restricted_input").alphanum();

//Quand on clique sur le bouton d'id 'Connect'
	$('#connect').click(function() {
		Connect();
	});

//Quand on clique sur le bouton d'id 'Nouvel utilisateur'
	$('#create').click(function() {
		Create();
	});

//Quand on clique sur le bouton d'id 'Nouvelle smoke'
	$('#smoke1').click(function() {
		Smoke();
	});

//Quand on clique sur le bouton go_smoke -> stats
	$('#go_smoke_stats').click(function() {
		Stats();
	});
	//bouton animé en bleu
	$('#go_smoke_stats').mousedown(function() {
		this.src="assets/icon_stats_blue.png";
	});
	$('#go_smoke_stats').mouseup(function() {
		this.src="assets/icon_stats_white.png";
	});

//Quand on clique sur le bouton go_stats->smoke
	$('#go_stats_smoke').click(function(){
		go_stats_smoke();
	});
	//bouton animé en bleu
	$('#go_stats_smoke').mousedown(function() {
	this.src="assets/icon_smoke_blue.png";
	});
	$('#go_stats_smoke').mouseup(function() {
	this.src="assets/icon_smoke_white.png";
	});

//Quand on clique sur le bouton go_smoke->home
	$('#go_smoke_home').click(function() {
		go_smoke_home(); 
	});
	//bouton animé en bleu
	$('#go_smoke_home').mousedown(function() {
	this.src="assets/icon_logout_blue.png";
	});
	$('#go_smoke_home').mouseup(function() {
	this.src="assets/icon_logout_white.png";
	});
//Quand on clique sur le bouton go_stats->home
	$('#go_stats_home').click(function() {
		go_stats_home();
	});
	//bouton animé en bleu
	$('#go_stats_home').mousedown(function() {
	this.src="assets/icon_logout_blue.png";
	});
	$('#go_stats_home').mouseup(function() {
	this.src="assets/icon_logout_white.png";
	});

};

//Vérifie si le reload de la page provient de rails, ou est normal, pour bien gérer le reload du javascript sur la page home
$(document).ready(ready);
$(document).on('page:load', ready);


