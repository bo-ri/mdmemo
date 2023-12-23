/**
 * Generate Markdown string of Calendar
 * 
 * | 月 | 火 | 水 | 木 | 金 | 土 | 日 |
 * |:-:|:-:|:-:|:-:|:-:|:-:|:-:|
 * | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
 * | ...
 */

const HEADER = `| 月 | 火 | 水 | 木 | 金 | 土 | 日 |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
`;

/**
 * 
 * @param {Date} date optional
 * @returns 
 */
export const generateCalendar = async (date: Date = new Date()) => {
  // 月初の曜日を取得する
  const firstDay = getFirstDayOfMonth(date);

  // 月末最終日を取得する
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 1, 0);

  // 最大で6週分のrowが必要だから、6 * 7
  const MAXIMUM_DATE_COLUMNS = 42;
  // markdownに挿入する日付
  let dateIndex = 1;
  // markdownのベース
  let baseMarkup = "";
  
  for (let i = 0; i < MAXIMUM_DATE_COLUMNS; i++) {
    // 1日が始まる曜日までcontinue
    if (i < firstDay) {
      baseMarkup += "|";
      continue;
    }
    // 月の最終日を超えた場合
    if (dateIndex > endDate.getDate()) {
      // i+1 が 7 の倍数の場合は閉じる|を追加してloopを抜ける
      if ((i + 1) % 7 === 0) {
        baseMarkup += "||";
        break;
      }
      // その他の場合は空にしておきたいから|を追加する
      baseMarkup += "|";
      dateIndex++;
      continue;
    }
    // i+1 が 7 の倍数の場合、週末なので改行を入れる
    if ((i + 1) % 7 === 0) {
      // 最終日が日曜の場合は改行せずに閉じる
      if (dateIndex === endDate.getDate()) {
        baseMarkup += `|${dateIndex}|`;
        break;
      }
      baseMarkup += `|${dateIndex}|\n`;
    } else {
      // その他の場合は単純に日付を挿入する
      baseMarkup += `|${dateIndex}`;
    }
    // 日付をインクリメント
    dateIndex++;
  }
  await navigator.clipboard.writeText(HEADER + baseMarkup);
}

/**
 * 月初(1日)の曜日を調べる
 * 
 * @param date 
 */
const getFirstDayOfMonth = (date: Date) => {
  let today = date.getDate();
  const currentDay = date.getDay();
  while (today > 7) {
    today -= 7;
  }
  let targetDay = currentDay;
  while(today > 1) {
    today -= 1;
    if (targetDay < 0) {
      targetDay = 6;
      continue;
    }
    targetDay -= 1;
  }
  // 月曜日始まりのインデックスに変換する
  if (targetDay === 0) {
    return 6;
  }
  return targetDay - 1;
}