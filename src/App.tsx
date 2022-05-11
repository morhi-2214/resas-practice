import { useState, useEffect } from "react";

import { Checkbox } from "./components/Checkbox";
import { PopulationRepository } from "./repositories/populationRepository";
import { RepositoryFactory } from "./repositories/repositoryFactory";
import "./App.css";

function App() {
  const { getPrefectures, getPopulation } = RepositoryFactory.get(
    "population"
  ) as PopulationRepository;

  const [prefectures, setPrefectures] = useState<any>([]);
  const [populations, setPopulation] = useState<any>([]);

  useEffect(() => {
    getPrefectures()
      .then((res) => {
        setPrefectures(res.result);
      })
      .catch((err) => console.log("error", err));

    getPopulation()
      .then((res) => {
        setPopulation(res.result);
      })
      .catch((err) => console.log("error", err));
  }, []);

  // console.log(prefectures);
  // console.log(populations);

  return (
    <div className="App">
      <Checkbox items={prefectures} />
    </div>
  );
}

export default App;
