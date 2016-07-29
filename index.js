/*eslint-disable*/
var form = require('inquirer').createPromptModule();
var fs = require('promisify-fs');

//global context
var context = null;

module.exports = exports = function init(params, options) {
  //init plugin
  context = this;

  //invoke the initor specified by user.
  if (params && params.length) {
    var initor = params[0];
    return context.call('init-' + initor);
  }

  //selects
  return form({
      message: 'Which project are you going to start?',
      type: 'list',
      name: 'project_type',
      choices: function () {
        return fs
          .getModulePackInfo(module)
          .get('wbp_init_projects')
          .then(function (projects) {
            return projects && projects.map(function (project) {
              return project.name
            })
          })
      }
    })
    .then(function (answers) {
      context.call('init-' + answers.project_type.toLowerCase());
    })
};

