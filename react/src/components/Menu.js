import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Menu, Segment } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';

const MenuExampleSizeLarge = () => {
  const setItem = useSelector((state) => state.menu.select);
  const [activeItem, setActiveItem] = useState('SOTI');
  const dispatch = useDispatch();

  const handleItemClick = (name) => {
    setActiveItem(name);
    console.log(name);
    dispatch({ type: 'MENU_ITEM', payload: name });
  };

  useEffect(() => {
    setActiveItem(setItem);
  }, [setItem]);

  const test = () => {
    console.log(setItem);
    console.log(activeItem);
  };
  

  return (
    <Segment inverted style={{ marginBottom: '0', borderRadius: '0' }}>
      <Menu size='large' inverted pointing secondary>
        <a href='/'>
          <Menu.Item
            name='SOTI'
            active={activeItem === 'SOTI'}
            onClick={() => {
              handleItemClick('SOTI');
            }}
          />
        </a>
        <a href='/board'>
          <Menu.Item
            name='게시판'
            active={activeItem === '게시판'}
            onClick={() => {
              handleItemClick('게시판');
              console.log(setItem);
            }}
          />
        </a>
        <button onClick={test}>test</button>
        <Menu.Menu position='right'>
          <Menu.Item>
            <a href='/SignUp'>
              <Button className='ui secondary button'>Sign Up</Button>
            </a>
          </Menu.Item>

          <Menu.Item>
            <a href='/SignIn'>
              <Button className='ui secondary button'>Sign In</Button>
            </a>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Segment>
  );
};

export default MenuExampleSizeLarge;
