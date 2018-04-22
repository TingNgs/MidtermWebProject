$(function () {
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
    $(document).on('click', ".product", function () {
        url = 'data.txt';
        clicked = $(this);
        console.log(clicked[0].childNodes[0].childNodes[1].innerHTML)
        $("#dialog").dialog('option', 'title', clicked[0].childNodes[0].childNodes[1].innerHTML);
        $.get(url, function (index) {
            var temp = index.toString();
            var temp1 = JSON.parse("[" + temp + "]");
            var json = temp1[0];
            for (var i = 0; i < json.length; i++) {
                if (clicked[0].childNodes[0].childNodes[1].innerHTML == json[i].name) {
                    console.log(json[i])
                    $('#dialog').empty();
                    $('#dialog').append(
                        $('<img id="dialog_img">').attr("src", json[i].path),
                        $('<div id="dialog_info"></div>').append(
                            $('<p>', { text: "Name : " + json[i].name }),
                            $('<p>', { text: "Resolution : " + json[i].resolution }),
                            $('<p>', { text: "Dimensions : " + json[i].dimensions }),
                            $('<p>', { text: "Weight : " + json[i].weight }),
                            $('<p>', { text: "Features : " + json[i].features })
                        )
                    )
                    break;
                }
            }
        });
        $("#dialog").dialog("open");
    });
}
function getNewProduct() {
    $.ajax({
        type: 'GET',
        url: 'data.txt',
        dataType: 'json',
        success: function (response) {
            $.each(response, function (index, element) {
                var tempString = element.state;
                if (tempString != undefined) {
                    if (tempString.indexOf("#new") > -1) {
                        $('#new_product_scroll').append(
                            $('<div class="horizontal_product product"></div>').append(
                                $('<a href="#"/>').append($('<img>', { src: element.path }),
                                    $('<h2>', { text: element.name }),
                                    $('<p>', { text: element.hover })
                                )
                            )
                        )
                    }
                }
            });
        },
        error: function (xhr) {
            alert("發生錯誤: " + xhr.status + " " + xhr.statusText);
        },
    });
};