define(['namespace', 'backbone', 'config', 'utils', 'moment', 'domReady!'],
    function(NameSpace, Backbone, Config, Utils, moment, DOM) {

        var TodoItem = Backbone.Model.extend({
            defaults:{
                '_id' : null,
                name: 'New Task',
                dueDate: new Date(),
                notes: 'task Notes',
                comments: [
                    {
                        body: 'First!',
                        author: 'annoying person',
                        iconUrl : 'https://placehold.it/128x128',
                        postTime:  new Date()
                    }
                ]
            },
            idAttribute: '_id',
            initialize: function(){
                return this;
            },
            getFormattedDueTime : function(){
                return moment(this.get('dueDate')).format('h:mm A');
            },
            getFormattedDueDay : function(){
                return moment(this.get('dueDate')).format('MMM D, YYYY');

            }
        });

        NameSpace.TodoItem = TodoItem;
        return NameSpace.TodoItem;
    });