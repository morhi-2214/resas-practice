import { Population } from "@/pages/Home";

const formatSinglePopulationData = (data: any, targetPref: any) => {
  // 集計年を10年ごとにまとめて整形
  const formatted = data
    .filter((item: Population) => item.year % 10 === 0)
    .map((item: Population) => {
      return { year: item.year, [targetPref?.prefName]: item.value };
    });

  return formatted;
};

const formatDataListForRechart = (dataList: any) => {
  // 人口構成データに含まれる集計年のリスト（重複削除）
  const yearsList = Array.from(
    new Set(dataList.map((story: Population) => story.year))
  );
  // 集計年ごとに各都道府県の人口構成データまとめる
  const merged = yearsList.map((year) => {
    return Object.assign(
      {},
      ...dataList.filter((item: any) => item.year === year)
    );
  });

  return merged;
};

export { formatSinglePopulationData, formatDataListForRechart };
