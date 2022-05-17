import { useApiClient } from "../hooks/useApiClient";

import { Prefecture } from "@/pages/Home";
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
   **/
  const getPopulations = async (
    checkedPrefCodes: number[],
    prefecturesList: Prefecture[]
  ) => {
    const dataset: any = [];
    const checkedPrefectures: Prefecture[] = [];

    checkedPrefCodes.forEach(async (code) => {
      const { data } = await Repository.get(
        `${resource}/population/composition/perYear?prefCode=${code}&cityCode=-`
      );

      // 指定されたprefCodeの都道府県名を取得
      const checkedPrefecture = prefecturesList.find(
        (prefecture) => prefecture.prefCode === code
      );

      if (checkedPrefecture) {
        checkedPrefectures.push(checkedPrefecture);
        dataset.push(
          formatSinglePopulationData(
            data.result.data[0].data,
            checkedPrefecture
          )
        );
      }
    });

    return { dataset, checkedPrefectures };
  };

  return { getPrefectures, getPopulations };
};

export type PopulationRepository = ReturnType<typeof usePopulationRepository>;
