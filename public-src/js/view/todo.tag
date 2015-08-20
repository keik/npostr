<todo>
  <section id="todoapp">
    <header id="header">
      <h1>todos</h1>
      <input id="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?" onkeyup={ addTodo }>
    </header>
    <section id="main">
      <ul id="todo-list">
        <todoitem each={ t, i in todos } data={ t } parentview={ parent }></todoitem>
      </ul>
    </section>
    <footer>
      <button onclick={ clearTodos }>clear all items</button>
    </footer>
  </section>

  <script>
    var self = this
    var todosStore = opts.store
    var d = require('./util').d('[v] todo')

    self.todos = opts.data || []

    riot.route.exec(function(base, filter) {
      self.activeFilter = filter || 'all'
    })

    self.on('update', function() {
      d('#self.update')
      self.saveTodos()
    })

    saveTodos() {
      d('#saveTodos')
      todosStore.save(self.todos)
      self.update()
    }

    addTodo(e) {
      d('#addTodo')
      if (e.which == 13) {
        var value = e.target.value && e.target.value.trim()
        if (!value) {
          return
        }
        self.todos.push({title: value, selected: false})
        e.target.value = ''
      }
    }

    clearTodos() {
      self.todos = []
      self.saveTodos()
    }
  </script>
</todo>

<todoitem>
  <li class="todo {selected: todo.selected}">
    <div class="view">
      <input class="toggle" type="checkbox" checked={ todo.selected } onclick={ selectTodo }>
      <label>{ todo.title }</label>
    </div>
  </li>
  <script>
    var self = this
    var d = require('./util').d('[v] todoitem')

    self.todo = opts.data
    self.parentview = opts.parentview

    selectTodo(e) {
      d('#selectTodo')
      self.todo.selected = !self.todo.selected
      self.parentview.saveTodos()
      return true
    }

    self.on('update', function() {
      d('#update')
      if (self.editing) {
        self.parentview.update()
        self.todoeditbox.focus()
      }
    })
  </script>
</todoitem>
