var coin_names = [];
var coin_symbols = [];
var response;
var combined_data;
// These are ajax requests
$(document).ready(function() {
  // get the jsonDATA
  $.getJSON('https://api.coinmarketcap.com/v1/ticker/', function(data) {
    response = data;
    // save the data to a variable to manipulate later
    for (var i = 0; i < data.length; i++) {
      coin_names.push(data[i].id);
      coin_symbols.push(data[i].symbol);
    }
    })
    .done(function() {
      // fill in auto complete
      combined_data = coin_names.concat(coin_symbols);
      $( "#tags" ).autocomplete({
            source: combined_data,
            delay: 500
          });
    })
    .fail(function() {
      $("#error").html("failed");
      $('#error_message').html("The requesto to gather data failed. Please tyr again later");
    })
});
