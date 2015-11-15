# <%= appName %>

To start you new application run on your terminal:

```sh
$ bundle exec shotgun
```

and you will be able to access you application under: http://localhost:9393/

<% if (addDatabase){ %>
## Database support

**It is important to update the credentials for establish the connection on config/database.yml**

#### Usage

You can create a migration:

```sh
$ bundle exec rake db:create_migration NAME=create_users
```

Now migrate the database:

```sh
$ bundle exec rake db:migrate
```

You can also write models:

```ruby
class User < ActiveRecord::Base
  validates_presence_of :name
end
```

For more information how to use it, visit: https://github.com/janko-m/sinatra-activerecord
<% } %>

<% if (addBackgroundJobs){ %>
## Background Jobs support

** Sidekiq needs redis to work, it is important to update the credentials for establish the connection with redis on config/initializers/sidekiq.rb**

usage:

The url route path for the sidekiq web console is:

  http://localhost:9393/sidekiq

And the workers directory is under lib directory

For more information how to use it, visit: https://github.com/mperham/sidekiq

<% } %>

<% if (addApi){ %>
## API support

usage:

This applicaiton implement an API grape application, to accees to the example endpoint visit:

   http://localhost:9393/api/v1/hello

For more information how to use it, visit: https://github.com/ruby-grape/grape#basic-usage
<% } %>

<% if (addHeroku){ %>
## Heroku support

The application is ready to push to heroku, it is important to follow the next instructions:

Requires a [Cedar-14](https://devcenter.heroku.com/articles/cedar-14-migration) stack.
Migrate to this stack prior to running.

Required is the [heroku-buildpack-multi](https://github.com/ddollar/heroku-buildpack-multi)
and the [heroku-buildpack-apt](https://github.com/ddollar/heroku-buildpack-apt)

Example usage - note the listed packages are required:

```shell
$ heroku create --stack cedar-14 --buildpack https://github.com/ddollar/heroku-buildpack-multi
```
<% } %>

## License
Please see License
