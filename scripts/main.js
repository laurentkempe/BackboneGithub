(function() {

    window.Dashboard = {
        Models: {},
        Collections: {},
        Views: {},
        Routes: {}
    };

    window.template = function(id) {
        return _.template( $('#' + id).html() );
    };

    Dashboard.Routes.AppRouter = Backbone.Router.extend({
        routes: {
            "for/:username": "forUsername"
        }
    });

    Dashboard.Models.User = Backbone.Model.extend({
        url : function(){
            return "https://api.github.com/users/" + this.get('username');
        },

        joinedDate : function(){
            return new Date(this.get('created_at')).toDateString();
        }
    });

    Dashboard.Views.User = Backbone.View.extend({
        tagName : 'div',

        template: template('userTemplate'),

        render: function() {
            var template = this.template( this.model.toJSON() );
            this.$el.html(template);
            return this;
        }
    });

    var user = new Dashboard.Models.User({username: "laurentkempe"});

    var app_router = new Dashboard.Routes.AppRouter();
    app_router.on('route:forUsername', function (username) {
        user.set('username', username);
    });

    Backbone.history.start();

    var userView = new Dashboard.Views.User({model : user});

    user.fetch({
        success: function (user) {
            $('.user').html(userView.render().el);
        }
    });

})();