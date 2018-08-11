const Company = require('./models/company'),
      Review  = require('./models/review'),
      mongoose= require('mongoose');

let data = [
    {
        name: "OnAir International Limited",
        image: "https://www.unijobsbd.com/images/companylogo/1502280462__Onair.jpg",
        description: "OnAir provides round-the- clock services to its customers. With a state-of- the-art communication system in place, onAir is well positioned to establish quicker interaction with customers and to have quick response time. OnAir is able to provide quality deliverables to customers globally through its efficient processes and effective Project Management techniques."
    },
    {
        name: "OnAir International Limited",
        image: "https://www.unijobsbd.com/images/companylogo/1502280462__Onair.jpg",
        description: "OnAir provides round-the- clock services to its customers. With a state-of- the-art communication system in place, onAir is well positioned to establish quicker interaction with customers and to have quick response time. OnAir is able to provide quality deliverables to customers globally through its efficient processes and effective Project Management techniques."
    },
    {
        name: "OnAir International Limited",
        image: "https://www.unijobsbd.com/images/companylogo/1502280462__Onair.jpg",
        description: "OnAir provides round-the- clock services to its customers. With a state-of- the-art communication system in place, onAir is well positioned to establish quicker interaction with customers and to have quick response time. OnAir is able to provide quality deliverables to customers globally through its efficient processes and effective Project Management techniques."
    }
];

let seedDB = () => {
    // REMOVING COMPANIES
    Company.remove({}, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Removing Companies");
            // CREATING COMPANIES INTO DB
            data.forEach(seed => {
                Company.create(seed, (err, company) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Creating a Company");
                        // CREATING REVIEWS
                        Review.create({
                            author: "Renesis Wolf",
                            comment: "One of the best companies in IT Park"
                        }, (err, review) => {
                            if (err) {
                                console.log(err);
                            } else {
                                company.reviews.push(review);
                                company.save((err) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log("Creating a Review");
                                    }
                                });
                            }
                        });
                    }
                });
            });
        }
    });
};

module.exports = seedDB;