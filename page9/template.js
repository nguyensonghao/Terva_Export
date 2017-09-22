var Row = require('./row.js');
var moment = require('moment');
var request = require('request');

var API_URL = 'http://localhost:3003/';

Number.prototype.formatMoney = function (c, d, t) {
	var n = this,
		c = isNaN(c = Math.abs(c)) ? 2 : c,
		d = d == undefined ? "." : d,
		t = t == undefined ? "," : t,
		s = n < 0 ? "-" : "",
		i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
		j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};


function cleanPrice(price, together) {
	price = parseInt(price);
	if (price) {
		if (together) {
			return "$" + price.formatMoney(0)
		} else {
			return price.formatMoney(0)
		}
	} else {
		return ""
	}
}

function cleanDropdown(property, val) {
	if (property == 'Price_Acre') {
		return cleanPrice(val, true);
	} else if (property == 'Sale_Price') {
		return cleanPrice(val, true);
	} else if (property == 'Total_Acres') {
		return Math.round(val * 10) / 10
	}

	return val
}

function getStr(lat, lng, callback) {
	var url = API_URL + "area/get-str/" + lat + "/" + lng;
	request(url, function (error, response, body) {
		var data = JSON.parse(body);
		if(typeof(callback) == 'function')
		callback(data);
	});
}

function status(status) {
	if (status == "Sold-v")
		status = "Sold";
	if (status == "For Sale") {
		if (status == 'Auction') {
			return "Auction";
		} else if (status == 'Listing') {
			return "Active Listing";
		} else {
			return status;
		}
	}

	return status;
}

function saleDate(date) {
	try {
		if (!date)
			return "-";
		date = new Date(date.toString());
		return formatDate(date)
	} catch (err) {
		return "-"
	}
}

function formatDate(date) {
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0' + minutes : minutes;
	var strTime = hours + ':' + minutes + ' ' + ampm;
	var month = date.getMonth() + 1;
	if (month < 10)
		month = "0" + month;

	var d = date.getDate();
	if (d < 10)
		d = "0" + d;
	return month + "-" + d + "-" + date.getFullYear().toString().substr(-2);
}

function updateValue(val) {
	if (!val)
		return '-';
	return val;
}

module.exports = {
	content: function (list) {
		var listStr = "";
		// console.log(list);
		for (var i = 0; i < list.length; i++) {

			list[i]["sales"]["Sale_Date"] = saleDate(list[i]["sales"]["Sale_Date"]);
			list[i]["sales"]["Sale_Condition"] = status(list[i]["sales"]["Sale_Condition"]);

			list[i]["sales"]["Percent_Tillable"] = updateValue(list[i]["sales"]["Percent_Tillable"]);
			if (list[i]["sales"]["Percent_Tillable"] !== '-') {
				list[i]["sales"]["Percent_Tillable"] = list[i]["sales"]["Percent_Tillable"] + '%';
			}
			list[i]["sales"]["Total_Acres"] = updateValue(list[i]["sales"]["Total_Acres"]);
			getStr(list[i]["properties"]["lat_center"], list[i]["properties"]["lng_center"], function (data) {
				console.log(data);
				list[i]["sales"]["Address"] = data;
			});
			list[i]["sales"]["Address"] = updateValue(list[i]["sales"]["Address"]);
			list[i]["sales"]["Sale_Price"] = updateValue(list[i]["sales"]["Sale_Price"]);
			list[i]["sales"]["Sale_Price"] = cleanDropdown('Sale_Price', list[i]["sales"]["Sale_Price"]);
			list[i]["sales"]["Price_Acre"] = updateValue(list[i]["sales"]["Price_Acre"]);
			list[i]["sales"]["Price_Acre"] = cleanDropdown('Price_Acre', list[i]["sales"]["Price_Acre"]);
			list[i]["sales"]["Avg_CSR2"] = updateValue(list[i]["sales"]["Avg_CSR2"]);

			if (list[i]["sales"]["Avg_CSR2"] !== '-') {
				list[i]["sales"]["Avg_CSR2"] = Math.round(list[i]["sales"]["Avg_CSR2"]);;
			}

			listStr += Row.content(list[i]);
		}

		return '<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500,500i,700,900" rel="stylesheet"> <link href="https://fonts.googleapis.com/css?family=Allerta" rel="stylesheet"> <div id="page-9"> <div class="detail"> <table> <thead> <th>Date</th> <th>Legal</th> <th>Acres</th> <th>% Tillable</th> <th>CSR2</th> <th>Price</th> <th>$/Acre</th> <th>Type</th> <th>Link</th> </thead> <tbody>' + listStr + '</tbody> </table> </div> </div> <style> body { padding-left: 30px; padding-right: 30px } #page-9 { background: white; width: 740px; } #page-9 h2 { font-size: 32px; font-weight: bold; margin-bottom: 10px; } #page-9 table { border-collapse: collapse; width: 740px; } #page-9 p { font-size: 16px; } #page-9 .information { padding-top: 10px; } #page-9 th { font-weight: bold; background: white; font-family: Allerta; font-size: 12px; } #page-9 th, #page-9 td { text-align: center; padding: 3px 16px; margin: 0px; } #page-9 td { font-size: 12px; font-family: Roboto; } #page-9 tr:nth-child(2n + 1) { background: #e0e0e0; border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; } #page-9 td a { text-decoration: none; color: black; } #page-9 .smallest { font-size: 12px; margin-top: 30px; } </style>';
	}
}