import { useApiClient } from "../hooks/useApiClient";
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
  const getPopulation = async () => {
    const { data } = await Repository.get(
      `${resource}/population/composition/perYear?prefCode=11&cityCode=11362`
    );
    return data;
  };

  return { getPrefectures, getPopulation };
};

export type PopulationRepository = ReturnType<typeof usePopulationRepository>;
