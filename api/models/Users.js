/**
 * Users.js
 *
 * пользователи
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var HASH_LEN = 25;

module.exports = {
  attributes: {
    hash: {
      type: 'string',
      required: true,
      unique: true,
      size: HASH_LEN,
      defaultsTo: function () {
        return Hash.random(HASH_LEN);
      }
    },
    originalId: {
      type: 'string',
      size: 32,
      required: true,
      unique: true
    },
    name: {
      type: 'string',
      size: 64
    },
    serverUrl: {//урл сервера для этого пользователя
      type: 'string',
      size: 128,
      required: true,
      defaultsTo: function () {
        //пока что только текущий сервер
        return 'http://localhost:1337/';
      }
    },
    solutions: {
      collection: 'Solutions',
      via: 'user'
    },

    //вернет решения, связанные с этим пользователем
    getListSolutions: function (cb) {
      Solutions.find({ user: this.id }).exec(function (err, solutions) {
        cb(solutions);
      });
    },
    //регистрация на стороннем сервере
    regOnExternalServer: function(cb) {
      //посылаем на выбранный сервер щапрос на регистрацию пользователя
      //сообщаем что этот севрер вторичный

      cb();
    },
    /**
     * создаем стандартные решения
     */
    checkSolutions: function(cb) {
      var Check = require('./../services/scenaries/create/ChechUserSolutionsScenario');
      var scenario = new Check(this);
      scenario.go(cb);
    }
  },
  /**
   * чекает юзера
   * если ид есть, возращает модель, если нету, создает и возращает
   */
  check: function (originalId, name, statistic, cb) {
    var self = this;
    self.findOrCreate({ originalId: originalId }, { originalId: originalId }).exec(function (err, user) {
      if(!err) {
        //вернет наименее нагруженный url
        statistic.getFree(function(url, isExternal) {
          //обновляем не критические данные для потока
          var upData = {name: name}
          if(!user.serverUrl) {
            upData["serverUrl"] = url;
          }
          user.name = name;
          user.serverUrl = url;
          self.update({id: user.id}, upData).exec(function(err, andName) {});
          //выполняем запрос по регистрации пользователя на сторонний сервер
          if(isExternal) {
            //регистрация на стороннем сервере
            user.regOnExternalServer(function() {
              return cb(user);
            });
          }
          else return cb(user);
        });
      }
      else {
        return cb(null);
      }
    });
  }
};
