import React from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';

interface Popup {}

const Popup = ({}: Popup) => {
  return <PopupWrapper>Hey there</PopupWrapper>;
};

const PopupWrapper = styled.div`
  height: 50px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

render(<Popup />, document.getElementById('root'));
