//Attend le chargement du DOM que ce soit en Ruby (page load)
var username='';

//Execute après le chargement du DOM
var ready = function(){

alert('page prete');
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
//
function onDeviceReady() {
var options = { timeout: 5000 };
navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
}

// onSuccess Geolocation
//
function onSuccess(position) {
var element = document.getElementById('geolocation');
element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />' +
'Longitude: ' + position.coords.longitude + '<br />' +
'Altitude: ' + position.coords.altitude + '<br />' +
'Accuracy: ' + position.coords.accuracy + '<br />' +
'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
'Heading: ' + position.coords.heading + '<br />' +
'Speed: ' + position.coords.speed + '<br />' +
'Timestamp: ' +
position.timestamp + '<br />';
}

// onError Callback receives a PositionError object
//
function onError(error) {
alert('code: ' + error.code + '\n' +
'message: ' + error.message + '\n');
}
//Accueil
	$(".disconnected").show();

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


