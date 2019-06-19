import styled from "styled-components";
export const Container = styled.div`
  display: flex;
  margin-top: 5rem;
  @media (max-width: 500px) {
    background: palevioletred;
    flex-direction: column;
  }
`;
export const Article = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 5px;
  background: white;
  margin: 1rem;

  min-width: 400px;
  padding-bottom: 2rem;
`;
export const Image = styled.div`
  width: 100%;
  height: 14rem;
  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export const Padded = styled.div`
  padding: 1rem;
`;
export const Footer = styled.div`
  padding: 1rem;
  align-items: flex-end;
`;
export const H1 = styled.h1`
  font-size: 1.25rem;
  margin: 0.5rem 0;
  font-family: "Roboto Slab", sans-serif;
`;
export const Header = styled(Padded)`
  height: 120px;
`;
export const H2 = styled.h2`
  font-size: 1rem;
  color: #808080;
  margin: 0.5rem 0;
`;
export const P = styled.p`
  font-size: 1.25rem;
  margin: 0;
`;
