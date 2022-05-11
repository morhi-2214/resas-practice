import { useState, useEffect } from "react";

import { Checkbox } from "@/components/Checkbox";
import { SubTitle } from "@/components/SubTitle";
import { PopulationRepository } from "@/repositories/populationRepository";
import { RepositoryFactory } from "@/repositories/repositoryFactory";
import "@/App.css";

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
      <SubTitle title="都道府県" />
      <Checkbox items={prefectures} />

      <SubTitle title="人口数" />
    </div>
  );
}

export default App;
