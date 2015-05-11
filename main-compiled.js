var TodoApp = React.createClass({displayName: "TodoApp",
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
      React.createElement("div", {class: "my-todo"}, 
        React.createElement(NewTodo, {onAddTodo: this.addNewTodo}), 
        React.createElement(TodoList, {data: this.state.todos})
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
    var todos = this.props.data.map(function(todo){
      return (
        React.createElement(Todo, {todoText: todo})
      )
    });
    return (
      React.createElement("div", null, 
        todos
      )
    )
  }
});

var Todo = React.createClass({displayName: "Todo",  
  render: function(){
    return (
      React.createElement("div", null, 
        React.createElement("span", null, this.props.todoText)
      )
    )
  }
});

React.render(
  React.createElement(TodoApp, null),
  document.getElementById('content')
);
