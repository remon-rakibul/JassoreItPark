let express    = require('express'),
    router     = express.Router(),
    Company    = require('../models/company'),
    middleware = require('../middleware/index');

//INDEX ROUTE
router.get('/', (req, res) => {
    //GETTING COMPANIES FROM DB
    Company.find({}, (err, allcompanies) => {
        err ? console.log(err) : res.render('companies/index', {
            companies: allcompanies
        });
    });
});

//NEW ROUTE
router.get('/new', middleware.isLoggedIn, (req, res) => {
    res.render('companies/newCompany');
});

//CREATE ROUTE
router.post('/', middleware.isLoggedIn, (req, res) => {
    let name = req.body.newCompanyName,
        image = req.body.newCompanyImage,
        desc = req.body.newCompanyDescription,
        author = {
            id: req.user._id,
            username: req.user.username
        },
        newCompany = {
            name: name,
            image: image,
            description: desc,
            author: author
        };
    //CREATING COMPANY INTO DB
    Company.create(newCompany, (err, company) => {
        if (err) {
            req.flash('error', 'Something went wrong');
        } else {
            req.flash('success', 'Successfully created a new company');
            res.redirect('/companies');
        }
    });
});

//SHOW ROUTE
router.get('/:id', (req, res) => {
    Company.findById(req.params.id).populate("reviews").exec((err, foundCompany) => {
        err ? console.log(err) : res.render('companies/showCompany', {
            company: foundCompany
        });
    });
});

//EDIT ROUTE
router.get('/:id/edit', middleware.checkCompanyOwnership, (req, res) => {
    Company.findById(req.params.id, (err, foundCompany) => {
        if (err) {
            req.flash('error', 'Something went worng');
            res.redirect('back');
        } else {
            res.render('companies/edit', {company: foundCompany});
        }
    });
});

//UPDATE ROUTE
router.put('/:id', middleware.checkCompanyOwnership, (req, res) => {
    Company.findByIdAndUpdate(req.params.id, req.body.company, (err, updatedCompany) => {
        if (err) {
            req.flash('error', 'Something went wrong');
            res.redirect('back');
        } else {
            req.flash('success', 'Successfully Updated');
            res.redirect('/companies/' + updatedCompany._id);
        }
    });
});

//DESTROY ROUTE
router.delete('/:id', middleware.checkCompanyOwnership, (req, res) => {
    Company.findByIdAndRemove(req.params.id, err => {
        if (err) {
            req.flash('error', 'Something went wrong');
            res.redirect('back');
        } else {
            req.flash('success', 'Successfully deleted');
            res.redirect('/companies');
        }
    });
});

module.exports = router;