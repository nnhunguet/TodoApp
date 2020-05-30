import React, { Component } from 'react';
import './TodoItem.css';
import classNames from 'classnames'


class TodoItem extends Component {
  render() {
    const { item, onClick, index } = this.props;
    let className = classNames('TodoItem', {'TodoItem-isDone': item.isDone});
    return (
      <div className={className}>
        <span>0{index}.</span>
        <p onClick={onClick}>{item.title}</p>
      </div>
    )
  }
}

export default TodoItem