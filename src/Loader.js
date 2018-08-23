import Loadable from "react-loadable";
import Loading from "./Loading";

export default name =>
  Loadable({
    loader: () => require(name).default,
    loading: Loading
  });
