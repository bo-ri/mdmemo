export const generateDetail = async () => {
  const DETAIL_MARKDOWN = `<details>
  <summary>{title}</summary>
  
  <!-- ここにテキスト(上の空行は消さない) -->
  </details>`;
  await navigator.clipboard.writeText(DETAIL_MARKDOWN);
};
