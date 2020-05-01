$(function () {


	const socket = io.connect();


    const $messageForm = $('#message-form');
    const $messageBox = $('#message');
    const $chat = $('#chat');


    const $nickForm = $('#nickForm');
    const $nickError = $('#nickError');
    const $nickname = $('#nickname');

 
    const $users = $('#usernames');

    $nickForm.submit(e => {
      e.preventDefault();
      socket.emit('new user', $nickname.val(), data => {
        if(data) {
          $('#nickWrap').hide();
          $('#contentWrap').show();
          $('#message').focus();
        } else {
          $nickError.html(`
            <div class="alert alert-danger">
              Este usuario ya existe.
            </div>
          `);
        }
      });
      $nickname.val('');
    });

	//eventos
	$messageForm.submit( e => {
		e.preventDefault();
		socket.emit('send message', $messageBox.val());
		$messageBox.val('');
	});


	socket.on('new message', function (data) {
		$chat.append('<b>' + data.nick + '</b>: ' + data.msg + '<br/>');
	});

	socket.on('usernames', data => {
		let html = '';
		for(i = 0; i < data.length; i++) {
		  html += `<p><i class="fas fa-user"></i> ${data[i]}</p>`; 
		}
		$users.html(html);
	  });
});

