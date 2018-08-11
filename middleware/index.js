const Company = require('../models/company'),
      Review  = require('../models/review');

let middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'You need to be logged in to do that');
    res.redirect('/login');
};

middlewareObj.checkCompanyOwnership = (req, res, next) => {
    if (req.isAuthenticated()) {
        Company.findById(req.params.id, (err, foundCompany) => {
            if (err) {
                req.flash('error', 'Company not found');
                res.redirect('back');
            } else {
                if (foundCompany.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', 'You do not have the permission to do that');
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', 'You need to be logged in to do that');
        res.redirect('/login');
    }
};

middlewareObj.checkReviewOwnership = (req, res, next) => {
    if (req.isAuthenticated()) {
        Review.findById(req.params.review_id, (err, foundReview) => {
            if (err) {
                req.flash('error', 'Review not found');
                res.redirect('back');
            } else {
                if (foundReview.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', 'You do not have the permission to do that');
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', 'You need to be logged in to do that');
        res.redirect('/login');
    }
};

module.exports = middlewareObj;