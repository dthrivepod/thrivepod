$(document).on('click', '#add-artist', function(event) {
    event.preventDefault();
    console.log("buttonworks");


    var artist = $("#search-input").val().trim();
    console.log(artist);

    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?&countryCode=US&sort'date,asc'&keyword=" +
        artist + "&apikey=mUtsvjjuP9U7p30hNtIZXpGAI0rgbThb"
    console.log(queryURL)
    $.ajax({
        type: "GET",
        url: queryURL,
        async: true,
        dataType: "json",
        success: function(response) {
            console.log(response);
            //Creating a variable to shorten variables below
            var evts = response._embedded.events

            //clears Search bar input
            $("#search-input").val("");
            $("#concertSchedule").empty();

            for (var i = 0; i < 5; i++) {
                console.log(response._embedded.events[i]);

                // Creating a div with the class "item"
                var concertDiv = $("<div class='item'>");
                //Artist's Tour Name
                var tourName = evts[i].name;
                //Concert Date
                var tourDate = evts[i].dates.start.localDate;
                //Concert Time
                var tourTime = evts[i].dates.start.localTime;
                var tourTimeC = moment(tourTime, "HH:mm").format('hh:mm a');
                console.log(tourTimeC);
                //Concert Venue Name
                var venue = evts[i]._embedded.venues[0].name;
                //Concert Venue City
                var showCity = evts[i]._embedded.venues[0].city.name;
                //Concert Venue State
                var showState = evts[i]._embedded.venues[0].state.stateCode;
                //link to TicketMaster
                var buyLink = evts[i].url;
                console.log("here is your link" + buyLink);
                //information returned from TicketMaster API
                var results = $("<div class='searchResult'>").html("<strong>Artist/Tour Name: " + tourName + "</strong><br>" +
                    "Concert Date: " + tourDate + " Time: " + tourTimeC + "<br>" +
                    "Venue: " + venue + " - " + showCity + ", " + showState + "<br>" +
                    "Ticket Link: " + "<a href='" + buyLink + "' target=_'blank'>Click Here for Tickets</a>" + "<br>");

                //Appending the paragraph tag we made for results of API return
                concertDiv.prepend(results);
                //Putting the concertDiv in artisit show area of HTML
                $("#concertSchedule").append(concertDiv);

            }

        },
        error: function(xhr, status, err) {
            // This time, we do not end up here!
        }
    });
});
