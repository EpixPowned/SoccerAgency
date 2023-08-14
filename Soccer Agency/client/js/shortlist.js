$(document).ready(() => {
    var user_id = localStorage.getItem("user_id");
    var jsonString = {user_id: user_id};
    console.log(JSON.stringify(user_id));

    $.ajax({
        url: "http://localhost:3000/getShortlist",
        method: 'get',
        data: jsonString,
        success: function (response) {
            var data = JSON.parse(response);
            if (data.msg == "SUCCESS") {
                createTable(data.player_data);
            } else {
                console.log(data.msg)
            }
        },
        error: function (err) {
            alert(err)
        }
    })
})


function createTable(data) {
    console.log(JSON.stringify(data));
    htmlString = ''
    for (var i = 0; i < data.length; i++) {
        htmlString += '<tr>';
            htmlString += '<td>';
                htmlString += data[i].player_first_name + ' ' + data[i].player_last_name;
            htmlString += '</td>';
            htmlString += '<td>';
                htmlString += data[i].player_age;
            htmlString += '</td>';
            htmlString += '<td>';
                htmlString += data[i].player_club;
            htmlString += '</td>';
            htmlString += '<td>';
                htmlString += data[i].player_position;
            htmlString += '</td>';
            htmlString += '<td>';
                htmlString += data[i].player_appearances;
            htmlString += '</td>';
            htmlString += '<td>';
                htmlString += data[i].player_goals;
            htmlString += '</td>';
            htmlString += '<td>';
                htmlString += data[i].player_assists;
            htmlString += '</td>';
            htmlString += '<td>';
                htmlString += '<button class="removeshortlist" data-id="' + data[i].player_id + '">Remove from Shortlist</button>';
            htmlString += '</td>';
         htmlString += '</tr>';

    }
    $('#playerID').html(htmlString);
    removeFromShortlist();
}

 function removeFromShortlist() {
     $('.removeshortlist').click(function () {
         location.reload();

        var user_id = localStorage.getItem("user_id");
        var player_id = this.getAttribute("data-id");


        var jsonString = { user_id: user_id, player_id: player_id };
        console.log(JSON.stringify(jsonString));

        $.ajax({
            url: "http://localhost:3000/removeFromShortlist",
            method: 'delete',
            data: jsonString,

            success: function (response) {
                alert(response);
                
            },

            error: function (err) {
                alert(err);
                console.log("test");
            }
        })
    }) 
}