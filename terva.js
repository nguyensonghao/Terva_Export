var pdf = require('html-pdf');
var fs = require('fs');
var path = require('path');
var options = {
	"footer": {
    	height: "50px",
    	background: 'red'
    }
};

fs.readFile('footer/style.txt', 'utf8', function (err, style) {
	var imgSrcLogo = 'file://' + __dirname + '/terva-logo-bw.png';
	imgSrcLogo = path.normalize(imgSrcLogo);

	var imgSrcContent = 'file://' + __dirname + '/test.png';
	imgSrcContent = path.normalize(imgSrcContent);

	var html = style;
	// html = html + '<body><img class="image-content" src="'+ imgSrcContent +'"><a href="https://app.terva.ag">Xin chao</a><div id="pageFooter"><div class="logo-container"><div class="logo-text"><p>Prepared by Terva</p><p class="link-site">www.terva.ag</p></div><div class="line"></div><img class="logo" src="'+ imgSrcLogo +'"/></div><span class="time">'+ getNiceTime() +'</span></div></div></body>';
	for (var i = 0; i < 100; i++) {
		html += "<p>Xin chao</p>";
	}

	html += '<div id="pageFooter"><div class="logo-container"><div class="logo-text"><p>Prepared by Terva</p><p class="link-site">www.terva.ag</p></div><div class="line"></div><img class="logo" src="'+ imgSrcLogo +'"/></div><span class="time">'+ getNiceTime() +'</span></div></div>';
	pdf.create(html, options).toFile('./terva.pdf', function(err, res) {
	  	if (err) return console.log(err);

	  	console.log("Convert pdf successfully");
	})
})
 
function getMonth () {
	var monthNames = ["January", "February", "March", "April", "May", "June",
	  "July", "August", "September", "October", "November", "December"
	];

	var d = new Date();
	return monthNames[d.getMonth()];
}

function getNiceTime () {
	var month = getMonth();
	var date = new Date();
	var day = date.getDate();
	if (day < 10)
		day = "0" + day;
	return month + " " + day + ", " +  date.getFullYear();
}