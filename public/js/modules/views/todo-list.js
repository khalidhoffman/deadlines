define(['namespace', 'backbone', 'config', 'utils', '../models/todo-list', './todo-item', 'domReady!','htmlSortable'],
    function(NameSpace, Backbone, Config, Utils, TodoList, TodoItemView, DOM){

        var TodoListView = Backbone.View.extend({
            initialize : function(){
                if (this.collection.isInitialized){
                    console.log('list initiated. rendering...');
                    this.hideLoadScreen();
                    this.render();
                } else{
                    console.warn('waiting for initialization');
                    this.listenTo(this.collection, 'initialized', function(){
                        this.hideLoadScreen();
                        this.render();
                    });
                }

                this.listenTo(this.collection, 'sync', function(){
                    Utils.makeToast('Synced');
                });

                this.listenTo(this.collection, 'sort render', function(){
                    this.render(arguments);
                });

                this.$list = this.$('#list');
                //this.$list.sortable();

                return this;
            },
            events : {
                'click .btn-add' : 'addItem'
            },
            log : function(){
                console.log.apply(null, arguments);
            },
            hideLoadScreen : function(){
                Backbone.$('body').addClass('initialized');
                //this.$el.resize();
                return this;
            },
            addItem : function(evt){
                if(evt && evt.preventDefault) evt.preventDefault();
                var newTask = this.collection.create();
                //var newTask = this.collection.create(),
                //    newTaskView = new TodoItemView( {
                //    model: newTask
                //} );
                //newTask.view = newTaskView;
                //this.$list.append(newTaskView.render().$el);
                //this.collection.sort();
                this.once('view:rendered', function(){
                    Utils.scrollTo(newTask.view.$el, {
                        offset : -12
                    });
                });
                return this;
            },
            render : function(){
                this.$list.html('');
                var container = document.createDocumentFragment(),
                    $container = Backbone.$(container),
                    self = this;

                _.forEach(this.collection.models, function(model, index, arr){
                    var newTaskView = new TodoItemView( {
                        model: model
                    } );
                    model.view = newTaskView;
                    if(Config.isSortAscending){
                        $container.append(newTaskView.render().$el);
                    } else{
                        $container.prepend(newTaskView.render().$el);
                    }
                });
                this.$list.prepend($container);
                this.trigger('view:rendered');
                return this;
            }
        });

        var el = DOM.getElementById('todo-list');
        NameSpace.TodoListView = (el)?NameSpace.TodoListView= new TodoListView({el:el, collection:TodoList}):TodoListView;
        return NameSpace.TodoListView;

    });