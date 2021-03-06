// eslint-disable-next-line no-use-before-define
var apiReq = apiReq || console.error('apiReq function not defined');

// recevedObject when user request Home{}
// expected cookie { payload:{ username : ' ' , avatarUrl : ' '}}

var navElements = {
  navElement: document.getElementById('userNav'),
  username: document.createElement('h4'),
  pAvatar: document.createElement('img')
};

var addTweetForm = document.getElementById('addTweetForm');

if (addTweetForm) {
  addTweetForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var tweetText = event.target.firstElementChild.value;
    // expected response = { status : ' ' , ownerName;:' ',tweetText:'',avatarUrl: 'http://someLinke!'}
    if (tweetText.trim().length > 1) {
      apiReq('/createtweet', 'POST', function (err, data) {
        if (err) {
          errorHandler('addTweet', err);
        } else {
          if (JSON.parse(data).status) {
            renderTweet(JSON.parse(data));
          } else {
            errorHandler('addTweet', 'Cannot add tweet Right now');
          }
        }
      }, tweetText);
    } else {
      document.getElementById('tweetText').placeholder = 'Add new tweet....';
      document.getElementById('tweetText').classList.add('wrongInput');
    }
  });
}
// just to be more specific ,we check if there is acookie and there is a username in the payload
// document.cookie.payload.username = undefined;
window.addEventListener('onload', function (e) {
  e.preventDefault();
    // render the nav bar
    // expected response = {status:'' , errorMsg:'', username : ' ' , avatar: 'http://someLinke!'}
  apiReq('/getuserData', 'GET', (err, res) => {
    if (err) {
      errorHandler(err, 'nav');
    } else {
      res = JSON.parse(res);
      if (res.status) {
        errorHandler(JSON.parse(res).err, JSON.parse(res).errorMsg);
      } else {
        res = JSON.parse(res);
        navElements.username.textContent = res.username;
        navElements.pAvatar.src = res.avatar;
      }
    }
  });
});

// handler errors comming from the server
function errorHandler (err, location) {
  switch (location) {
    case 'addTweet':
      document.getElementById('tweetInput').textContent = err;
      break;
    case 'getalltweets':
      document.getElementsByClassName('recentTweets')[0].textContent = err;
      break;
    default:
      window.alert(err);
  }
}

function renderTweet (response) {
// profile avatar , user name(tweet owner) , singleTweet = tweetBody
  var tweetText = response.context || response.tweetText;
  var tweetOwner = response.username || response.ownerName;
  var tweetAvataUrl = response.avatar || response.avatarUrl;

  var tweetList = document.getElementsByClassName('recentTweets')[0];
  var tweet = document.createElement('div');
  tweet.classList.add('singleTweet');
  var tweetHeader = document.createElement('div');
  tweetHeader.classList.add('tweetHeader');
  var imgLink = document.createElement('a');
  imgLink.href = '/users/' + tweetOwner;
  var avatar = document.createElement('img');
  avatar.src = tweetAvataUrl;
  imgLink.appendChild(avatar);
  tweetHeader.appendChild(imgLink);
  var tweeterName = document.createElement('h6');
  tweeterName.textContent = tweetOwner;
  tweetHeader.appendChild(tweeterName);
  var tweetBody = document.createElement('p');
  tweetBody.textContent = tweetText;
  tweet.appendChild(tweetHeader);
  tweet.appendChild(tweetBody);

  tweetList.appendChild(tweet);
}

(function () {
  // {[{context:' ' , username:'' , avatar:'link'} ,,, {}]}
  apiReq('/getalltweets', 'GET', (err, tweets) => {
    if (err) {
      errorHandler(err, 'getalltweets');
    } else {
      tweets = JSON.parse(tweets);
      tweets.forEach(function (tweet) {
        renderTweet(tweet);
      });
    }
  });
})();
