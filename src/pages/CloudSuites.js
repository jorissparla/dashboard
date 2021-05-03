import { useQuery } from "@apollo/client";
import TWButton from "elements/TWButton";
import React, { useEffect } from "react";
import { useUser } from "User";
import { hasPermissionEx } from "utils/hasPermission";
import Spinner from "utils/spinner";
import { QUERY_PRODUCTS_SUITES } from "../cloudsuite/graphql/Queries";
import { Block } from "../elements/Block";

export default function CloudSuites({ history }) {
  const { loading, data } = useQuery(QUERY_PRODUCTS_SUITES, {});

  const user = useUser();

  const permissions = user ? user.permissions || [] : [];

  useEffect(() => {
    // setProducts(data.products);
  }, [loading]);
  // console.log('object 👏👏', history, permissions, validAdmin);
  if (loading || !data) return <Spinner />;
  const { suites } = data;
  return (
    <div className="bg-gray-100 h-screen">
      <div className="flex flex-wrap mt-2">
        {suites.map((suite) => {
          //let prods = suite.products.map(prod => prod.product.name).join('-');
          //          let availableprods = products.filter(prod => !_.includes(prods, prod.name));
          // console.log('suite', suite.name, prods, availableprods);
          const suiteImage = suite.imageURL.replace("http:", "https:");
          return (
            <article className="flex flex-col justify-between shadow-xl rounded  bg-white m-4 min-h-80 w-1/4 pb-2" key={suite.id}>
              <div className="max-h-48 min-h-48 p-2 overflow-hidden">
                <div className="font-pop text-xl font-bold text-gray-600">{suite.name}</div>
                <div className="text-gray-500">{suite.description}</div>
              </div>
              <div className="h-28">
                <img className="w-full h-full object-cover" src={suiteImage} alt="CloudSuite" />
              </div>
              <div>
                <div className="bg-white p-2 flex flex-wrap">
                  {suite.products.map((prod) => (
                    <div className="flex  flex-wrap" title={prod.product.description} key={prod.product.id}>
                      <Block
                        key={prod.product.id}
                        selected={prod.product.type.toLowerCase() === "core"}
                        onClick={() => history.push(`/cloudsuites/product/${prod.product.id}`)}
                      >
                        {prod.product.name}
                      </Block>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-2">
                <TWButton
                  onClick={() =>
                    window.open(
                      "https://development.home.infor.com/pmprojects/Lists/Product%20Contacts%20List/All%20Contacts.aspx?mkt_tok=eyJpIjoiTldJMFlqRTJOamczWXpWbSIsInQiOiJaTjRzakE1VDI2ZFFha1d3eHFSdFdCKzRvSkFGUk5iaFNnQW1mZ3U4dHNXNllvZmJ0UlR1MnVTTk1raHZLXC9JRHFNV1g4a3lIU3JiXC9VYVwvT2k5V2thSU41TUtSSWhHRHVMbTNMY2lqSzJjK1ZHem9iTythRzd5cGwwSTA1Q1g0QSJ9"
                    )
                  }
                >
                  contacts
                </TWButton>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
