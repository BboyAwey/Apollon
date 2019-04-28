import styled from 'styled-components';

export const Container = styled.aside`
  flex: 0 0 230px;
  padding: 0 10px;
  height: 100%;
  min-height: inherit;
  max-height: inherit;
  overflow: auto;
  display: flex;
  flex-direction: column;
  border: 1px solid ${props => props.theme.color.gray500};
  margin-right: 10px;
`;

export const Preview = styled.div`
  margin: 0.5em 0;
`;
