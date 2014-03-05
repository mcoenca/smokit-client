//Attend le chargement du DOM que ce soit en Ruby (page load) ou normal
//Définition de la variable importante, username
var username='';

//Execute après le chargement du DOM
var ready = function(){


//Si on est déja connecté, on triche (haha) et on se connecte automatiquement avec deja_connect=true

var onSuccess = function(position) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

navigator.geolocation.getCurrentPosition(onSuccess, onError);

if (localStorage.getItem('username')!=null) {
		
	username=localStorage.getItem('username');
	Connect(true);
}
else {
	$(".disconnected").show();
}


//}
//Réglage de ce qu'on accepte comme input grace au plugin jquery alphanum(). Evite création d'utilisateurs aux noms mauvais pour les requetes. A COMPLETER DANS LE BACKEND
	$(".restricted_input").alphanum();

//Quand on clique sur le bouton d'id 'Connect'
	$('#connect').click(function() {
		Connect(false);
	});
	//bouton animé en bleu
	$('#connect').mousedown(function() {
		this.src="assets/orange_ok_blue.jpg";
	});
	$('#connect').mouseup(function() {
		this.src="assets/orange_ok_white.jpg";
	});

//Quand on clique sur le bouton d'id 'Nouvel utilisateur'
	$('#create').click(function() {
		Create();
	});
	//bouton animé en bleu
	$('#create').mousedown(function() {
		this.src="assets/orange_ok_blue.jpg";
	});
	$('#create').mouseup(function() {
		this.src="assets/orange_ok_white.jpg";
	});

//Quand on clique sur le bouton d'id 'Nouvelle smoke'
	$('#cigarette').click(function() {
		//insérer ici boucle if pour attendre une vingtaine de secondes
		if ($('#smoke1').prop('disabled')==true) { 
			alert("Attends un peu !");
		}
		else {
			Smoke();
		}
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


