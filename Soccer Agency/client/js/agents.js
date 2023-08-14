$(document).ready(() =>
 {

$.ajax({
    url: "http://localhost:3000/getAgents",
    method: 'GET',
    success: function (response) {
        var data = JSON.parse(response);
        if (data.msg == "SUCCESS") {
            createTable(data.agent_data);
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
    htmlString = ''
    var currentAgent = -1
    for (var i = 0; i < data.length; i++) {
        if (data[i].agent_id != currentAgent) {
            htmlString += '<tr>';
                htmlString += '<td>';
                    htmlString += data[i].agent_first_name + ' ' + data[i].agent_last_name;
                htmlString += '</td>';
                htmlString += '<td>';
                    htmlString += data[i].player_first_name + ' ' + data[i].player_last_name;
                htmlString += '</td>';
                htmlString += '<td>';
                    htmlString += data[i].agent_email;
                htmlString += '</td>';
                htmlString += '<td>';
                    htmlString += data[i].agent_phone;
                htmlString += '</td>';
            htmlString += '</tr>';
            currentAgent = data[i].agent_id;
        } else {
            htmlString += '<tr>';
                htmlString += '<td>';
                    htmlString += '' 
                htmlString += '</td>';
                htmlString += '<td>';
                    htmlString += data[i].player_first_name + ' ' + data[i].player_last_name;
                htmlString += '</td>';
                htmlString += '<td>';
                    htmlString += '';
                htmlString += '</td>';
                htmlString += '<td>';
                    htmlString += '';
                htmlString += '</td>';
            htmlString += '</tr>';
        }
        
        
    }
    $('#agentID').html(htmlString);
}