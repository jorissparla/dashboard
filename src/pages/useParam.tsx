import { useLocalStorage } from "../utils/useLocalStorage";

export function useParam(name = "", initialValue = 0) {
  return useLocalStorage(name, initialValue, false);
}
export function useParams(clean = false) {
  const [C_AWAITINGCUSTOMER] = useLocalStorage("C_AWAITINGCUSTOMER", 6, clean);
  const [C_AWAITINGINFOR] = useLocalStorage("C_AWAITINGINFOR", 1, clean);
  const [C_RESEARCHING] = useLocalStorage("C_RESEARCHING", 3, clean);
  const [C_NEW] = useLocalStorage("C_NEW", 1, clean);
  const [C_MT] = useLocalStorage("C_MT", 5, clean);
  const [N_AWAITINGCUSTOMER] = useLocalStorage("N_AWAITINGCUSTOMER", 6, clean);
  const [N_RESEARCHING] = useLocalStorage("N_RESEARCHING", 10, clean);
  const [N_AWAITINGINFOR] = useLocalStorage("N_AWAITINGINFOR", 2, clean);
  const [N_NEW] = useLocalStorage("N_NEW", 1, clean);
  const [N_SOLUTIONPROPOSED] = useLocalStorage("N_SOLUTIONPROPOSED", 30, clean);
  const [N_AGING] = useLocalStorage("N_AGING", 90, clean);
  const [C_AGING] = useLocalStorage("C_AGING", 30, clean);
  const [N_MAJORIMPACT] = useLocalStorage("N_MAJORIMPACT", 2, clean);
  return {
    C_AWAITINGCUSTOMER,
    N_AWAITINGCUSTOMER,
    C_RESEARCHING,
    N_RESEARCHING,
    C_AWAITINGINFOR,
    N_AWAITINGINFOR,
    C_NEW,
    C_MT,
    N_NEW,
    N_SOLUTIONPROPOSED,
    N_AGING,
    C_AGING,
    N_MAJORIMPACT,
  };
}
