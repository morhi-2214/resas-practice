import { useState, useEffect, useMemo } from "react";
import useSWR from "swr";

import { Chart } from "@/components/Chart";
import { Checkbox } from "@/components/Checkbox";
import { SubTitle } from "@/components/SubTitle";
import { useCheckbox } from "@/hooks/useCheckbox";
import { PopulationRepository } from "@/repositories/populationRepository";
import { RepositoryFactory } from "@/repositories/repositoryFactory";
import { formatDataListForRechart } from "@/utils/formatData";

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
  const [populations, setPopulations] = useState<Population[]>([]);
  const [selectedPrefectures, setSelectedPrefectures] = useState<
    Prefecture[] | undefined
  >([]);

  const { data: prefecturesData } = useSWR("/prefectures", getPrefectures);
  const prefectures = useCheckbox(prefecturesData?.result);

  // 選択されたチェックボックスのvalueを取得
  const checked = useMemo(
    () => prefectures.checkedValue,
    [prefectures.checkedValue]
  );

  const { data: populationsData } = useSWR(
    [checked, prefectures.items],
    getPopulations
  );

  useEffect(() => {
    // TODO: なぜかpopulationsDataがundefinedでも走ってしまうので修正！
    console.log(populationsData);

    setPopulations(formatDataListForRechart(populationsData?.stories));
    setSelectedPrefectures(populationsData?.prefLabels);
  }, [populationsData]);

  return (
    <div>
      <SubTitle title="都道府県" />
      {prefectures && (
        <Checkbox items={prefectures.items} onChange={prefectures.set} />
      )}

      <SubTitle title="人口数" />
      <Chart data={populations} labels={selectedPrefectures} />
    </div>
  );
};

export default Home;
