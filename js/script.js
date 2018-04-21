$(function() {$("#footer").load("footer.html");
    $("#header").load("header.html");
    
});

function getNewProduct(){
    $.ajax({
        type: 'GET',
        url: 'data.txt',
        dataType: 'json',
        success: function (response) {
            $.each(response, function(index, element) {
                var tempString =element.state;
                if(tempString != undefined){
                    if(tempString.indexOf("#new")>-1){
                        $('#new_product').append(
                            $('<div class="horizontal_product product"></div>').prepend(
                                $('<img>',{src:element.path}),
                                $('<p>',{text:element.name})
                            )
                        )
                    }
                }
            });
        },
        error:function(xhr){
            alert("發生錯誤: " + xhr.status + " " + xhr.statusText);
        },
    });
};