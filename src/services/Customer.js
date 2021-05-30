const mongoose = require('mongoose'),
  CustomerModel = mongoose.model('Customer'),
  looger = require('../loaders/looger');

class Customer {
  constructor(customer) {
    this.customer = customer;
  }
  static async update(customer) {
    const { customerID, accountPermissions } = customer;
    looger.info(`services:Customer - update customer accountPermissions customerID:${customerID}`);
    try {
      //get list of scope in array
      const listOfPermissions = accountPermissions.map(({ scope }) => scope);
      //get the account premmision array
      const customerPermission = await CustomerModel.findOne({ customerID }).select('accountPermissions');
      // if  the customer not exist return error
      if (!customerPermission) {
        looger.info(`services:Customer - update customer accountPermissions cand find customer customerID:${customerID}`);

        return false;
      }

      // //check if the account have the premision that needed to be updated
      const premissionsToUpdate = customerPermission.accountPermissions.filter(({ scope }) => listOfPermissions.includes(scope));
      if (premissionsToUpdate.length == 0) {
        looger.info(`services:Customer - update customer accountPermissions cand find permissions to update customerID:${customerID}`);

        return false;
      }
      //update the customer premissions object
      const updatedPremissions = customerPermission.accountPermissions.map((obj) => {
        const [premissionToUpdate] = accountPermissions.filter(({ scope }) => scope === obj.scope);
        if (premissionToUpdate) {
          obj.accountStatus = premissionToUpdate.accountStatus;
        }
        return obj;
      });

      let result = await CustomerModel.update(
        { customerID: customerID },
        {
          $set: { accountPermissions: updatedPremissions },
        }
      );

      return result;
    } catch (error) {
      looger.error(`services:Customer - error update customer accountPermissions customerID:${customerID}  err:${error.stack}`);
      throw error;
    }
  }
  static async getAll() {
    looger.info(`services:Customer - get all customers`);
    try {
      const result = await CustomerModel.find();
      return result;
    } catch (error) {
      looger.error(`services:Customer - error in get all customers err:${error.stack}`);
      throw error;
    }
  }
  static async getOne(customerID) {
    looger.info(`services:Customer - get customer:${customerID} `);
    try {
      const result = await CustomerModel.findOne({ customerID });
      return result;
    } catch (error) {
      looger.error(`services:Customer - error in get customer customerid${customerID} err:${error.stack}`);
      throw error;
    }
  }
  static async delete(customerID) {
    looger.info(`services:Customer - delete customer:${customerID} `);
    try {
      const { deletedCount } = await CustomerModel.deleteOne({ customerID });
      return deletedCount;
    } catch (error) {
      looger.error(`services:Customer - error in delete customer customerid${customerID} err:${error.stack}`);
      throw error;
    }
  }
  async create() {
    const customerModel = new CustomerModel(this.customer);
    try {
      looger.info(`services:Customer - add new customer:${this.customer.customerID} `);
      const result = await customerModel.save();

      return result;
    } catch (error) {
      looger.error(`services:Customer  - error in create customer customerid${this.customer.customerID} err:${error.stack}`);
      throw error;
    }
  }
}

module.exports = Customer;
