var pdf = require('html-pdf');
var fs = require('fs');
var path = require('path');

var imgSrcLogo = 'file://' + __dirname + '/terva-logo-bw.png';
imgSrcLogo = path.normalize(imgSrcLogo);

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

module.exports = {
	content: function () {
		return '<div id="pageFooter"><div class="logo-container"><div class="logo-text"><p>Prepared by Terva</p><p class="link-site">www.terva.ag</p></div><div class="line"></div><img class="logo" src="'+ imgSrcLogo +'"/></div><span class="time">'+ getNiceTime() +'</span></div><style>#pageFooter {position: relative;}.logo-container {position: absolute;right: -12px;width: 240px;height: 50px;}.logo-text p {margin: 0;font-size: 12px;color: gray}.link-site {font-weight: bold}.logo-text {display: inline-block;margin-right: 2px;padding-right: 16px;text-align: right;position: relative;top: -10px;}.logo {width: 100px;margin-left: 16px;position: relative;top: -4px;}.time {display: inline-block;font-size: 11px;color: gray;margin-top: 20px;}.line {width: 1px;height: 50px;background: gray;display: inline-block;position: relative;top: 5px;}body {padding: 20px;padding-top: 0;}.image-content {width: 740px;}</style>';
	}
}