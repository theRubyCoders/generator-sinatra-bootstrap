'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');
var shelljs = require('shelljs');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Hash to store user answers
    this.promptAnswers = {};

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the top-notch ' + chalk.red('SinatraBootstrap') + ' generator!'
    ));

    // Exit if Ruby dependencies aren't installed
    var dependenciesInstalled = ['bundle', 'ruby'].every(function (depend) {
      return shelljs.which(depend);
    });

    if (!dependenciesInstalled) {
      console.log('Looks like you\'re missing some dependencies.' +
        '\nMake sure ' + 'Ruby'.white + ' and the ' + 'Bundler gem'.white + ' are installed, then run again.');
      shelljs.exit(1);
    }

    var prompts = [{
      name: 'appName',
      message: 'What is your app\'s name ?'
    },{
      type: 'confirm',
      name: 'addDatabase',
      message: 'Would you like to enable database support?',
      default: true
    },{
      type: 'confirm',
      name: 'addBackgroundJobs',
      message: 'Would you like to enable background jobs support?',
      default: true
    },{
      type: 'confirm',
      name: 'addApi',
      message: 'Would you like to have API support?',
      default: true
    },{
      type: 'confirm',
      name: 'addHeroku',
      message: 'Would you like to have Heroku support?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.promptAnswers.appName = props.appName;
      this.promptAnswers.addDatabase = props.addDatabase;
      this.promptAnswers.addBackgroundJobs = props.addBackgroundJobs;
      this.promptAnswers.addApi = props.addApi;
      this.promptAnswers.addHeroku = props.addHeroku;

      done();
    }.bind(this));

    this.on('end', function () {
      shelljs.exec('bundle install');
    });
  },

  writing: {
    app: function () {
      var files = ['bower.json', 'package.json'];
      var i = 0;
      for(i; i < files.length; i++){
        this.fs.copyTpl(
          this.templatePath('_' + files[i]),
          this.destinationPath(files[i]),
          this.promptAnswers
        );
      }
    },
    directories: function() {
      var dirs = ['app', 'config', 'lib', 'log', 'spec', 'vendor', 'public'];
      var i = 0;
      for(i; i < dirs.length; i++){
        this.directory(
          this.templatePath(dirs[i]),
          this.destinationPath(dirs[i])
        );
      }
    },
    dotfiles: function () {
      var files = ['editorconfig', 'jshintrc', 'gitignore', 'ruby-version', 'bowerrc'];
      var i = 0;
      for(i; i < files.length; i++){
        this.fs.copy(
          this.templatePath(files[i]),
          this.destinationPath('.'+files[i])
        );
      }
    },
    projectfiles: function () {
      var files = ['app.rb'];
      var i = 0;
      for(i; i < files.length; i++){
        this.fs.copy(
          this.templatePath(files[i]),
          this.destinationPath(files[i])
        );
      }

      this.fs.copyTpl(
        this.templatePath('_Gemfile'),
        this.destinationPath('Gemfile'),
        this.promptAnswers
      );
      this.fs.copyTpl(
        this.templatePath('_Rakefile'),
        this.destinationPath('Rakefile'),
        this.promptAnswers
      );
      this.fs.copyTpl(
        this.templatePath('_config.ru'),
        this.destinationPath('config.ru'),
        this.promptAnswers
      );
      this.fs.copyTpl(
        this.templatePath('_config_environment.rb'),
        this.destinationPath('config/environment.rb'),
        this.promptAnswers
      );
      this.fs.copyTpl(
        this.templatePath('_README.md'),
        this.destinationPath('README.md'),
        this.promptAnswers
      );
    },
    addBackgroundJobsSupport: function () {
      if (!this.promptAnswers.addBackgroundJobs){
        return true;
      }

      this.fs.copy(
        this.templatePath('config_initializers_sidekiq.rb'),
        this.destinationPath('config/initializers/sidekiq.rb')
      );
      this.fs.copy(
        this.templatePath('config_sidekiq.yml'),
        this.destinationPath('config/sidekiq.yml')
      );
    },
    addDatabaseSupport: function () {
      if (!this.promptAnswers.addDatabase){
        return true;
      }

      this.directory(
        this.templatePath('db'),
        this.destinationPath('db')
      );
      this.directory(
        this.templatePath('app_models'),
        this.destinationPath('app/models')
      );
      this.fs.copyTpl(
        this.templatePath('config_database.yml'),
        this.destinationPath('config/database.yml'),
        this.promptAnswers
      );
    },
    addApiSupport: function () {
      if (!this.promptAnswers.addApi){
        return true;
      }

      this.directory(
        this.templatePath('spec_api'),
        this.destinationPath('spec/api')
      );
      this.directory(
        this.templatePath('app_api'),
        this.destinationPath('app/api')
      );
    },
    addHerokuSupport: function () {
      if (!this.promptAnswers.addHeroku){
        return true;
      }

      var files = ['Procfile', 'buildpacks'];
      var i = 0;
      for(i; i < files.length; i++){
        this.fs.copy(
          this.templatePath(files[i]),
          this.destinationPath(files[i])
        );
      }

      this.fs.copy(
        this.templatePath('config_unicorn.rb'),
        this.destinationPath('config/unicorn.rb')
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
