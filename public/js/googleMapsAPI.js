function getLocation(){
	if (navigator.geolocation) {
	          navigator.geolocation.getCurrentPosition(function(position) {

							init(position.coords.latitude , position.coords.longitude);
	          });
  } else {
	  // Browser doesn't support Geolocation
	  alert("Error: Your browser doesn\'t support geolocation.");
	}
}

function init(pos_lat, pos_lng){
	let pos = {}, options ;

	if( pos_lat != null || pos_lng != null ){
		pos = {
			zoom : 14,
			lat: pos_lat ,
			lng: pos_lng ,
		}
		options = {
	        center: new google.maps.LatLng(pos.lat, pos.lng) ,
	        zoom: pos.zoom ,
	        mapTypeId: google.maps.MapTypeId.ROADMAP,
	        scrollwheel: true,
	        draggable: true,
	        disableDoubleClickZoom: true
	    };
	}else{	//default center of france without position
		options = {
	        center: new google.maps.LatLng( 46.92475  , 2.0517 ) ,
	        zoom: 6,
	        mapTypeId: google.maps.MapTypeId.ROADMAP,
	        scrollwheel: true,
	        draggable: true,
	        disableDoubleClickZoom: true
	    };

	}

	//search the markup for insertion
  let map = new google.maps.Map(document.getElementById("ggmaps_map"), options);



//instrion of list of marker
	let tMarker = [
		{
			lat : 45.833608,
			lon : 6.865089,
			title : "test",
			text : "test"
		}
	]
//add marker
// tMarker = array of
	createMarker( tMarker, map, pos);
}




function createMarker( tab, map, pos){
  let oLatLng, oMarker, data;
  let i, nb = tab.length;
  let contenu = "";
  let infowindow;

	if (pos.lat != undefined || pos.lng != undefined){
		oLatLng = new google.maps.LatLng(pos.lat, pos.lng);
		oMarker = new google.maps.Marker({
				position : oLatLng,
				map : map,
		})
	}


  for( i = 0; i < nb; i++){
    data = tab[i];
    oLatLng = new google.maps.LatLng( data.lat, data.lon);

    infowindow = new google.maps.InfoWindow();

    	oMarker = new google.maps.Marker({
      		position : oLatLng,
      		map : map,
      		title : data.title,
      		animation: google.maps.Animation.DROP,
      		icon : "img/festival.png"
    	})

		}






  contenu = contenu_texte(data.title, data.text);


	setEventMarker(oMarker,infowindow,contenu);

}


function contenu_texte(title, body){
	let ret;
	ret = '<h1 class= "ggmaps_entete">';
	ret += title;
	ret += '</h1>';

	ret += '<p class= "ggmaps_corps">';
	ret += body ;
	ret += '</p>' ;

	return ret;

}



function setEventMarker( oMarker, infowindow, text){
    google.maps.event.addListener( oMarker, 'click', function() {
    	// affectation du texte
    	infowindow.setContent( text);
    	// affichage InfoWindow
    	infowindow.open( this.getMap(), this);
    });
}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
												'Error: The Geolocation service failed.' :
												'Error: Your browser doesn\'t support geolocation.');
	infoWindow.open(map);
}
