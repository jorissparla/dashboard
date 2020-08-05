import React from "react";
import gql from "graphql-tag";
import { graphql } from "@apollo/client/react/hoc";
import axios from "axios";

class ImageConvert extends React.Component {
  state = { currentuser: "" };

  convertImage = async ({ image, navid, lastname }) => {
    axios.defaults.maxContentLength = 10000;
    //await axios.put("http://localhost:3333").then(res => console.log(res));
    if (image) {
      let base64Image = image.split(";base64,").pop();
      console.log(lastname);
      let name = navid + "." + lastname;
      axios
        .post("http://localhost:3333/upload", { name, image: base64Image })
        .then((res) => console.log(res))
        .catch((e) => console.log("Error:", e));
    }
  };

  doConvert = (accounts) => {
    accounts.map((account) => this.convertImage(account));
  };
  render() {
    const {
      data: { accounts, loading },
    } = this.props;

    if (loading) return <div>Loading</div>;
    console.log("accounts", accounts);
    return (
      <div>
        <div>Accounts loaded </div>
        <button onClick={() => this.doConvert(accounts)}>Go</button>
        {this.state.currentuser}
      </div>
    );
  }
}

const imageQuery = gql`
  query accounts1 {
    accounts {
      navid
      lastname
      image
    }
  }
`;
export default graphql(imageQuery)(ImageConvert);
