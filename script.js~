//Attend le chargement du DOM que ce soit en Ruby (page load)
var username='';

//Execute après le chargement du DOM
var ready = function(){

alert('page prete');
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
//
function onDeviceReady() {
alert('onDeviceReady');
var options = { timeout: 31000, enableHighAccuracy: true, maximumAge: 90000 };
navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
}

// onSuccess Geolocation
//
alert('test1');
navigator.geolocation.getCurrentPosition(onSuccess, onError);
alert('test2');
geolocation.getCurrentPosition(onSuccess, onError);
function onSuccess(position) {
alert('success');
}

// onError Callback receives a PositionError object
//
function onError(error) {
alert('code: ' + error.code + '\n' +
'message: ' + error.message + '\n');
}
//Accueil
	$(".disconnected").show();
alert('test3');
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
	$('#smoke').click(function() {
		Smoke();
	});

//Quand on clique sur le bouton go_smoke -> stats
	$('#go_smoke_stats').click(function() {
		Stats();
	});

//Quand on clique sur le bouton go_stats->smoke
	$('#go_stats_smoke').click(function(){
		go_stats_smoke();
	});

//Quand on clique sur le bouton go_smoke->home
	$('#go_smoke_home').click(function() {
		go_smoke_home(); 
	});
};

//Vérifie si le reload de la page provient de rails, ou est normal, pour bien gérer le reload du javascript sur la page home
$(document).ready(ready);
$(document).on('page:load', ready);


