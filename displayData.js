var displayed = [];
var displayed_objects = [];

function returnId(id){
  return id.replace(" ","").trim(); // quick and ugly hack 
}

// this shows smaller decimal prices if the prices are less than .01
function fixPrice(price) {
  var new_price = parseFloat(price).toFixed(2)
  if (new_price < .01) {
    return price;
  }
  return new_price;
}

function getImage(imageURL) {
  // hardcoded not checking, fix later
  return path = "icons/" + imageURL.toLowerCase() + ".png";
}
// this script will process the input data and show the coin data
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
    // dont want to double display
    if (!displayed.includes(name)) {
      displayed.push(name);
      var symbol = coinData.symbol;
      var price = coinData.price_usd;
      var image = getImage(symbol);
      // build the html
      var htmlName = $("<h2></h2>", {
        class: "coinName",
        text: name,
      });
      var htmlImage = $("<img>", {
        class: "coinImage",
        src: image,
      });
      var htmlPrice = $("<p></p>", {
        class: "coinPrice",
        text: "$" + fixPrice(price),
      });
      var htmlSymbol = $("<h4></h4>", {
        class: "coinSymbol",
        text: "(" + symbol + ")",
      });

      var htmlContainer = $("<div></div>", {
        class: "coinData col-sm-4",
        id: returnId(name),
      });

      var htmlRemove = $('<button/>', {
        text: 'Remove',
        class: 'remove-coin btn btn-danger',
        name: name,
        // remove this item from the DOM
        click: function(event) {
          $("#" + returnId(name)).remove();
          var index = displayed.indexOf(name); // <-- Not supported in <IE9
          if (index !== -1) {
            displayed.splice(index, 1);
          }
        }
      });


      $(htmlName).appendTo(htmlContainer);
      $(htmlImage).appendTo(htmlContainer);
      $(htmlSymbol).appendTo(htmlContainer);
      $(htmlPrice).appendTo(htmlContainer);
      $(htmlRemove).appendTo(htmlContainer);
      $(htmlContainer).appendTo("#coinRow");
    } else {
      $("#input_error").html(
        "Coin is already displayed"
      );
    }
  } else {
    $("#input_error").html(
      "Please input a coin listed in dropdown. Spelling and capitalization matters."
    );
  }
});
