'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');
var shelljs = require('shelljs');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

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
      name: 'addSidekiq',
      message: 'Would you like to enable sidekiq?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.enableSidekiq = props.addSidekiq;

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
          this.destinationPath(files[i])
        );
      }
    },
    directories: function() {
      var dirs = ['app', 'config', 'db', 'lib', 'log', 'spec', 'vendor', 'public'];
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
      var files = ['app.rb', 'config.ru', 'Gemfile', 'Procfile', 'Rakefile', 'README.md'];
      var i = 0;
      for(i; i < files.length; i++){
        this.fs.copy(
          this.templatePath(files[i]),
          this.destinationPath(files[i])
        );
      }
    }
  },

  install: function () {
    this.installDependencies();
  }
});
