import { useApiClient } from "../hooks/useApiClient";

import { formatSinglePopulationData } from "@/utils/formatData";

const resource = "";
const Repository = useApiClient();

export const usePopulationRepository = () => {
  /**
   * 都道府県名の一覧を取得する
   **/
  const getPrefectures = async () => {
    const { data } = await Repository.get(`${resource}/prefectures`);
    return data;
  };

  /**
   * 指定の都道府県の人口構成を取得する
   * TODO: クエリパラメータの部分は後で渡せるようにする
   **/
  const getPopulations = async (checked: number[], _prefectures: any) => {
    const stories: any = [];
    const prefLabels: any[] = [];

    checked.forEach(async (prefCode) => {
      const { data } = await Repository.get(
        `${resource}/population/composition/perYear?prefCode=${prefCode}&cityCode=-`
      );

      // 指定されたprefCodeの都道府県を取得
      const targetPref = _prefectures.find(
        (prefecture: any) => prefecture.prefCode === prefCode
      );

      prefLabels.push(targetPref);
      stories.push(
        formatSinglePopulationData(data.result.data[0].data, targetPref)
      );
    });

    return { stories, prefLabels };
  };

  return { getPrefectures, getPopulations };
};

export type PopulationRepository = ReturnType<typeof usePopulationRepository>;
