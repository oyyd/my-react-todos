var TodoApp = React.createClass({displayName: "TodoApp",
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
      React.createElement("div", {class: "my-todo"}, 
        React.createElement(NewTodo, {onAddTodo: this.addNewTodo}), 
        React.createElement(TodoList, {data: this.state.todos, deleteTodo: this.deleteTodo})
      )
    )
  }
});

var NewTodo = React.createClass({displayName: "NewTodo",
  addTodo: function(){    
    var newTodoText = React.findDOMNode(this.refs.todoText).value;
    this.props.onAddTodo(newTodoText);
    React.findDOMNode(this.refs.todoText).value = '';
  },
  render: function(){
    return (
      React.createElement("div", null, 
        React.createElement("input", {type: "text", ref: "todoText"}), 
        React.createElement("button", {type: "button", onClick: this.addTodo}, "submit")
      )
    )    
  }
});

var TodoList = React.createClass({displayName: "TodoList",
  render:function(){
    var that = this;
    var todos = null;
    if(this.props.data){
      todos = this.props.data.map(function(todo){
        return (
          React.createElement(Todo, {deleteTodo: that.props.deleteTodo, todoText: todo.text, todoId: todo.id})
        )
      });
    }
    return (
      React.createElement("div", null, 
        todos
      )
    )
  }
});

var Todo = React.createClass({displayName: "Todo",
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
      React.createElement("div", null, 
        React.createElement("span", {ref: "text", onClick: this.openEdit}, this.props.todoText), 
        React.createElement("input", {type: "text", ref: "input", value: this.state.currentText, style: this.style}), 
        React.createElement("button", {onClick: this.deleteThis}, "X")
      )
    )
  }
});

React.render(
  React.createElement(TodoApp, null),
  document.getElementById('content')
);
