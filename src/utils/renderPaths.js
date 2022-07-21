import { Route } from "react-router-dom";

const renderPaths = (paths, Element) => {
  paths.map((path) => <Route key={path} path={path} element={Element} />);
}

export default renderPaths;