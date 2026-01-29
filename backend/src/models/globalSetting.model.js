const mongoose = require('mongoose');

const globalSettingSchema = new mongoose.Schema(
    {
        notificationEmails: {
            type: [String],
            default: ['B2B@thesolvedglobal.com'],
            validate: {
                validator: function (v) {
                    return v.every(email => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email));
                },
                message: props => `${props.value} contains an invalid email!`
            }
        },
        contactDetails: {
            primaryEmail: { type: String, default: 'support@imperium.com' },
            primaryPhone: { type: String, default: '+1 (555) 123-4567' },
            officeAddress: { type: String, default: '' }
        }
    },
    {
        timestamps: true,
    }
);

const GlobalSetting = mongoose.model('GlobalSetting', globalSettingSchema);

module.exports = GlobalSetting;
