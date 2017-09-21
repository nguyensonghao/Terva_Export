var PDFMerge = require('pdf-merge');

var capturePage1 = require('./page1/index.js');
var capturePage2 = require('./page2/index.js');
var capturePage3 = require('./page3/index.js');
var capturePage4 = require('./page4/index.js');
var capturePage5 = require('./page5/index.js');
var capturePage6 = require('./page6/index.js');
var capturePage7 = require('./page7/index.js');
var capturePage8 = require('./page8/index.js');

var count = 0;
var waitUntil = require('wait-until');

capturePage1.printPdf(function (result) {
	if (result) {
		count ++;
	} else{
		console.log("Have an error");
	}
})

capturePage2.printPdf(function (result) {
	if (result) {
		count ++;
	} else{
		console.log("Have an error");
	}
})

capturePage3.printPdf(function (result) {
	if (result) {
		count ++;
	} else{
		console.log("Have an error");
	}
})

capturePage4.printPdf(function (result) {
	if (result) {
		count ++;
	} else{
		console.log("Have an error");
	}
})

capturePage5.printPdf(function (result) {
	if (result) {
		count ++;
	} else{
		console.log("Have an error");
	}
})

capturePage6.printPdf(function (result) {
	if (result) {
		count ++;
	} else{
		console.log("Have an error");
	}
})

capturePage7.printPdf(function (result) {
	if (result) {
		count ++;
	} else{
		console.log("Have an error");
	}
})

capturePage8.printPdf(function (result) {
	if (result) {
		count ++;
	} else{
		console.log("Have an error");
	}
})

var intervalId = setInterval(function () {
	console.log(count);
	if (count == 8) {
		clearInterval(intervalId);
		clearTimeout(timeoutId);
		var rootPath = __dirname;
		var files = [];
		for (var i = 1; i < 9; i++) {
			var page = "page" + i;
			files.push(rootPath + "/" + page + "/resources/" + page + ".pdf");
		}

		PDFMerge(files, {output: './report.pdf'}).then((buffer) => {
			console.log("Merge successfully");
		});
	}
}, 100);

var timeoutId = setTimeout(function () {
	if (count < 8) {
		clearInterval(intervalId);
	}
}, 60000);