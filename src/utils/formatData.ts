import { Population, Prefecture } from "@/pages/Home";

const formatSinglePopulationData = (
  data: Population[],
  targetPref: Prefecture | undefined
) => {
  // 集計年を10年ごとにまとめて整形
  const formatted = targetPref
    ? data
        .filter((item: Population) => item.year % 10 === 0)
        .map((item: Population) => {
          return { year: item.year, [targetPref.prefName]: item.value };
        })
    : undefined;

  return formatted;
};

const formatDataListForRechart = (dataList: any) => {
  // 人口構成データに含まれる集計年のリスト（重複削除）
  const yearsList = Array.from(
    new Set(dataList?.flat().map((story: Population) => story.year))
  );
  // 集計年ごとに各都道府県の人口構成データまとめる
  const merged = yearsList.map((year) => {
    return Object.assign(
      {},
      ...dataList.flat().filter((item: any) => item.year === year)
    );
  });

  return merged;
};

export { formatSinglePopulationData, formatDataListForRechart };
