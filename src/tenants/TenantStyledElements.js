import styled from 'styled-components';
export const Article = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 2px 2px 8px 10px rgba(0, 0, 0, 0.26);
  margin: 1px;
  background: white;
  padding: 1rem;
`;
export const Main = styled.div`
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0; */
  display: flex;
`;
export const Left = styled.div`
  width: ${props => (props.on ? '90vw' : '100vw')};
`;
export const Right = styled.div`
  width: ${props => (props.on ? '10vw' : '0')};
`;
export const Header = styled.div`
  display: flex;
`;
export const H2 = styled.h2`
  letter-spacing: 0.2rem;
  font-size: 1.3rem;
  color: rgba(0, 0, 0, 0.87);
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  line-height: 1.33;
`;
export const TextSpan = styled.span`
  padding-top: 2px;
  margin-left: 10px;
  margin-right: 10px;
`;
