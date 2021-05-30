const { Schema, model } = require('mongoose');
const original = Schema.Types.String.checkRequired((v) => v != null);

const accountPermissions = new Schema({
  scope: {
    type: String,
    required: true,
  },
  accountNumberIBAN: {
    type: String,
    required: true,
  },
  openingBranch: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  productCode: {
    type: String,
    required: true,
  },
  currencyCode: {
    type: String,
    required: true,
  },
  accountStatus: {
    type: String,
    required: true,
  },
  managingBranch: {
    type: String,
    required: true,
  },
});

const CustomerSchema = new Schema({
  clientBank: {
    type: String,
    required: true,
  },
  clientID: {
    type: String,
    required: true,
  },
  consentID: {
    type: String,
    required: true,
  },
  customerID: {
    type: String,
    required: true,
  },
  customerPassport: {
    type: String,
    required: true,
  },
  consentTrack: {
    type: String,
    required: true,
  },
  consentStatus: {
    type: String,
    required: true,
  },
  activationStatus: {
    type: String,
    required: true,
  },
  customerSite: {
    type: String,
    required: true,
  },
  consentReusability: {
    type: String,
    required: true,
  },
  acceptedDate: {
    type: String,
    required: true,
  },
  confirmationTimestamp: {
    type: String,
    required: true,
  },
  validFrom: {
    type: String,
    required: true,
  },
  validUntil: {
    type: String,
    required: true,
  },
  modificationTimestamp: {
    type: String,
    required: true,
  },
  cancellationTimestamp: {
    type: String,
    required: true,
  },
  cancellationReason: {
    type: String,
    required: true,
  },
  cancellationInitiator: {
    type: String,
    required: true,
  },
  frequencyPerDay: {
    type: Number,
    required: true,
  },
  accountPermissions: {
    type: [accountPermissions],
    required: true,
  },
});

model('Customer', CustomerSchema);
