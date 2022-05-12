import { useState, useEffect } from "react";
import useSWR from "swr";

import { Chart } from "@/components/Chart";
import { Checkbox } from "@/components/Checkbox";
import { SubTitle } from "@/components/SubTitle";
import _populations from "@/mocks/populations";
import _prefectures from "@/mocks/prefectures";
import { PopulationRepository } from "@/repositories/populationRepository";
import { RepositoryFactory } from "@/repositories/repositoryFactory";

export type Prefecture = {
  prefCode: number;
  prefName: string;
};

export type Population = {
  year: number;
  value: number;
};

function App() {
  const { getPrefectures, getPopulation } = RepositoryFactory.get(
    "population"
  ) as PopulationRepository;

  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [selectedPrefectures, setSelectedPrefectures] = useState<Prefecture[]>(
    []
  );
  const [populations, setPopulation] = useState<Population[]>([]);

  // 選択されたチェックボックスのvalueを取得
  const prefCodes = [12, 14];

  const { data: prefecturesData } = useSWR("/prefectures", getPrefectures);

  prefCodes.forEach((prefCode) => {
    const { data: populationsData } = useSWR(
      `prefCode=${prefCode}&cityCode=-`,
      getPopulation
    );
  });

  // useEffect(() => {
  //   getPrefectures()
  //     .then((res) => {
  //       setPrefectures(res.result);
  //     })
  //     .catch((err) => console.log("error", err));

  //   const stories: any = [];
  //   const prefLabels: any = [];

  //   prefCodes.forEach((prefCode) => {
  //     getPopulation(prefCode).then((res) => {
  //       // 指定されたprefCodeの都道府県を取得
  //       const targetPref = _prefectures.find(
  //         (prefecture) => prefecture.prefCode === prefCode
  //       );
  //       prefLabels.push(targetPref);

  //       /**
  //        * 集計年を10年ごとに統一
  //        */
  //       if (targetPref) {
  //         const formatted = res.result.data[0].data
  //           .filter((item: Population) => item.year % 10 === 0)
  //           .map((item: Population) => {
  //             return { year: item.year, [targetPref?.prefName]: item.value };
  //           });
  //         stories.push(...formatted);
  //       }

  //       // 人口構成のデータに含まれる集計年のリスト
  //       const yearsList = Array.from(
  //         new Set(stories.map((story: Population) => story.year))
  //       );

  //       // rechartsに渡せる形にフォーマット
  //       const merged = yearsList.map((year) => {
  //         return Object.assign(
  //           {},
  //           ...stories.filter((item: any) => item.year === year)
  //         );
  //       });
  //       setPopulation(merged);
  //       setSelectedPrefectures(prefLabels);
  //     });
  //   });
  // }, []);

  // console.log(prefectures);
  // console.log(populations);
  // console.log(selectedPrefectures);

  return (
    <div>
      <SubTitle title="都道府県" />
      <Checkbox items={prefectures} />

      <SubTitle title="人口数" />
      <Chart data={populations} labels={selectedPrefectures} />
    </div>
  );
}

export default App;
