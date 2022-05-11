import { useState, useEffect } from "react";

import { Chart } from "@/components/Chart";
import { Checkbox } from "@/components/Checkbox";
import { SubTitle } from "@/components/SubTitle";
import _prefectures from "@/mocks/prefectures";
import { PopulationRepository } from "@/repositories/populationRepository";
import { RepositoryFactory } from "@/repositories/repositoryFactory";

function App() {
  const { getPrefectures, getPopulation } = RepositoryFactory.get(
    "population"
  ) as PopulationRepository;

  const [prefectures, setPrefectures] = useState<any>(_prefectures.result);
  const [populations, setPopulation] = useState<any>([]);

  // useEffect(() => {
  // APIのリクエスト制限があるので暫定でコメントアウト
  // getPrefectures()
  //   .then((res) => {
  //     setPrefectures(res.result);
  //   })
  //   .catch((err) => console.log("error", err));
  // }, []);

  // const prefCodes = [12, 13];

  // useEffect(() => {
  //   const stories: any = [];
  //   prefCodes.forEach((prefCode) => {
  //     getPopulation(prefCode)
  //       .then((res) => {
  //         stories.push(res.result.data[0].data);
  //       })
  //       .catch((err) => console.log("error", err));
  //   });
  //   setPopulation(stories);
  // }, [prefCodes]);

  console.log(prefectures);
  // console.log(populations);

  return (
    <div>
      <SubTitle title="都道府県" />
      <Checkbox items={prefectures} />

      <SubTitle title="人口数" />
      {/* <Chart /> */}
    </div>
  );
}

export default App;
