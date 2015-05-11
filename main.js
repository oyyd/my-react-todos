var TodoApp = React.createClass({
  addNewTodo:function(newTodoText){
    var todos = this.state.todos;
    todos.push(newTodoText);
    this.setState({todos: todos});
  },
  getInitialState:function(){
    return {todos:['Clean house', 'wash clothes']};
  },
  render:function(){
    return (
      <div class="my-todo">
        <NewTodo onAddTodo={this.addNewTodo}></NewTodo>
        <TodoList data={this.state.todos}></TodoList>
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
    var todos = this.props.data.map(function(todo){
      return (
        <Todo todoText={todo} ></Todo>
      )
    });
    return (
      <div>
        {todos}
      </div>
    )
  }
});

var Todo = React.createClass({  
  render: function(){
    return (
      <div>
        <span>{this.props.todoText}</span>
      </div>
    )
  }
});

React.render(
  <TodoApp />,
  document.getElementById('content')
);