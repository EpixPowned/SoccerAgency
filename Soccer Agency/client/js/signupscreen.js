

$('#signup').click(function () {
    var username = $('#username').val();
    var emailaddress = $('#emailaddress').val();
    var password = $('#password').val();
    ;

    var jsonString = {username: username, emailaddress: emailaddress, password: password };

    console.log(JSON.stringify(jsonString));

    $.ajax({
        url: 'http://localhost:3000/create-user',
        type: 'post',
        data: jsonString,
        success: function (response) {
            alert(response);
        },
        error: function (err) {
            alert(err);
        }

    });

    return false;
});