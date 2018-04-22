$(function() {
  $("#footer").load("footer.html");
  $("#header").load("header.html");
});
function dialogSetting() {
  $("#dialog").dialog({
    autoOpen: false,
    show: {
      effect: "blind",
      duration: 100
    },
    hide: {
      effect: "blind",
      duration: 100
    },
    draggable: false,
    resizable: false,
    width: 1100,
    height: 600
  });
  $(document).on("click", ".product", function() {
    url = "data.txt";
    clicked = $(this);
    $("#dialog").dialog(
      "option",
      "title",
      clicked[0].childNodes[0].childNodes[1].innerHTML
    );
    $.get(url, function(index) {
      var temp = index.toString();
      var temp1 = JSON.parse("[" + temp + "]");
      var json = temp1[0];
      for (var i = 0; i < json.length; i++) {
        if (clicked[0].childNodes[0].childNodes[1].innerHTML == json[i].name) {
          $("#dialog").empty();
          $("#dialog").append(
            $('<img id="dialog_img">').attr("src", json[i].path),
            $('<div id="dialog_info"></div>').append(
              $("<p>", { text: "Name : " + json[i].name }),
              $("<p>", { text: json[i].dynamicValue + json[i].dynamic }),
              $("<p>", { text: "Dimensions : " + json[i].dimensions }),
              $("<p>", { text: "Weight : " + json[i].weight }),
              $("<p>", { text: "Features : " + json[i].features })
            )
          );
          break;
        }
      }
    });
    $("#dialog").dialog("open");
  });
}
function getNewProduct() {
  $.ajax({
    type: "GET",
    url: "data.txt",
    dataType: "json",
    success: function(response) {
      $.each(response, function(index, element) {
        var tempString = element.state;
        if (tempString != undefined) {
          if (tempString.indexOf("#new") > -1) {
            $("#new_product_scroll").append(
              $('<div class="horizontal_product product"></div>').append(
                $('<a href="#"/>').append(
                  $("<img>", { src: element.path }),
                  $("<h2>", { text: element.name }),
                  $("<p>", { text: element.hover })
                )
              )
            );
          }
        }
      });
    },
    error: function(xhr) {
      alert("發生錯誤: " + xhr.status + " " + xhr.statusText);
    }
  });
}
function hoverProduct(){
    $(document).on("mouseover", ".product", function() {
        hovering = this;
        var a=$(hovering.childNodes[0].childNodes[2])
        a.css('top',$(this).offset().top+100);
        a.css('left',$(this).offset().left);
    });
}
function intiProduct() {
  $(document).ready(function() {
    var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    linkString = queryString.split("&");
    if (linkString.length > 1) {
      if (linkString[0] == "brand") {
        document.getElementById("Brand").innerHTML =
          "<h1>Search Result of : </h1><br><h1>" +
          linkString[1] +
          "</h1><p hidden=>#" +
          linkString[2] +
          "</p>";
        $("#brand_cb").remove();
      } else if (linkString[0] == "type") {
        document.getElementById("Type").innerHTML =
          "<h1>Search Result of : </h1><br><h1>" +
          linkString[1] +
          "</h1><p hidden=>#" +
          linkString[2] +
          "</p>";
        if (linkString[2] == "cameras") $("#lensType_cb").remove();
        else if (linkString[2] == "lens") $("#camerasType_cb").remove();
        else {
          $("#lensType_cb").remove();
          $("#camerasType_cb").remove();
        }
      }
    }else{
        $("#search_product").prepend(
            $("<h1>All Product</h1>")
        )
    }
    getProductState();
  });
  $(document).on("click", "#filter_form > div > input", function() {
    getProductState();
  });
}
function getProductState() {
  camerasFilter = false;
  lensFilter = false;
  var brand = [];
  var type = [];
  if ($("#Brand > h1").text() != "") {
    brand.push($("#Brand > p").text());
  }
  if ($("#Type > h1").text() != "") {
    if ($("#Type > p").text() == "#cameras") {
      camerasFilter = true;
    } else if ($("#Type > p").text() == "#lens") lensFilter = true;
    else type.push($("#Type > p").text());
  }
  $("#product_list").empty();
  $('input[name="brand"]:checked').each(function() {
    brand.push(this.value);
  });
  $('input[name="camerasType"]:checked').each(function() {
    type.push(this.value);
  });
  $('input[name="lensType"]:checked').each(function() {
    type.push(this.value);
  });
  getData(brand, type);
}
function getData(brand, type) {
  ibrand = brand;
  itype = type;

  $.ajax({
    type: "GET",
    url: "data.txt",
    dataType: "json",
    success: function(response) {
      $.each(response, function(index, element) {
        var brandMatch = Boolean(ibrand.length == 0);
        var typeMatch = Boolean(itype.length == 0);
        if (camerasFilter && element.CorL == "#lens") typeMatch = false;
        if (lensFilter && element.CorL == "#cameras") typeMatch = false;
        var thisBrand = element.brand;
        for (var i = 0; i < ibrand.length; i++) {
          if (ibrand[i] == thisBrand) brandMatch = true;
        }
        var thisType = element.type;
        for (var i = 0; i < itype.length; i++) {
          if (thisType.indexOf(itype[i]) > -1) typeMatch = true;
        }
        if (brandMatch && typeMatch) {
          $("#product_list").append(
            $('<div class="product"></div>').append(
              $('<a href="#"/>').append(
                $("<img>", { src: element.path }),
                $("<h2>", { text: element.name }),
                $("<p>", { text: element.hover })
              )
            )
          );
        }
      });
    },
    error: function(xhr) {
      alert("發生錯誤: " + xhr.status + " " + xhr.statusText);
    }
  });
}
