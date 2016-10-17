/**
 * Leads.js
 *
 * список лидов
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
module.exports = {
  attributes: {
    solution: {
      model: 'Solutions',
      required: true
    },
    name: {
      type: 'string',
      size: 128
    },
    phone: {
      type: 'string',
      size: 64
    },
    email: {
      type: 'string',
      size: 64
    },
    message: {
      type: 'string',
      size: 512
    },
  },

  /**
   * добавление контактов для решения
   */
  addContacts: function (solution, data, cb) {
    //основные поля
    var allow = ["name", "phone", "email", "message"];
    //данные
    var insert = {
      solution: solution
    };
    //разбираем контакты
    for (var i in data) {
      var contact = data[i];
      if (allow.indexOf(contact.name) > -1) {
        insert[contact.name] = contact.value;
      }
    }
    
    //добавляем контакт в базу
    Leads.create(insert).exec(function (err, ret) {
      cb();
    });
  },
};
