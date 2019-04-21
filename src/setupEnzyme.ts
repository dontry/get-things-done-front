import { configure } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
configure({ adapter: new EnzymeAdapter() });

process.env = {
  ...process.env,
  BASE_URL: "http://localhost:10010"
};
