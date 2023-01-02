import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import DependentQueriesPage from "./components/DependentQueries.page";
import DynamicParallelQueries from "./components/DynamicParallelQueries";
import HomePage from "./components/Home.page";
import InfiniteQueriesPage from "./components/InfiniteQureies.page";
import PaginatedQueriesPage from "./components/PaginantedQueries.page";
import ParallelQueriesPage from "./components/ParallelQueries.page";
import RQSuperHeroPage from "./components/RQSuperHero";
import RQSuperHeroesPage from "./components/RQSuperHeroes.page";
import SuperHeroesPage from "./components/SuperHeroes.page";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/super-heroes">Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to="/rq-super-heroes">RQ Super Heroes</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/rq-infinite" element={<InfiniteQueriesPage />} />
          <Route path="/rq-paginated/" element={<PaginatedQueriesPage />} />
          <Route
            path="/rq-dependent/"
            element={<DependentQueriesPage email="dwayn.dev@gmail.com" />}
          />
          <Route
            path="/rq-dynamic-parallel/"
            element={<DynamicParallelQueries heroIds={[1, 3]} />}
          />
          <Route path="/rq-parallel/" element={<ParallelQueriesPage />} />
          <Route
            path="/rq-super-heroes/:heroId"
            element={<RQSuperHeroPage />}
          />
          <Route path="/super-heroes" element={<SuperHeroesPage />} />
          <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
