import styled, { keyframes } from "styled-components";

export const Typography = styled.div`
  font-family: Roboto;
`;
export const BasicFlex = Typography.extend`
  display: flex;
  padding: 5px;
`;
export const BG = styled.div`
  background: #e6ecf0;
`;

export const CheckBox = styled.input.attrs({
  type: "checkbox",
  margin: "10px"
})`
  visibility: hidden;
  background: #c5c5c5;
  :hover {
    background: "#1da1f2";
  }
`;

export const FileInput = styled.input.attrs({
  type: "file"
})`
  color: black;
  width: 500px;
  position: relative;
  display: inline-block;
  padding: 4px 7px;
  min-height: 28px;
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
  resize: none;

  ::-webkit-file-upload-button {
    visibility: hidden;
  }
  :before {
    content: "Select File";
    color: rgb(255, 255, 255);
    background-color: rgb(3, 155, 229);
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
    transition-duration: 0.5s;
    transition-property: background-color, fill, color;
    padding-left: 16px;
    padding-right: 16px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    display: inline-block;
    position: relative;
    cursor: pointer;
    min-height: 36px;
    min-width: 88px;
    line-height: 36px;
    vertical-align: middle;
    align-items: center;
    text-align: center;
    border-radius: 2px;
    box-sizing: border-box;
    outline: none;
    border: 0;
    padding: 0 6px;
    margin: 6px 8px;
    letter-spacing: 0.01em;
    white-space: nowrap;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 14px;
    font-style: inherit;
    font-variant: inherit;
    font-family: inherit;
    text-decoration: none;
    overflow: hidden;
    :active {
      outline: 0;
      ::before {
        background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
      }
    }
  }
`;
export const colorAr = [
  "#BA68C8",
  "#81D4FA",
  "#FF7043",
  "#8BC34A",
  "#011100",
  "#E57373",
  "#EF6C00",
  "#455A64",
  "#40a5ed",
  "#6D4C41"
];
export function getColor(index, colorAr) {
  return colorAr[index % colorAr.length];
}
export const WideTitle = styled.h3`
  display: flex;
  align-content: center;
  font-weight: 200;
  font-family: Raleway;
  padding-left: 30px;
  background-color: lightgrey;
  height: 50px;
  align-items: center;
  width: 90%;
  padding-right: 30px;
`;

export const Divider = styled.hr`
  margin: -1px 0px 0px 72px;
  height: 1px;
  border: none;
  background-color: rgb(224, 224, 224);
  display: block;
  unicode-bidi: isolate;
  -webkit-margin-before: 0.5em;
  -webkit-margin-after: 0.5em;
  -webkit-margin-start: auto;
  -webkit-margin-end: auto;
  overflow: hidden;
  border-style: inset;
  border-width: 1px;
`;

export const Title = styled.h3`
  font-weight: 200;
  font-family: Raleway;
  padding-left: 30px;
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const HeaderLeft = styled.div`
  display: flex;
  flex-grow: 5;
`;

export const HeaderRight = styled.div``;

export const niceblue = "#40a5ed";
export const babyblue = "#ecf6fd";
export const twitterblue = "#1da1f2";
export const Input = styled.input`
  position: relative;
  display: inline-block;
  padding: 4px 7px;
  margin: 8px;
  width: ${props => (props.width ? props.width : "200px")};
  min-height: 28px;
  font-size: 1em;
  line-height: 1.5;
  font-family: "Segoe UI", Roboto;
  color: ${props => (props.color ? props.color : "rgba(0, 0, 0, 0.65)")};
  background-color: ${props => (props.background ? props.background : "#fff")};
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  resize: none;
`;
export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;
export const TextArea = Input.withComponent("textarea");
export const ViewText = Input.withComponent("div");

export const Button = styled.a`
  display: inline-block;
  min-width: 150px;
  width: ${props => (props.width ? props.width : "150px")};
  height: 40px;
  padding: 4px 7px;
  cursor: pointer;
  font-weight: 500;
  border-radius: 4px;
  border: 1px solid
    ${props => (props.bordercolor ? props.bordercolor : props.color ? props.color : niceblue)};
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

export const HR = styled.hr`
  margin: -1px 0px 0px;
  height: 1px;
  border: none;
  color: black;
  background-color: rgb(224, 224, 224);
  display: block;
  unicode-bidi: isolate;
  -webkit-margin-before: 0.5em;
  -webkit-margin-after: 0.5em;
  -webkit-margin-start: auto;
  -webkit-margin-end: auto;
  overflow: hidden;
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
  font-size: 1.1em;
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
  color: black;
  background-color: rgb(127, 186, 219);
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  box-sizing: border-box;
  font-family: Roboto, sans-serif;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 30px, rgba(0, 0, 0, 0.23) 0px 6px 10px;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 18%;
  margin: 5px;
  min-width: 200px;
}
`;

export const Papier1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgb(255, 255, 255);
  background-color: ${props => (props.color ? props.color : "white")});
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

export const UserName = BasicFlex.extend`
  font-size: 16px;
`;

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

const rotate360 = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;

export const Loading = styled.div`
  animation-duration: 0.75s;
  animation-iteration-count: infinite;
  animation-name: ${rotate360};
  animation-timing-function: linear;
  height: 30px;
  width: 30px;
  border: 8px solid #ffffff;
  border-right-color: blue;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  top: 10%;
  right: 0;
  bottom: 0;
  left: 0%;
  color: blue;
  margin-left: auto;
  margin-right: auto;
`;
