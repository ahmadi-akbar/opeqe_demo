import { checkIfEmailIsDemoURl } from "../config/api";

export default function(data = {}) {
  const body = data;

  return {
    url: `${checkIfEmailIsDemoURl}`,
    key: `${checkIfEmailIsDemoURl}`,
    body,
    method: "post"
  };
}
