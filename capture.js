var phantom = require('phantom');
var waitUntil = require('wait-until');
var phInstance = null;

phantom.create().then((ph) => {
    ph.createPage().then((page) => {
        page.property('viewportSize', {width: 740, height: 700}).then(() => {
            page.open("http://localhost:3000/report-page1?id=57e32e1fb0ee4f26aefe916e").then((status) => {            
                setTimeout(function () {
                    page.render('test.png').then(function () {
                        console.log("Render successfully");
                        ph.exit();
                        process.exit(1);
                    }); 
                }, 3000);

            })
        })    
        .catch(e => {
            console.log(e);
        });
   });    
});