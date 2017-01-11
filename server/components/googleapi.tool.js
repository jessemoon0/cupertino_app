'use strict';

var fun = require('./funcs.tool.js');
var uc = require('../api/user/user.model');


var GoogleSpreadsheet = require("google-spreadsheet");
 
// spreadsheet key is the long id in the sheets URL 
//var my_sheet = new GoogleSpreadsheet('1jx3jCFf7Xbr-Lh9f7IEnAYIFEqmtntUc63PXkYZ-b20');
 var my_sheet = new GoogleSpreadsheet('1O0o9ZGaUIRT8xHThAF-XfiFkI_zZoaocPC_gvECx4oI');


// Without auth -- read only 
// IMPORTANT: See note below on how to make a sheet public-readable! 
// # is worksheet id - IDs start at 1 
//my_sheet.getRows( 1, function(err, row_data){
//	console.log( 'pulled in '+row_data.length + ' rows');
//});
 
// With auth -- read + write 
// see below for authentication instructions 



var creds = require('./CupertinoWeb-4272c33602d8.json');



// OR, if you cannot save the file locally (like on heroku) 
/*var creds = {
  client_email: 'victor@cupertino.mx',
  private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCALW5M1fQD+fLX\nCDXLoiAdKLfvr8UV/SLVZWAc+dcTm4VEW8b2qCMRwKHj9fAtmtoKkms8cFj+Hg91\nfoD9uuLDlwAoAM9NmnH+K6IwnIepuh0q+6qCBDMKR9L//30tykaCwn0N5qkdkXjx\nc4S5EdV0tCp2YSXC+cRWSVoslDhYderqINgGlk4+DhrLZjwrfRpeqRrsdcCpqHuy\njEXPp7DbuwirOmF/bghHAQ5ZEmg5S8C/f9DklKagiCLefRbX0HbiJFs5dp+XWsbz\nt8cMSMthawIV5oaM7DsS/BQfAi+edEqZI7RMKu+UgXzK173V0TKqQLR460kjRllN\n8CVaA2X3AgMBAAECggEAKxaaoKu/1uJcVxsEcoryvrqkcqek2kp5PkFQ+Qyn14iN\nWTh8/wfwmhQml+piLgKDT9B+yhd+YxaZ3caD+Eet2VBWlhwHlC/aKDZk1HCaTl0p\nVvy5CfH9cnRIoxQw8YaxA138CgNDUJRJkulhcZFkL1ItgBQSTKQH83W/IYNGGb42\nlIt9qAmQWGUL3fGG7m/HOIR+jxvtEZwym9dA4jDq5UpcT9Ym23s9/36hPYmdGJl4\nDNLwrjwcDtABxtA2xErohLxG7akvyBReQ3r8RlptSd/2x9bx2v2YltHVpzZdolrk\nGY1gVCUw3cnkfmCPI9zW2S+QVXyivJL7WHpiZ1CSgQKBgQDWLmHBuHbTYsUDFmLo\nY9qCfeWV1D0pxVF57Zh4T2fNn6XDfaMey6fWNq5DXNAzjOtXPlLbT48ED/lwPBwV\n8ldpmxNDyUYbXPgLI+ihZL4J0uHojamy5xaDPl2v/AI0mmstEKTmvF7wq6GBkrxg\nl6QRiOxKT7BLJ67loD9zhXDMNwKBgQCZND6yDaoRLFqH+sNiSDDBlx6brUbSZEXa\nb2tRSiwk7oRE3K/mA4tVsZcHUH5d4Bcy2jVF+pJQmSHYtBaAQdgMJ5Q3JmDE6diF\ngG4chGgZCkkW1q/2Dipc7CriCex75XUSR6Z2oGJYvnn0XDihBHLLa71HcJ+/F8vt\nvbqbnc7UQQKBgQDJcgZv9deNKjCynrOYb5JteYweR+jfCL+BNn9ZaRXwyF9YZyqt\nJE9Po05z/S+1zKzs+alkrIePApdRgLfJzI16vmh4MS7HPcHueG+snNxA0R+5YsRh\niAgcmOP1ScmpQDPdxvHSMwn4wvS8sg6LqxSdiXL00c62YTSWtQn41WEqMQKBgBz8\ntaAa1cLKEZcI6079ObxnS3NJJc1JC654xmVrE08pkf01hFKQ+RwNrfXEVSSN8dW9\nU7cZ4fU+BBlseZVq3+Xs1y5YJJcdZ8pasnrS0p9qQsn/dOupYnqSdMqv9f67O5tp\n0yU+01zXLVv+1vggT1gN2pJZzN/rMLqa22P2R9wBAoGAK718Qpxe8GHMhCUpcAf9\n89DpIxKEtE57WSA4yrNN3wVPsOdz/F6yuLzTfuG6puLC/NnV4/uIhWNDbxOz5VFk\n5lNcYA8sakeh6O8pkayb0NSJ4WMk54f6xNiHyeklgASUGnKWSWD5+9zUBFwGmOLg\n/TZn7amel04KAg0CCzcqwmM=\n-----END PRIVATE KEY-----\n'
}*/

