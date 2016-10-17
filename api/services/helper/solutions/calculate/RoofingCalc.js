/**
* умеет делать подсчет по крыше
* запрашивает ценники из данных решения
*/
module.exports = function (solution, data) {
  //решение
  this.solution = solution;
  //данные от пользователя
  this.data = data;
  //поля для этого решения
  this.fields = [];
  /**
  * запрашивает данные полей для это решения
  * в основном это ценники
  */
  this.getCalcData = function (cb) {
    SolutionFields.find({ solution: this.solution.id }).populate('values').exec(function (err, fields) {
      cb(fields);
    });
  };

  /**
  * отдаст цену по названию поля
  */
  this.getPriceByName = function (item) {
    var normal = item.name.replace(/_/g, " ");//потому что для "name" убирали пробелы
    for (var i in this.fields) {
      var field = this.fields[i];
      if (field.name == normal) {        
        //если это селект, находим вернем сразу данные из value. тк они пользотельские
        if (field.values.length > 0) {
          return item.value;
        }

        return field.sysVal;
      }
    }

    return 0;
  };

  /**
  * модифицируем юзер данные таким образом,
  * чтобы внутри лежала стоимость
  */
  this.modifyDataByPrice = function () {
    for (var i in this.data) {
      var item = this.data[i];
      item['price'] = this.getPriceByName(item);            
    }
  };

  /**
  * счет
  */
  this.calc = function (cb) {
    var self = this;
    //сначала узнаем ценники из базы
    this.getCalcData(function (fields) {
      self.fields = fields;
      self.modifyDataByPrice();
      cb(self.getVal());
    });
  };

  /**
  *отдаст посчитанные данные по data
  */
  this.getVal = function () {    
    return {
      min: 0,
      middle: 100,
      max: 2000
    };
  };
};