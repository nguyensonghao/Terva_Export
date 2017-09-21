var phantom = require('phantom');
var fs = require('fs');
var pdf = require('html-pdf');
var path = require('path');

var Footer = require('../footer/index.js');
var Header = require('../header/index.js');
var phInstance = null;
var BASE_URL = "http://localhost:3000/report-page2?id=57e32e1fb0ee4f26aefe916e";

function capture (callback) {
	phantom.create().then((ph) => {
	    ph.createPage().then((page) => {
	        page.property('viewportSize', {width: 740, height: 740}).then(() => {
	            page.open(BASE_URL).then((status) => {            
	                setTimeout(function () {
	                	var imageUrl = './page2/resources/page2.png';
	                    page.render(imageUrl).then(function () {
	                        ph.exit();
	                        callback(true);
	                    }); 
	                }, 3000);

	            })
	        })    
	        .catch(e => {
	        	callback(false);
	            console.log(e);
	        });
	   });    
	});
}

module.exports = {
	printPdf: function (callback) {
		capture(function (result) {
			if (result) {
				var footerContent = Footer.content();
				var headerContent = Header.content();
				var imgSrcMap = 'file://' + __dirname + '/resources/page2.png';
				imgSrcMap = path.normalize(imgSrcMap);
				var container = '<img class="image-content" src="'+ imgSrcMap +'">';
				var html = "<body>" + headerContent + container + footerContent + "</body>";

				var options = {
					footer: {
				    	height: "50px",
				    },
				    header: {
				    	height: "50px"
				    }
				};
				
				pdf.create(html, options).toFile('./page2/resources/page2.pdf', function(err, res) {
				  	callback(!err);
				})
			} else {
				callback(false);
			}
		})
	}
}