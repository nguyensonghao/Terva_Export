var fs = require('fs');
var pdf = require('html-pdf');

var Footer = require('./footer/index.js');
var Header = require('./header/index.js');

fs.readFile('./page9/index.html', 'utf-8', function (err, data) {
	var footerContent = Footer.content();
	var headerContent = Header.content();
	var container = data;
	var html = "<body>" + headerContent + data + footerContent + "</body>";

	var options = {
		footer: {
	    	height: "50px",
	    },
	    header: {
	    	height: "50px"
	    }
	};
	
	pdf.create(html, options).toFile('./page9.pdf', function(err, res) {
	  	if (err) return console.log(err);

	  	console.log("Convert pdf successfully");
	})
})