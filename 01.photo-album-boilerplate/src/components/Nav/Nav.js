import React from 'react';
import { Header, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const menuItems = [
  {
    name: 'albums',
    position: undefined,
  },
  {
    name: 'photos',
    position: undefined,
  },
  {
    name: 'login',
    position: 'right',
  },
];

class Nav extends React.Component {
  renderMenuItem = (item) => {
    return (
      <Menu.Item
        {...item}
        key={item.name}
        as={NavLink}
        to={`/${item.name}`}
      />
    );
  }

  render() {
    return (
      <Menu tabular>
        <Menu.Item>
          <Header 
            as="h3" 
            icon="camera retro" 
            floated="right" 
          />
        </Menu.Item>
        {
          Object.keys(menuItems)
          .map(index => {
            return this.renderMenuItem(menuItems[index]);
          })
        }
      </Menu>
    );
  }
}

export default Nav;