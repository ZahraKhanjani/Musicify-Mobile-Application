export function setPageData(pageId, pageData) {
  return {
    type: 'SET_PAGE_DATE',
    pageId,
    pageData,
  };
}
