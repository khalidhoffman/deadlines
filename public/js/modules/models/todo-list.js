

define(['namespace', 'backbone', 'config', 'utils', './todo-item', 'domReady!'],
    function(NameSpace, Backbone, Config, Utils, TodoItem, DOM) {
        var TodoList = Backbone.Collection.extend({
            model : TodoItem,
            defaults : {
                isSortAscending : false
            },
            initialize : function(){
                var self = this;
                this.fetch({
                    success : function(collection, response, options){
                        self.trigger('initialized');
                        self.isInitialized = true;
                    }
                });
                this.on('change:name change:dueDate', function(){
                    this.sort();
                });
                return this;
            },
            isInitialized : false,
            url : '/tasklist',
            comparator : 'dueDate',
            log : function(){
                console.log(arguments);
            }
        });

        NameSpace.TodoList =  new TodoList();
        return NameSpace.TodoList;
    });