/* setting */
if (DEMOBO) {
	DEMOBO.developer = 'developer@demobo.com';
	DEMOBO.maxPlayers = 1;
	DEMOBO.stayOnBlur = true;
	var imgID = 0;
	var testSuite;
	DEMOBO.init = function() {
		if (localStorage.getItem("url"))
			$('#url').val(localStorage.getItem("url"));
		demobo.connect();
		/* setting up mobile event listener here */
	
		demobo.addEventListener('input', function(e) {
		    
		    if (e.source) $('#eventSource');
			if (e.value) $('#eventValue');
			console.log(e.source, e.value);
		}, false);
		
		demobo.addEventListener('input', function(e) {
		    if (e.source) $('#eventSource');
			if (e.source == "PrevButton") {console.log(player.previousStep())}
			
		}, false);
		
		demobo.addEventListener('input', function(e) {
		    if (e.source) $('#eventSource');
		    if (e.source == "NextButton") {console.log(player.nextStep())}
			
		}, false);
		
		demobo.addEventListener('input', function(e) {
		    if (e.source) $('#eventSource');
			if (e.value) $('#eventValue');
			if (e.source == "scroll") {console.log(player.toStep(e.value))}
			
		}, false);
		
		demobo.addEventListener('input', function(e) {
		    if (e.source) $('#eventSource');
			if (e.value) $('#eventValue');
			if (e.source == "PageNumber") {console.log(player.toStep(e.value))}
			
		}, false);
		demobo.addEventListener('input', function(e) {
		    if (e.source) $('#eventSource');
			if (e.value) $('#eventValue');
			if (e.source == "SetTimeInterval") {console.log(player.play(e.value))}
			
		}, false);
		demobo.addEventListener('input', function(e) {
		    if (e.source) $('#eventSource');
			if (e.value) $('#eventValue');
			if (e.source == "Pause") {console.log(player.pause(e.value))}
			
		}, false);
		demobo.addEventListener('input', function(e) {
		    if (e.source) $('#eventSource');
			if (e.value) $('#eventValue');
			if (e.source == "Stop") {console.log(player.stop())}
			
		}, false);
		demobo.addEventListener('input', function(e) {
		    if (e.source) $('#eventSource');
			if (e.value) $('#eventValue');
			if (e.source == "Home") {console.log(player.toStep(e.value))}
			
		}, false);
		demobo.addEventListener('input', function(e) {
		    if (e.source) $('#eventSource');
			if (e.value) $('#eventValue');
			if (e.source == "Design") {console.log(player.toStep(e.value))}
			
		}, false);
			demobo.addEventListener('input', function(e) {
		    if (e.source) $('#eventSource');
			if (e.value) $('#eventValue');
			if (e.source == "Implementation") {console.log(player.toStep(e.value))}
			
		}, false);
			demobo.addEventListener('input', function(e) {
		    if (e.source) $('#eventSource');
			if (e.value) $('#eventValue');
			if (e.source == "Progress") {console.log(player.toStep(e.value))}
			
		}, false);
			demobo.addEventListener('input', function(e) {
		    if (e.source) $('#eventSource');
			if (e.value) $('#eventValue');
			if (e.source == "FutureWork") {console.log(player.toStep(e.value))}
			
		}, false);
			demobo.addEventListener('input', function(e) {
		    if (e.source) $('#eventSource');
			if (e.value) $('#eventValue');
			if (e.source == "Conclusion") {console.log(player.toStep(e.value))}
			
		}, false);
		
		demobo.addEventListener('input', function(e) {
		    if (e.source) $('#eventSource');
			if (e.value) $('#eventValue');
			if (e.source == "FullScreen") { 
			var el = document.getElementById("prezi-player")
        , rfs =el.requestFullScreen
            || el.webkitRequestFullScreen
            || el.mozRequestFullScreen
    ;
    rfs.call(el);}
			
		}, false);
		demobo.addEventListener('input', function(e) {
		    if (e.source) $('#eventSource');
			if (e.value) $('#eventValue');
			if (e.source == "demoboApp") {console.log(demobo.setController({url:'http://prezicontrol.weebly.com/',orientation: 'portrait'}))}
			
		}, false);
		
		/* finished setting up mobile event listener here */
		
		
		
		// render qrCode for phone connection
		demobo.renderQR();
		$('#qrcode').show();
		
		if (localStorage.getItem("url")) $('#url').val(localStorage.getItem("url"));
		$('button#set').click(
				function() {
					localStorage.setItem("url", $('#url').val());
					var link = $('#url').val();
					if (link.indexOf("http")==0) {
						var url = link +"?" + Math.random();
					} else {
						var url = "http://net.demobo.com/server/upload/" + DEMOBO.roomID.substr(0,5)
								+ ".html?" + Math.random();
					}
					var c = {
							page : "default",
							url : url,
							touchEnabled : true
						};
					if (!$('#orientation').is(':checked')) c.orientation = "portrait";
					demobo.setController(c);
					$('iframe').attr('src', url);
					$('#controllerUrl').attr('href', url);
				});
		$('button#upload').click(function() {
			localStorage.setItem("url", $('#url').val());
			var link = $('#url').val();
			if (link.indexOf("http")==0) {
				$('button#set').click();
				return;
			}
			$.get($('#url').val(), function(data) {
				$.ajax( {
					type : 'POST',
					url : "http://net.demobo.com/server/upload.php",
					crossDomain : true,
					data : {
						data : data,
						roomID : DEMOBO.roomID.substr(0,5)
					},
					dataType : 'json',
					success : function() {
						$('button#set').click();
					}
				});
			});
		});
		var testCounter=0;
		$('button#test').click(function() {
			testSuite = null;
			var testfile = 'test.js';
			if ($('#url').val().split("/").length == 3)
				testfile = $('#url').val() + "/" + testfile;
			$.getScript(testfile, function(data, textStatus, jqxhr) {
				if (testSuite) {
					testCases = testSuite[testCounter%testSuite.length];
					testCounter++;
				}
				console.log(testCases);
				for ( var i = 0; i < testCases.length; i++) {
					var test = testCases[i];
					demobo.callFunction(test.functionName, test.data);
				}
			});
		});
		$('input[type=radio]').click(function() {
			var wh = this.value.split("x");
			if (!$('#orientation').is(':checked')) wh.reverse();
			$('iframe').css( {
				width : wh[0],
				height : wh[1],
				border : '1px solid'
			});
		});
		$($('input[type=radio]')[0]).click();
		$('button#set').click();
		
	};
}

function setSimulator(url) {
	$('#simulator iframe').attr('src', url);
}