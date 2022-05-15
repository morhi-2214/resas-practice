import { useState, useEffect } from "react";
import useSWR from "swr";

import { Chart } from "@/components/Chart";
import { Checkbox } from "@/components/Checkbox";
import { SubTitle } from "@/components/SubTitle";
import { useCheckbox } from "@/hooks/useCheckbox";
import _populations from "@/mocks/populations";
import _prefectures from "@/mocks/prefectures";
import { PopulationRepository } from "@/repositories/populationRepository";
import { RepositoryFactory } from "@/repositories/repositoryFactory";
import {
  formatSinglePopulationData,
  formatDataListForRechart,
} from "@/utils/formatData";

export type Prefecture = {
  prefCode: number;
  prefName: string;
  checked?: boolean;
};

export type Population = {
  year: number;
  value: number;
};

const Home = () => {
  const { getPrefectures, getPopulations } = RepositoryFactory.get(
    "population"
  ) as PopulationRepository;
  // const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [populations, setPopulations] = useState<Population[]>([]);
  const [selectedPrefectures, setSelectedPrefectures] = useState<Prefecture[]>(
    []
  );

  const { data: prefecturesData, error } = useSWR(
    "/prefectures",
    getPrefectures
  );

  // const prefectures = useCheckbox(prefecturesData.result);
  const prefectures = useCheckbox(_prefectures);

  // 選択されたチェックボックスのvalueを取得
  const checked = [12, 14];
  // const checked = prefectures.checkedValue;

  const stories: any = [];
  const prefLabels: Prefecture[] = [];

  checked.forEach((prefCode) => {
    const { data: populationData } = useSWR(
      `prefCode=${prefCode}&cityCode=-`,
      getPopulations
    );

    // 指定されたprefCodeの都道府県を取得;
    const targetPref = _prefectures.find(
      (prefecture) => prefecture.prefCode === prefCode
    );

    if (populationData) {
      prefLabels.push(targetPref);
      stories.push(
        formatSinglePopulationData(
          populationData.result.data[0].data,
          targetPref
        )
      );
    }
  });

  useEffect(() => {
    setPopulations(formatDataListForRechart(stories));
    setSelectedPrefectures(prefLabels);
  }, [stories.length]);

  // console.log(formatDataListForRechart(stories));

  return (
    <div>
      <SubTitle title="都道府県" />
      <Checkbox items={prefectures.items} onChange={prefectures.set} />

      <SubTitle title="人口数" />
      <Chart data={populations} labels={selectedPrefectures} />
    </div>
  );
};

export default Home;
