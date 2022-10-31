app.get('/', (req, res) => {



  let nextVisitorId = 1;

  res.cookie('visitorId', nextVisitorId++);
  res.cookie('visited', Date.now().toString());


  res.render('welcome', {
    name: req.query.name || "World!!!!!",
  });
});


