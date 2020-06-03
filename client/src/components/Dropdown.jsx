import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  min-height: 38px;
  flex-wrap: wrap;
`;

const Header = styled.div`
  border: 1px solid black;
  padding: 10px;
  width: 50%;
  border-radius: 2px;
`;

const HeaderTitle = styled.div``;

const List = styled.ul`
  margin: 10px -10px -10px -10px;
  padding: 0;
`;

const Item = styled.li`
  list-style: none;
  background: #f2f2f2;
  padding: 10px;
  &:hover {
    background: gray;
  }
`;

export default ({ title, items }) => {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const [itemName, setItemName] = useState(title);

  const toggle = () => setOpen(!open);

  const handleOnClick = item => {
    setItemName(item.name);

    if (!selection.some(current => current.id === item.id)) {
      setSelection([item]);
    } else {
      let selectionAfterRemoval = selection;
      selectionAfterRemoval = selectionAfterRemoval.filter(current => current.id !== item.id);
      setSelection([...selectionAfterRemoval]);
    }
  };

  const isItemInSelection = item => {
    if (selection.some(current => current.id === item.id)) {
      return true;
    }
    return false;
  };

  return (
    <Wrapper>
      <Header
        tabIndex={0}
        className="dd-header"
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        <HeaderTitle>{itemName}</HeaderTitle>
        {open && (
          <List>
            {items.map(item => (
              <Item onClick={() => handleOnClick(item)} key={item.value} value={item.value}>
                {item.name}
              </Item>
            ))}
          </List>
        )}
      </Header>
    </Wrapper>
  );
};
