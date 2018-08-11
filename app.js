const express        = require('express'),
      mongoose       = require('mongoose'),
      bodyParser     = require('body-parser'),
      flash          = require('connect-flash'),
      methodOverride = require('method-override'),
      passport       = require('passport'),
      localStrategy  = require('passport-local'),
      seedDB         = require('./seeds'),
      app            = express();

const Company = require('./models/company'),
      Review  = require('./models/review'),
      User    = require('./models/user');

let companyRoutes = require('./routes/companies'),
    reviewRoutes  = require('./routes/reviews'),
    indexRoutes   = require('./routes/index');

mongoose.connect("mongodb://localhost/jsrItPark");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
app.set('view engine', 'ejs');
// seedDB();

// PASSPORT CONFIG
app.use(require('express-session')({
    secret: 'Remon will be a legend',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error       = req.flash('error');
    res.locals.success     = req.flash('success');
    next();
});

app.use(indexRoutes);
app.use('/companies', companyRoutes);
app.use('/companies/:id/reviews', reviewRoutes);

app.listen(3000, () => {
    console.log('Jassore IT Park has started');
});