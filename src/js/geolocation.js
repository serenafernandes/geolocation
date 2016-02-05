'use strict';

window.geolocation = (function() {

  return {
    init: init,
    getMyLocation: getMyLocation,
    resetLocationDetails: resetLocationDetails,
    getSiteLocation: getSiteLocation
  }

  function _updateLocationDetails(data){
    var now = new Date();

    $("#location_query").html(data.query);
    $("#location_country").html(data.country);
    $("#location_regionName").html(data.regionName);
    $("#location_city").html(data.city);
    $("#location_timezone").html(data.timezone);
    $("#location_lat").html(data.lat);
    $("#location_lon").html(data.lon);

    $("table").removeClass("empty");
    $(".help").click(function (e){
      var fieldName = $(e.currentTarget).closest('tr').find('.field_name').text();
      alert("This is your " + fieldName + " from ISP " + data.isp + " at " + now);
    });

    _createMap(data, 'my_map');
  }

  function _createMap(data, id) {
    var map;
    var myLatLng = {lat: data.lat, lng: data.lon}
    map = new google.maps.Map(document.getElementById(id), {
      center: myLatLng,
      zoom: 4
    });

    var markerUsr = new google.maps.Marker({
      position: myLatLng,
      map: map
    });

    google.maps.event.trigger(map, 'resize');
  }

  function getMyLocation() {
    $.ajax({
      type : 'GET',
      url : 'http://ip-api.com/json/',
      success : function(response){
        _updateLocationDetails(response);
      }
    });
  }

  function getSiteLocation() {
    var host = $("#url_input").val();
    $.ajax({
      type : 'GET',
      url : 'http://ip-api.com/json/' + host,
      success : function(response){
        _createMap(response, 'site_map');
      }
    });
  }

  function resetLocationDetails() {
      _updateLocationDetails({
      query: "0.0.0.0",
      country: "",
      regionName: "",
      city: "",
      timezone: "",
      lat: "",
      lon: ""
    });
    $("table").addClass("empty");
  }

  function init(){
    window.indexTemplate = $('#index').html();
    window.locationTemplate = $('#locationInfo').html();

    window.indexTemplate = Handlebars.compile(window.indexTemplate);
    window.locationTemplate = Handlebars.compile(window.locationTemplate);

    $("#mainContent").html(window.indexTemplate());
    $("#geoLocationContainer").html(window.locationTemplate({
      id: 0,
      query: "0.0.0.0",
      country: "",
      regionName: "",
      city: "",
      timezone: "",
      lat: "",
      lon: ""
    }));

    $('#btnMyLocation').click(getMyLocation);
    $('#btnResetLocation').click(resetLocationDetails);
    $('#btnInsertUrl').click(getSiteLocation);
  }

})();

$(document).ready(function(){
  geolocation.init();
});
