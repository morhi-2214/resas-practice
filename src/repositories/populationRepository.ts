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
  const getPopulations = async (query: string) => {
    const { data } = await Repository.get(
      `${resource}/population/composition/perYear?${query}`
    );
    return data;
  };

  return { getPrefectures, getPopulations };
};

export type PopulationRepository = ReturnType<typeof usePopulationRepository>;
