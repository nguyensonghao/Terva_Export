module.exports = {
	content: function (data) {
		return '<tr><td>' + data['sales']['Sale_Date'] + '</td><td>' + data['sales']['Address'] + '</td><td>'  + data['sales']['Total_Acres'] + '</td><td>' + data['sales']['Percent_Tillable'] + '</td><td>' + data['sales']['Avg_CSR2'] + '</td><td>' + data['sales']['Sale_Price'] + '</td><td>' + data['sales']['Price_Acre']  + '</td><td>' + data['sales']['Sale_Condition'] + '</td><td><a href="' + data['sales']['link'] + '">Click here</a></td></tr>';
	}
}