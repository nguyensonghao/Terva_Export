var Row = require('./row.js');

module.exports = {
	content: function (list) {
		var listStr = "";
		for (var i = 0; i < list.length; i++) {
			listStr += Row.content(list[i]);
		}

		return '<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500,500i,700,900" rel="stylesheet"> <link href="https://fonts.googleapis.com/css?family=Allerta" rel="stylesheet"> <div id="page-9"> <div class="detail"> <table> <thead> <th>Date</th> <th>Legal</th> <th>Acres</th> <th>% Tillable</th> <th>CSR2</th> <th>Price</th> <th>$/Acre</th> <th>Type</th> <th>Link</th> </thead> <tbody>' + listStr + '</tbody> </table> </div> </div> <style> body { padding-left: 30px; padding-right: 30px } #page-9 { background: white; width: 740px; } #page-9 h2 { font-size: 32px; font-weight: bold; margin-bottom: 10px; } #page-9 table { border-collapse: collapse; width: 740px; } #page-9 p { font-size: 16px; } #page-9 .information { padding-top: 10px; } #page-9 th { font-weight: bold; background: white; font-family: Allerta; font-size: 12px; } #page-9 th, #page-9 td { text-align: center; padding: 3px 16px; margin: 0px; } #page-9 td { font-size: 12px; font-family: Roboto; } #page-9 tr:nth-child(2n + 1) { background: #e0e0e0; border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; } #page-9 td a { text-decoration: none; color: black; } #page-9 .smallest { font-size: 12px; margin-top: 30px; } </style>';	
	}
}