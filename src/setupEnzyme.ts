import { configure } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import { persistanceService } from "./classes/PersistanceService";
configure({ adapter: new EnzymeAdapter() });

// if (process.env.NODE_ENV === "test") {
//   process.env = {
//     ...process.env,
//     BASE_URL: "http://yapi.demo.qunar.com/mock/62785/v1"
//   };
// }

// if ((process.env.NODE_ENV as string) === "local") {
process.env = {
  ...process.env,
  BASE_URL: "http://localhost:10010/v1"
};
// }

console.debug(`NODE_ENV:`, process.env.NODE_ENV);
