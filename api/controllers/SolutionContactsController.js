/**
 * SolutionContactsController
 *
 * @description :: Server-side logic for managing Solutioncontacts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * вернет контакты для текущего решения
   *
   * solution
   */
  list: function (req, res) {
    var atuh = require('./../services/user/auth');
    var user = new atuh(req);

    var solution = req.param('solution');
    user.hasSolution(solution, function (has) {
      if (!has) return res.json({}); //отказано в доступе

      SolutionContacts.find({ solution: solution }).exec(function (err, contacts) {
        return res.json(contacts);
      });
    });
  },

  /**
   * запишет параметр для контакта
   *
   * data
   * contact
   */
  update: function (req, res) {
    var contact = JSON.parse(req.param('data'));

    var atuh = require('./../services/user/auth');
    var user = new atuh(req);
    user.hasSolution(contact.solution, function (has) {
      if (!has) return res.json({ success: false }); //отказано в доступе

      //обновим атрибуты
      SolutionContacts.update({ solution: contact.solution, id: contact.id }, {
        enabled: contact.enabled,
        required: contact.required
      }).exec(function () {
        return res.json({success: true});
      });
    });
  }
};
