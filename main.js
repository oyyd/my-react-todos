var TodoApp = React.createClass({
  deleteTodo:function(todoId){
    var todos = this.state.todos;
    for(var i in todos){
      if(todos[i].id===todoId){
        todos.splice(i,1);
        break;
      }
    }
    this.updateTodo(todos);
  },
  addNewTodo:function(newTodoText){
    var todos = this.state.todos;
    todos.push({
      id: this.currentId++,
      text: newTodoText
    });
    this.updateTodo(todos);
  },
  updateTodo:function(newTodos){
    this.setState({todos: newTodos});    
  },
  getInitialState:function(){
    this.currentId = 2;
    return {todos:[{
      id: 0,
      text: 'Clean house'
    }, {
      id: 1,
      text: 'Wash clothes'
    }]};
  },
  render:function(){
    return (
      <div class="my-todo">
        <NewTodo onAddTodo={this.addNewTodo}></NewTodo>
        <TodoList data={this.state.todos} deleteTodo={this.deleteTodo}></TodoList>
      </div>
    )
  }
});

var NewTodo = React.createClass({
  addTodo: function(){    
    var newTodoText = React.findDOMNode(this.refs.todoText).value;
    this.props.onAddTodo(newTodoText);
    React.findDOMNode(this.refs.todoText).value = '';
  },
  render: function(){
    return (
      <div>
        <input type="text" ref="todoText" />
        <button type="button" onClick={this.addTodo}>submit</button>
      </div>
    )    
  }
});

var TodoList = React.createClass({
  render:function(){
    var that = this;
    var todos = null;
    if(this.props.data){
      todos = this.props.data.map(function(todo){
        return (
          <Todo deleteTodo={that.props.deleteTodo} todoText={todo.text} todoId={todo.id}></Todo>
        )
      });
    }
    return (
      <div>
        {todos}
      </div>
    )
  }
});

var Todo = React.createClass({
  getInitialState: function(){
    return {
      currentText: this.props.todoText
    }
  },
  openEdit: function(){
    React.findDOMNode(this.refs.input).style.display = 'inline-block';
    React.findDOMNode(this.refs.text).style.display = 'none';
  },
  deleteThis: function(){
    this.props.deleteTodo(this.props.todoId);
  },
  style: {
    display: 'none'
  },
  render: function(){
    return (
      <div>
        <span ref="text" onClick={this.openEdit}>{this.props.todoText}</span>
        <input type="text" ref="input" value={this.state.currentText} style={this.style}/>
        <button onClick={this.deleteThis}>X</button>        
      </div>
    )
  }
});

React.render(
  <TodoApp />,
  document.getElementById('content')
);