let express    = require('express'),
    router     = express.Router({mergeParams: true}),
    Company    = require('../models/company'),
    Review     = require('../models/review'),
    middleware = require('../middleware/index');
//NEW ROUTE
router.get('/new', middleware.isLoggedIn, (req, res) => {
    Company.findById(req.params.id, (err, foundCompany) => {
        err ? console.log(err) : res.render('reviews/new', {
            company: foundCompany
        });
    });
});
//CREATE ROUTE
router.post('/', middleware.isLoggedIn, (req, res) => {
    Company.findById(req.params.id, (err, foundCompany) => {
        if (err) {
            console.log(err);
            res.redirect('back');
        } else {
            Review.create(req.body.reviews, (err, review) => {
                if (err) {
                    console.log(err);
                } else {
                    review.author.id = req.user._id;
                    review.author.username = req.user.username;
                    review.save();
                    foundCompany.reviews.push(review);
                    foundCompany.save();
                    req.flash('success', 'Successfully created review');
                    res.redirect('/companies/' + foundCompany._id);
                }
            });
        }
    });
});
//EDIT ROUTE
router.get('/:review_id/edit', middleware.checkReviewOwnership, (req, res) => {
    Review.findById(req.params.review_id, (err, foundReview) => {
        if (err) {
            req.flash('error', 'Something went wrong');
            res.redirect('back');
        } else {
            res.render('reviews/edit', {companyId: req.params.id, review: foundReview});
        }
    });
});
//UPDATE ROUTE
router.put('/:review_id', middleware.checkReviewOwnership, (req, res) => {
    Review.findByIdAndUpdate(req.params.review_id, req.body.review, (err, updatedReview) => {
        if (err) {
            req.flash('error', 'Something went wrong');
            res.redirect('back');
        } else {
            req.flash('success', 'Successfully Updated Review');
            res.redirect('/companies/'+ req.params.id);
        }
    });
});
//DESTROY ROUTE
router.delete('/:review_id', middleware.checkReviewOwnership, (req, res) => {
    Review.findByIdAndRemove(req.params.review_id, err => {
        if (err) {
            req.flash('error', 'Something went wrong');
            res.redirect('back');
        } else {
            req.flash('success', 'Successfully Deleted Review');
            res.redirect('/companies/' + req.params.id);
        }
    });
});

module.exports = router;