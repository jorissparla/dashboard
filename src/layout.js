import styled from 'styled-components';

const ContainerStyle=styled.div`
  display: flex;
  background-color: white;
`
const LeftPanelStyle= styled.div`
  flex: 1
`

const RightPanelStyle = styled.div`
  flex: 3;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: space-between;
  
`

const ItemStyle = styled.div`
border: 1px solid black;
  margin: 10px;
`

export { ContainerStyle, LeftPanelStyle, RightPanelStyle, ItemStyle};