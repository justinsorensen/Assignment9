(function() {

  // closure scope for defining a.screen

  var fadeOutSpeed = 300,
      fadeInSpeed =  300,
      $nextScreen = null, 
      n = -1;                // -1 means it's ok to transition to another screen

  a.screen = {};

  // a.screen.done is called twice as follows:
  //   (1) when the old screen has faded out completely, and
  //   (2) when the javascript for the new screen has finished loading
  a.screen.done = function() {  
    if (--n === 0) {
      $('.screen').remove();
      $nextScreen.addClass('screen');
      $('body').append($nextScreen);
      $nextScreen.fadeIn(fadeInSpeed, function() { 
        $nextScreen = null;
        n = -1; 
      });
    }
  };
       
  a.screen.next = function(screenName) {
    if (n !== -1) return; 
    n = 2;
    $nextScreen = $('<div></div>');
    var ref = document.getElementsByTagName('script')[0],
        js = document.createElement('script');
    js.async = true;
    js.src = screenName + '.js';
    ref.parentNode.insertBefore(js, ref);
    $('.screen').fadeOut(fadeOutSpeed, a.screen.done);
  };

  a.screen.append = function(elem) {
    if ($nextScreen) {
      $nextScreen.append(elem);
    } else {
      $('#screen').append(elem);
    }
  };

}());

a.creds = {};

/*
a.login = function(cb) {
  FB.login(function(response) {
    if (response.authResponse) {
      a.creds.uid = response.authResponse.userID;
      a.creds.accessToken = response.authResponse.accessToken;
      a.screen.next('title');
      cb();
    } else {
      a.screen.next('login');
      cb(new Error('Login failed.'));
    }
  });
};
*/
    
a.init = function(fbAppId) {
  FB.init({
    appId      : fbAppId,
    channelUrl : '://' + window.location.host + '/channel.html',
    status     : false,  // check the login status upon init?
    cookie     : false,  // set sessions cookies?
    xfbml      : false
  });
  FB.Canvas.setAutoGrow();
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      a.creds.uid = response.authResponse.userID;
      a.creds.accessToken = response.authResponse.accessToken;
      a.screen.next('title');
    } else {
      a.screen.next('login');
    }
  });
};
  
fbAsyncInit();

