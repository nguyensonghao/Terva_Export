var moment = require('moment');
var request = require('request');
var pdf = require('html-pdf');

var Template = require('./template.js');
var Footer = require('../footer/index.js');
var Header = require('../header/index.js');

var dateAgoOneYear = new Date(moment().subtract(11, 'month'));
dateAgoOneYear = (dateAgoOneYear.getMonth() + 1) + "/1/" + dateAgoOneYear.getFullYear();
dateAgoOneYear = new Date(dateAgoOneYear).getTime();
var API_URL = 'http://localhost:3003/';
var url = API_URL+ "area/get-all-sale/" + dateAgoOneYear;
request(url, function (error, response, body) {
	var data = JSON.parse(body);
	var content = Template.content(data);
	var footerContent = Footer.content();
	var headerContent = Header.content();
	var html = "<body>" + headerContent + content + footerContent + "</body>";

	var options = {
		footer: {
	    	height: "50px",
	    },
	    header: {
	    	height: "50px"
	    }
	};
	
	pdf.create(html, options).toFile('./page9/resources/page9.pdf', function(err, res) {
		if (err) {
			console.log(err);
		} else {
			console.log("Render pdf successfully");
		}
	})
});