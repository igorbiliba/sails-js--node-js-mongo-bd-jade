module.exports.routes = {
  '/': {
    view: 'main'
  },
  //Users
  '/api/users/check/:id': {//front
    controller: 'UsersController',
    action: 'check',
    skipAssets: true,
    cors: {
      origin: '*',
      headers: 'Origin, X-Requested-With, Content-Type, Accept',
      credentials: true
    }
  },
  //*******

  //Solutions
  '/api/settings/json/:solution': {//front
    controller: 'SolutionsController',
    action: 'json',
    skipAssets: true,
    cors: {
      origin: '*',
      headers: 'Origin, X-Requested-With, Content-Type, Accept',
      credentials: true
    }
  },
  '/api/solutions/cdn/:solution': {
    controller: 'SolutionsController',
    action: 'cdn',
    skipAssets: true,
    cors: {
      origin: '*',
      headers: 'Origin, X-Requested-With, Content-Type, Accept',
      credentials: true
    }
  },
  '/api/solutions/list': {
    controller: 'SolutionsController',
    action: 'list',
    skipAssets: true,
    cors: {
      origin: '*',
      headers: 'Origin, X-Requested-With, Content-Type, Accept',
      credentials: true
    }
  },
  '/api/solutions/set-param/:solution': {
    controller: 'SolutionsController',
    action: 'setParam',
    skipAssets: true,
    cors: {
      origin: '*',
      headers: 'Origin, X-Requested-With, Content-Type, Accept',
      credentials: true
    }
  },
  '/api/solutions/get-params/:solution': {
    controller: 'SolutionsController',
    action: 'getParams',
    skipAssets: true,
    cors: {
      origin: '*',
      headers: 'Origin, X-Requested-With, Content-Type, Accept',
      credentials: true
    }
  },
  //*********

  //Leads
  '/api/contacts/add/:solution': {//front
    controller: 'LeadsController',
    action: 'add',
    skipAssets: true,
    cors: {
      origin: '*',
      headers: 'Origin, X-Requested-With, Content-Type, Accept',
      credentials: true
    }
  },
  '/api/leads/list/:solution': {
    controller: 'LeadsController',
    action: 'list',
    skipAssets: true,
    cors: {
      origin: '*',
      headers: 'Origin, X-Requested-With, Content-Type, Accept',
      credentials: true
    }
  },
  //*****

  //Contacts
  '/api/contacts/list/:solution': {
    controller: 'SolutionContactsController',
    action: 'list',
    skipAssets: true,
    cors: {
      origin: '*',
      headers: 'Origin, X-Requested-With, Content-Type, Accept',
      credentials: true
    }
  },
  '/api/contacts/update/:contact': {
    controller: 'SolutionContactsController',
    action: 'update',
    skipAssets: true,
    cors: {
      origin: '*',
      headers: 'Origin, X-Requested-With, Content-Type, Accept',
      credentials: true
    }
  },
  //********

  //Fields
  '/api/fields/list/:solution': {
    controller: 'SolutionFieldsController',
    action: 'list',
    skipAssets: true,
    cors: {
      origin: '*',
      headers: 'Origin, X-Requested-With, Content-Type, Accept',
      credentials: true
    }
  },
  '/api/fields/set-params/:field': {
    controller: 'SolutionFieldsController',
    action: 'setParams',
    skipAssets: true,
    cors: {
      origin: '*',
      headers: 'Origin, X-Requested-With, Content-Type, Accept',
      credentials: true
    }
  },
  //******

  //Values
  '/api/values/update/:field': {
    controller: 'SolutionFieldValuesController',
    action: 'update',
    skipAssets: true,
    cors: {
      origin: '*',
      headers: 'Origin, X-Requested-With, Content-Type, Accept',
      credentials: true
    }
  },
  '/api/values/list/:field': {
    controller: 'SolutionFieldValuesController',
    action: 'list',
    skipAssets: true,
    cors: {
      origin: '*',
      headers: 'Origin, X-Requested-With, Content-Type, Accept',
      credentials: true
    }
  },
  //******
};
