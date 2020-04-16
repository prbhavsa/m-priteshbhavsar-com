$(document).ready(function() {


	var box = $(".box"),
		orginal = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
		temp = orginal,
		x = [],
		sec = 0,
		date1,date2,
		moves = 0,
		mm = 0,
		ss = 0,
		upIMG,
		images =
			[
				"./images/1.png", "./images/2.png",
                "./images/3.png", "./images/4.png",
                "./images/5.png", "./images/6.png",
                "./images/7.png", "./images/8.png",
                "./images/9.png", "./images/10.png",
            ];
		img = 0;
		var selected = 0;




	$('.me').css({"background-image" : 'url('+images[0]+')'});

	$(".start").click(function() {
		$(".start").delay(100).slideUp(500);
		$(".full").hide();
		$(".pre_img").addClass("prevent_click");
		
		date1 = new Date();
		Start();
		return 0;
	});

	function Start() {
		randomTile();
		changeBG(img);
		var count = 0,
			a,
			b,
			A,
			B;
		$(".me").click(function() {
			count++;
			if (count == 1) {
				a = $(this).attr("data-bid");
				$('.me_'+a).css({"opacity": ".65"});
			} else {
				b = $(this).attr("data-bid");	
				$('.me_'+a).css({"opacity": "1"});
				if (a == b) {
				} else {
					$(".me_" + a)
						.addClass("me_" + b)
						.removeClass("me_" + a);
					$(this)
						.addClass("me_" + a)
						.removeClass("me_" + b);
					$(".me_" + a).attr("data-bid", a);
					$(".me_" + b).attr("data-bid", b);
				}
				moves++;
				swapping(a, b);
				checkCorrect(a);
				checkCorrect(b);
				a = b = count = A = B = 0;
			}
			if (arraysEqual(x)) { 
				date2 = new Date();
				timeDifferece();
				showScore();
				return 0;
			}
		});
		return 0;
	}

	function randomTile() {
		var i;
		for (i = orginal.length-1; i >= 0; i--) {
			var flag = getRandom(0, i);
			x[i] = temp[flag];
			temp[flag] = temp[i];
			temp[i] = x[i];
		}
		for (i = 0; i < orginal.length; i++) {
			box.append(
				'<div  class="me me_' + x[i] + ' tile" data-bid="' + x[i] + '"></div>'
			);
			if ((i + 1) % 6 == 0) box.append("");
		}
		i = 17;
		return 0;
	}

	function arraysEqual(arr) {
		var i;
		for (i = orginal.length - 1; i >= 0; i--) {
			if (arr[i] != i) return false;
		}
		return true;
	}

	function checkCorrect(N1) {
		var pos = x.indexOf(parseInt(N1, 10));
		if (pos != N1) {
			return;
		}
		$(".me_" + N1).addClass("correct , prevent_click ");
		return;
	}

	function swapping(N1, N2) {
		var first = x.indexOf(parseInt(N1, 10)),
			second = x.indexOf(parseInt(N2, 10));
		x[first] = parseInt(N2, 10);
		x[second] = parseInt(N1, 10);
		return 0;
	}
	
	function getRandom(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
	
	function timeDifferece(){
		var diff = date2 - date1;
		var msec = diff;
		var hh = Math.floor(msec / 1000 / 60 / 60);
		msec -= hh * 1000 * 60 * 60;
	 	mm = Math.floor(msec / 1000 / 60); // Gives Minute
		msec -= mm * 1000 * 60;
		ss = Math.floor(msec / 1000);		// Gives Second
		msec -= ss * 1000;
		return 0;
	}


	function changeBG(img){
		selected = img;
        console.log("Selected: " , selected);
		if(img != 3){
		$('.me').css({
			"background-image" : "url("+images[img]+")"
		});
		return
		}
		else
			$('.me').css({"background-image" : "url("+upIMG+")"});
	}

	$('.pre_img li').hover(function(){
			img = $(this).attr("data-bid");
			changeBG(img);
		});
	
	function showScore(){
		$('#min').html(mm);
		$('#sec').html(ss);
        $('#moves').html(moves);
        if(ss > 50 && mm >1){$('#message').html("<h3>I cant believe you took so long to solve puzzle of our wonderful picture. Try solving it in less then 50 seconds to get the 5 reasons.</h3>");}
        else {$('#message').html(getMessage(selected));}

		setTimeout(function(){
		$('.cover').slideDown(350);
		},1050);
		return 0;
	}

	$('.OK').click(function(){
		$('.cover').slideUp(350);
	});

	$('.reset').click(function(){
		$(".tile").remove();
		$("br").remove();
		$(".full").show();
		$(".start").show();
		$(".pre_img").removeClass("prevent_click");
		
		temp = orginal;
		x = [];
		moves =  ss = mm = 0;
		return 0;
	});

	$("#upfile1").click(function () {
 	   $("#file1").trigger('click');
	});

	$("#file1").change(function(){
        readURL(this);
    });

     function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
               upIMG =  e.target.result;
               img = 3;
               changeBG(3);
            }
            reader.readAsDataURL(input.files[0]);
        }

    }

    function getMessage(image){
        console.log("Now Selected: " , image);
     	switch(image){
			case 0:
				return "<h2>1) I love the way you look at me.</h2>" +
                    "You always asked me “Why do you love me?” And I always reply that I see it in your eyes.. I can see your soul through your eyes. When we are on video call, u literally look at me with so much focus that I will u will come out of the phone and kiss me." +
                    "<h2>2) You make me feel like I’m the only person in the world.</h2> " +
                    " Remember I was telling you a story about an Australian couple who were traveling with me from NY to India, and while waiting in line the girl was looking at the guy with so much love and focus that she was literally lost into her… and I wished I will have someone who will look at me this way… My wish came true when u said u Love me and when we first time met, I saw u many times looking at me with same passion and affections that I just feel I am so lucky.\n" +
                    "<h2>3) I love you because we are family and friends at the same time </h2>" +
                    "Although my intention of talking to u was clear on 10th day of our conversation, but even after proposing u multiple times we had a really amazing and unique bond of friendship. Many a times I almost gave up on my hopes to get u in my life, but somehow I was very determined to many u my wife. Yes, I said wife because u kno I am already married to u. After being in relation with u we grew into being family, not just girlfriend or boyfriend… it is beyond those simple words.. “we are family, because I feel its family when we together”.\n" +

                    "<h2>4) You make my heart smile.</h2>" +
                    "There was a time, whenever u use to say “You know what” I use to get a small heart attack, I don’t know why, but during that fraction of second I use to feel u may say “I also love u”, “I don’t think we should be together” or many more +ve and -ve thoughts, I can’t imagine. I have felt my heart pounding for the first time in life and u made me realize its not true that logically brain does all the thinking and heart just pumps the blood. U made me feel for u from my heart.\n" +
                    "<h2>5) You know me better than I know myself..</h2>" +
                    " As it is said, mother knows everything about her child.. and after mother I feel you knows everything about me.. even when I share things with u. Sometimes I do hide things from u, but just like my mom, u very soon realize something is wrong and may be bothering me… well now this is kind of a problem for me that can’t hide anything for u.. but u know what.. I dont need to hide anything from you. Let it be what I should wear, if I had my meal, if I had good sleep.. everything u kinda know before me.. I love u";
			case 1:
				return "<h2>6) You are always willing to help me accomplish my goals. (My Lady luck) </h2>" +
                    "You always ask me “how do I inspire you”, well let me answer, With so much of history we have of “yes and no”, I don’t want to lose you and for that I always strive to give my best in life so that I can get everything for u. I don’t want you to not have anything u desire, I want u to have all.. this inspires me even for my parents.. and as I said u are family, so I cannot imagine my family not to have anything they desire.\n" +
                    "<h2>7) Because you are determined to make this relationship work </h2>" +
                    "I think this one Is very important because, if there is a relationship there will be fights and u know it very well that we have lot of them… at times we both get very much annoyed on each other. I am guilty of not calling you after the call and I fully rake responsibility of my behavior but for you it doesn’t matter if I am getting irritated or anything.. u make sure that u call me and make sure everything is good. U love me so much that u can’t love me… and same is for me.. Although the title says “You are determined”, but even u will agree I am determined :P don’t take the whole credit if I am giving, coz we are single unit :*\n" +
                    "<h2>8) Because you are so sexy and I can’t believe I get to call you mine. </h2> " +
                    "Too much of emotional reasons. Yes you are SEXY, HOT, DESIRABLE all the adjectives that followed in this domain. I just love it when everyone says “sneha looks so pretty”, and I keep blushing like anything. You are sexy when u wake up, when you take bath, when u tie up your hair, but u are SEXIER when u are in my arms. I love to love u as love is the only love that is pure love.\n" +
                    "<h2> 9) You are truthful and vulnerable with me. </h2> " +
                    "No one knows how tough the LongDistance relationship is and we both have learned it hard way the secret to grow in long distance. The key is to be truthful and having no shame in sharing even worst of incident or thing happened with each other. We cannot touch each other or feel the smell of each other.. but the only way we feel each other is by staying truthful and loyal. Numerous times you have broken down in front of me let it be family or personal issue, you have always been transparent with me. I may not be this transparent because I care too much about u, but for most of its part I do share everything thing with u. I think this is the only key to be in long distance. Just like a very long challenge that we have taken on each other. I love u for supporting this unusual love adventure we have.\n" +
                    "<h2>10) I love that your hand fits perfectly with mine.</h2>" +
                    "If possible listen to “Vanilla Twilight” after reading this, the line in this song “Cause the spaces between my fingers Are right where yours fit perfectly”. I may have imagined this for 3 years, looked forward for 1 year more, and when we met for the first time and we hold hand with your hands fitting in my hands… I had this goosebumps which I could not explain. Even in this trip when u were holding my hand and sleeping with it… the feeling of u with me was amazing and I just kept looking at u while u were sleeping. Hugging u makes me feel amazing.. but when your hand fits in mine, it has its own beauty and feeling. ";
			default:
				return "I can only give 10 reasons a day. Coz excitement bana rehna chayeea... :P <br> <h2>Listen to \"Ek Mai Hu Aur Ek Tu \" Song</h2>";
		}
	}
});