/*
my_sheet.useServiceAccountAuth(creds, function(err){
	// getInfo returns info about the sheet and an array or "worksheet" objects 
	my_sheet.getInfo( function( err, sheet_info ){
		console.log( sheet_info.title + ' is loaded' );
		// use worksheet object if you want to stop using the # in your calls 
 
		var sheet1 = sheet_info.worksheets[0];
		sheet1.getRows( function( err, rows ){
			rows[0].colname = 'new val';
			rows[0].save();	//async and takes a callback 
			rows[0].del();  //async and takes a callback 
		});
	});
 
	// column names are set by google and are based 
  // on the header row (first row) of your sheet 
	my_sheet.addRow( 2, { colname: 'col value'} );
 
	my_sheet.getRows( 2, {
		offset: 100,			 // start index 
		limit: 100,			   // number of rows to pull 
		orderby: 'name'  // column to order results by 
	}, function(err, row_data){
		// do something... 
	});
})
*/
exports.addToSpreadsheet = function(req, callback){

	console.log("GOOGLE");
/*
my_sheet.getInfo(function(err, row_data){
	console.log( 'pulled in '+row_data.title + ' rows');
});*/
	console.log("GOOGLE :V");

	my_sheet.useServiceAccountAuth(creds, function(err){
		console.log("GOOGLE2 ");
		// getInfo returns info about the sheet and an array or "worksheet" objects 
		my_sheet.getInfo(function(err, sheet_info){
			console.log(":V" + sheet_info.title + "is loaded");

			

			// use worksheet object if you want to stop using the # in your calls 
 
			var sheet1 = sheet_info.worksheets[0];

			console.log("workSheet " + sheet1.title);

			sheet1.getRows( function( err, rows ){
				console.log("row " + rows[0].preciocotizado);
				var i = 0;
				var row = rows[i];
				while (row.equipo != "") {
					i++;
    				row = rows[i];
				}
				var d = new Date();

				var data = JSON.parse(JSON.stringify(req.body));
				console.log("ID " + data.customer);
				var user = fun.getUser(data.customer);
//var user = fun.getUser(data.customer, callback.res);
				//var user = uc.show(req, callback.res, null);

				console.log("US " + fun.getUser(data.customer));

				row.fechasolicitud = (d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear();
				//row.nombre = user.displayName;
				row.apellido = "dump";
				row.email = "mail";
				row.telefono = "2432423";
				row.equipo = data.device;
				row.problema = data.issue;

				row.save();

//				rows[0].colname = 'new val';
//				rows[0].save();	//async and takes a callback 
//				rows[0].del();  //async and takes a callback 
			});
		});
	});
}