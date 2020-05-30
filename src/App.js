import React, { Component } from 'react';
import './App.css';
import classNames from 'classnames';
import TodoItem from './components/TodoItem'

import { ReactComponent as Four} from './icons/four.svg';
import { ReactComponent as Internet} from './icons/internet.svg';
import { ReactComponent as Battery} from './icons/battery.svg';
import { ReactComponent as Background} from './icons/background.svg';
import { ReactComponent as Menu} from './icons/menu.svg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      content: '',
      newItem: false,
      items: [
        { 
          title: 'Mua bim bim',
          isDone: true
        },
        { 
          title: 'Đi đá bóng',
          isDone: false
        },
        { 
          title: 'Đi đổ xăng',
          isDone: false
        },
        {
          title: 'Ngồi học code',
          isDone: true
        }
      ]
    };

    this.onKeyUp = this.onKeyUp.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
    this.onAddNewItem = this.onAddNewItem.bind(this);
    this.handleClickNewItem = this.handleClickNewItem.bind(this);
  }

  onClickItem(item) {
    return (event) => {
      const isDone = item.isDone;
      const { items } = this.state;
      const index = items.indexOf(item);
      this.setState( 
        {
          items: [
            ...items.slice(0, index),
            {
              ...item,
              isDone: !isDone
            },
            ...items.slice(index + 1)
          ]
        }
      )
    }
  };

  onKeyUp(event) {
    
    let text = event.target.value;
    if(!text) {
      return;
    }

    text = text.trim();
    if(!text) {
      return;
    }

    if(event.keyCode === 13) {
      
      event.target.value = '';
    };
  }

  addNewItem() {
    this.setState({
      newItem: !this.state.newItem
    })
  }

  onAddNewItem(event) {
    const {items} = this.state;
    let title = event.target.value;

    this.setState({
      content: title
    }) 

    if(event.keyCode === 13) {
      this.setState({
        items: [
          ...items,
          {
            title: title,
            isDone: false
          }
        ],
        newItem: false
      })
    };
    
  }

  handleClickNewItem() {
    const {items} = this.state;
    this.setState({
      items: [
        ...items,
        {
          title: this.state.content,
          isDone: false
        }
      ],
      newItem: false,
      content: ''
    })
  }

  render() {
    const { items, newItem } = this.state;
    return (
      <div className={classNames('App', {'App-newItem': newItem})}>
        <header className='Header'>
          <div className='left-h header'>
            <div className='four'>
              <Four/>
            </div>
            <div className='internet'>
              <Internet/>
            </div>
          </div>
          <div className='center-h header'>
            <p>9:30 AM</p> 
          </div>
          <div className='right-h header'>
            <span>100%</span>
            <Battery className='battery'/>
          </div>
        </header>
        <section className='session-1'>
          <div className='wrap-1'>
            <Menu/>
            <h3>DAILIST</h3>
            <p></p>
          </div>
        </section>
        <container className={classNames({'hide': newItem}, 'container')}>
          {
            items.length > 0 ? 
              <>
                <div className='items-upcoming'>
                  <h3>UPCOMING</h3>
                  {items.filter( (item) => item.isDone === false ).map( 
                  (item) => 
                    <TodoItem item={item} index={items.indexOf(item) + 1} onClick={this.onClickItem(item)} key={items.indexOf(item)}/>
                  )}
                </div>
                <div className='finished'>
                  <h3>FINISHED</h3>
                  {items.filter( (item) => item.isDone === true ).map( 
                  (item) => 
                    <TodoItem item={item} index={items.indexOf(item) + 1} onClick={this.onClickItem(item)} key={items.indexOf(item)}/>
                  )}
                </div>
              </> : 
              <div>
                <Background className='background'/>
                <div className='notifications'>
                  <div className='title-1'>
                    <span>Seems like</span>
                  </div>
                  <div className='title-2'>
                    <span>You have no list</span>
                  </div>
                </div>  
              </div>
          }
        </container>
        <footer className='footer'>
          <div className='wrap-footer'>
            <button onClick={this.addNewItem}>+</button>
          </div>  
        </footer>
        {
          newItem ? 
            <div className='addNewItem'>
              <input type='text' placeholder='Add a new item' onKeyUp={this.onAddNewItem}/>
              <button onClick={this.handleClickNewItem}>ADD</button> 
            </div> : 
            null
        }
      </div>
    );
  }
}

export default App;
