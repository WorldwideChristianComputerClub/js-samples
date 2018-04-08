var type;
for (var i = 0; i < document.controls.type.length; i++) {
    if (document.controls.type[i].checked) {
        type = document.controls.type[i].value;
    }
}

autocomplete.setBounds(map.getBounds());

var search = {
    bounds: whole_world,
    query: "pentecostal",
    type:"church"
    // bounds: map.getBounds()
};

places.textSearch(search, function(results, status,pagination) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        // clearResults();
        // clearMarkers();

        while(pagination.hasNextPage) {
            // https://developers.google.com/maps/documentation/javascript/examples/place-search
            var current_page = pagination.nextPage();
            for (var i = 0; i < current_page.length; i++) {
                markers[i] = new google.maps.Marker({
                    position: results[i].geometry.location,
                    animation: google.maps.Animation.DROP
                });
                google.maps.event.addListener(markers[i], 'click', getDetails(results[i], i));
                setTimeout(dropMarker(i), i * 100);
                addResult(results[i], i);
            }
            // sleep(2000);
        }
    }}
);
