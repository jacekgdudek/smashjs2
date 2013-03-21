function SocialMediaManager(){

	//FACEBOOK======================================
	this.facebookScore = function(score)
	{
		//location.href = "https://www.facebook.com/dialog/feed?app_id=319946531441213&link=https://jakubs.eu/imd/peekabu/social/fbapi/&picture=http://jakubs.eu/imd/peekabu/social/fbapi/watch.png&name=SmashNGrab&caption=SmashNGrab%20Score&redirect_uri=https://jakubs.eu/imd/peekabu/social/fbapi/&description=I%20have%20just%20scored%20"+score+"%20points%20in%20SmashNGrab%20!";
		window.open("https://www.facebook.com/dialog/feed?app_id=319946531441213&link=https://jakubs.eu/imd/peekabu/social/fbapi/&picture=http://jakubs.eu/imd/peekabu/social/fbapi/watch.png&name=SmashNGrab&caption=SmashNGrab%20Score&redirect_uri=https://jakubs.eu/imd/peekabu/social/fbapi/&description=I%20have%20just%20scored%20"+score+"%20points%20in%20SmashNGrab%20!", "_blank", "top=300px, left=400px, width=800px, height=600px, fullscreen=yes");
	}

	//TWITTER==================================		(optional)
	this.twitterScore = function(score)
	{
		window.open("https://twitter.com/intent/tweet?original_referer=%20&text=I%20played%20SmashNGrab%20and%20scored%20" + credits.nextValue + "%20points!&tw_p=tweetbutton&url=%20", "_blank", "top=300px, left=20%, width=640px, height=480px");
	 }

}








