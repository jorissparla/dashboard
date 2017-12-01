import React from "react";
import { gql, graphql } from "react-apollo";
import axios from "axios";

class ImageConvert extends React.Component {
  state = { currentuser: "" };
  convertImage = async ({ image, navid, lastname }) => {
    //await axios.put("http://localhost:3333").then(res => console.log(res));
    if (image) {
      let base64Image = image.split(";base64,").pop();
      console.log(lastname);
      axios
        .post("http://localhost:3333", { navid, lastname, image: base64Image })
        .then(res => console.log(res))
        .catch(e => console.log(e));
    }
  };

  doConvert = accounts => {
    accounts.map(account => this.convertImage(account));
  };
  render() {
    const { data: { accounts, loading } } = this.props;

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
  query accounts {
    accounts {
      navid
      lastname
      image
    }
  }
`;
export default graphql(imageQuery)(ImageConvert);
