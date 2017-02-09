// TODO: Put your JS code in here
API_KEY = "AIzaSyAwld6kbHQYILY1oBxIqAbsO5kKZ1BzlM4";
MAPS_API = "AIzaSyAZbnL0b3sNHGI6-sl1MN76-Lj0jVPZZoo";

$(document).ready(function() {
  $('#address-form').on('submit', function(event) {
    event.preventDefault();

    var address = $('#address').val().replace(/\s+/g, '+'),
        locality = $('#locality').val(),
        postal_code = $('#postal_code').val(),
        country = $('#country').val(),
        url_address = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&components=locality:' + locality + '|postal_code:' + postal_code + '|country:' + country + '&key=' + API_KEY;
    $.ajax({
      type: 'GET',
      url: url_address,
      success: function(data) {
        getCoordinates(data);
      },
      error: function(error) {
        console.log(error)
      }
    });

  });
});

function getCoordinates(data) {
  var lat = data.results[0].geometry.location.lat;
  var lng = data.results[0].geometry.location.lng;
  drawMap(lat, lng);
}

function drawMap(lat, lng) {
  $('#coordinates').html('<strong>Latitude: </strong>' + lat + ' <strong>Longitude: </strong>' + lng);
  var map = new google.maps.Map(document.getElementById('map'), {
  center: { lat: lat, lng: lng },
  zoom: 14
  });
  var marker = new google.maps.Marker({
  map: map,
  position: { lat: lat, lng: lng }
});
}
