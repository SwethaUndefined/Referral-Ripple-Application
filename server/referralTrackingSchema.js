const mongoose = require('mongoose');

const referralTrackingSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true 
    },
    automaticReferralCode: {
        type: String,
        required: true,
        unique: true
    },
    referralCode :{
        type: String,
    },
    referralCount: {
        type: Number,
        required: true
    },
}, { collection: 'referral_tracking' });

const ReferralTracking = mongoose.model('ReferralTracking', referralTrackingSchema);

module.exports = ReferralTracking;
