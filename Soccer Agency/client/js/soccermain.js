$('#login').click(function () {
    var username = $('#username').val();
    var password = $('#password').val();
    localStorage.setItem('username', username);
    var storedName = localStorage.getItem('username');


    var jsonString = {username: username, password: password };

    console.log(JSON.stringify(jsonString));
    
    $.ajax({
        url: 'http://localhost:3000/login',
        type: "get",
        data: jsonString,
        success: function (response) {
            console.log(response);
            var data = JSON.parse(response);
            if (data.msg == "SUCCESS") {
                localStorage.setItem('user_id', data.user_data[0].user_id);
                $("#message").html("Welcome, " + username);
                $("#username").hide();
                $("#password").hide();
                $("#login").hide();
                $("#logintext").hide();
                $("#mainsignup").hide();
                $("#mainshortlist").show();
            } else {
                $("#message").html("Incorrect Username or Password, try again!");
            }

        },
        error: function (err) {
            alert(err);
        }
    });
    return false;

   
});

