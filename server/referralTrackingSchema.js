const mongoose = require('mongoose');

const referralTrackingSchema = new mongoose.Schema({

    referralCode : {
        type : String,
        required :  true,
        unique : true
    },
    points : {
        type : Number,
    },
    createdAt : {
        type : Date
    },
    referralUsers_id : {
        type : Array
    },
}, { collection: 'referral' });

const ReferralTracking = mongoose.model('ReferralTracking', referralTrackingSchema);

module.exports = ReferralTracking;
