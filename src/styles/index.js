import styled from "styled-components";

export const Typography = styled.div`font-family: Roboto;`;
export const BasicFlex = Typography.extend`
  display: flex;
  padding: 5px;
`;
export const BG = styled.div`background: #e6ecf0;`;

export const niceblue = "#40a5ed";
export const babyblue = "#ecf6fd";
export const twitterblue = "#1da1f2";
export const Input = styled.input`
  position: relative;
  display: inline-block;
  padding: 4px 7px;
  margin: 8px;
  width: ${props => (props.width ? props.width : "200px")};
  height: 28px;
  font-size: 1em;
  line-height: 1.5;
  font-family: "Segoe UI", Roboto;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
`;
export const Button = styled.a`
  display: inline-block;
  min-width: 150px;
  width: ${props => (props.width ? props.width : "150px")}
  height: 40px;
  padding: 4px 7px;
  cursor: pointer;
  font-weight: 500;
  border-radius: 4px;
  border: 1px solid ${props => (props.color ? props.color : niceblue)};
  text-decoration: none;
  color: ${props => (props.color ? props.color : niceblue)};
  font-family: "Segoe UI", Roboto;
  font-size: 1em;
  background: transparent;
  -webkit-transition: all 0.45s;
  transition: all 0.45s;
  text-align: center;
  line-height: 36px;
  margin: 8px;

  :hover {
    background: ${props => (props.color ? props.color : niceblue)};
    color: white;
  }
`;
export const PrimaryButton = styled.a`
  display: inline-block;
  min-width: 150px;
  width: ${props => (props.width ? props.width : "150px")}
  height: 40px;
  padding: 4px 7px;
  cursor: pointer;
  font-weight: 500;
  border-radius: 4px;
  border: 1px solid ${props => (props.color ? props.color : niceblue)};
  text-decoration: none;
  background: ${props => (props.color ? props.color : niceblue)};
  color: white;
  font-family: "Segoe UI", Roboto;
  font-size: 1em;
  -webkit-transition: all 0.45s;
  transition: all 0.45s;
  text-align: center;
  line-height: 36px;
  margin: 8px;


`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
export const Papier = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgb(255, 255, 255);
  background-color: rgb(255, 255, 255);
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  box-sizing: border-box;
  font-family: Roboto, sans-serif;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px;
  border-radius: 2px;
  width: 30%;
  padding: 20px;
  min-width: 300px;
  margin-top: 40px;
  margin-left: 20px;
  text-align: left;
`;
export const Avatar = styled.img`
  border-radius: 50%;
  width: 64px;
  height: 64px;
  padding: 5px;
  justify-content: center;
  margin-left: 10px;
  overflow: hidden;
`;

export const UserName = BasicFlex.extend`font-size: 16px;`;

export const AlertBox = Typography.extend`
  padding: 16px 16px 16px 60px;
  position: relative;
  border-radius: 4px;
  color: rgba(0,0,0,.65);
  line-height: 1.5;
  border: 1px solid #d2eafb;
  background-color: #ecf6fd;
  position: relative;
  padding: 8px 48px 8px 38px;
  border-radius: 4px;
  color: rgba(0,0,0,.65);
  font-size: 12px;
  line-height: 1.5;
}`;

//export const Spinner = () => <WaveLoading />;
export const H1 = styled.h1`
  font-weight: 300;
  font-family: Roboto;
`;

export const Pop = BasicFlex.extend`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 15px 20px;
  color: hsla(0, 0%, 93%, 1);
  text-shadow: -1px -1px 0 hsla(0, 0%, 0%, 0.7);
  background: hsla(0, 0%, 0%, 0.85);
  border-radius: 4px;
  border: solid 1px hsla(0, 0%, 20%, 1);
  box-shadow: 1px 1px 3px hsla(0, 0%, 0%, 0.7);
`;
export const Pop2 = BasicFlex.extend`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 5px 10px;
  color: hsla(0, 0%, 93%, 1);
  text-shadow: -1px -1px 0 hsla(0, 0%, 0%, 0.7);
  background: hsla(0, 0%, 0%, 0.85);
  border-radius: 4px;
  border: solid 1px hsla(0, 0%, 20%, 1);
  box-shadow: 1px 1px 3px hsla(0, 0%, 0%, 0.7);
  :after {
    position: absolute;
    right: 5px;
    top: -5px;
    content: "";
    display: block;
    border-bottom: solid 5px hsla(0, 0%, 0%, 0.85);
    border-left: solid 5px transparent;
    border-right: solid 5px transparent;
  }
`;
export const Sym = styled.span`
  font-size: 24px;
  position: absolute;
  right: 16px;
  top: 10px;
  color: rgba(0, 0, 0, 0.43);
  outline: none;
  text-decoration: none;
  transition: delay 1s;
  :hover {
    color: blue;
    cursor: pointer;
  }
`;

export const NotificationMsg = Typography.extend`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 4px;
  line-height: 20px;
  display: inline-block;
`;

export const NotificationText = Typography.extend`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.65);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  color: rgb(255, 255, 255);
  background-color: rgb(255, 255, 255);
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  box-sizing: border-box;
  font-family: "Segoe UI", Roboto;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px;
  border-radius: 2px;
  width: ${props => (props.width ? props.width : "50%")};
  padding: 20px;
  min-width: 300px;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
`;

export const Error = styled.div`
  display: flex;
  color: ${props => (props.color ? props.color : "red")};
  border: solid 1px ${props => (props.color ? props.color : "red")};
  border-radius: 5px;
  padding: 20px;
`;
export const Message = styled.div`
  display: flex;
  color: ${props => (props.color ? props.color : "red")};
  border-radius: 5px;
  padding: 20px;
`;
/*
export const Notification = ({ title, text, onClose, show }) => {
  if (!show) return <div />;
  return (
    <Pop>
      <Sym onClick={() => setTimeout(onClose, 1000)}>×</Sym>
      <NotificationMsg>{title}</NotificationMsg>
      <NotificationText>{text}</NotificationText>
    </Pop>
  );
};
*/
