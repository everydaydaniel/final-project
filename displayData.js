function getImage(imageURL){
  // hardcoded not checking, fix later
  return path = "icons/" + imageURL.toLowerCase() + ".png";
}
// this script will process the input data
$("#getData").click(function(event) {
  // get the value of the coin
  var coin = $("#tags").val().trim();

  if (coin_names.includes(coin) || coin_symbols.includes(coin)) {
    $("#input_error").html("");
    // populate data values
    var coinData;
    var is_name = coin_names.includes(coin) ? true : false;
    // set the coin data.
    if (is_name) {
      for (var i = 0; i < response.length; i++) {
        if (response[i].id == coin) {
          coinData = response[i]
          break;
        }
      }
    } else {
      for (var i = 0; i < response.length; i++) {
        if (response[i].symbol == coin) {
          coinData = response[i]
          break;
        }
      }
    }
    var name = coinData.name;
    var symbol = coinData.symbol;
    var price = coinData.price_usd;
    var image = getImage(symbol);
    // build the html
    var htmlName = $("<h2></h2>", {
      class: "coinName",
      text: name,
    })
    var htmlImage = $("<img>", {
      class: "coinImage",
      src: image,
    })
    var htmlPrice = $("<p></p>", {
      class: "coinPrice",
      text: "$" + parseFloat(price).toFixed(2),
    })
    var htmlSymbol = $("<h4></h4>", {
      class: "coinSymbol",
      text: "(" + symbol + ")",
    })
    var htmlContainer = $("<div></div>", {
      class: "coinData col-sm-4",
    })

    $(htmlName).appendTo(htmlContainer);
    $(htmlImage).appendTo(htmlContainer);
    $(htmlSymbol).appendTo(htmlContainer);
    $(htmlPrice).appendTo(htmlContainer);
    $(htmlContainer).appendTo("#coinRow");


  } else {
    $("#input_error").html(
      "Please input a coin listed in dropdown. Spelling and capitalization matters."
    );
  }
});
