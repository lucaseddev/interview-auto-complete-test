type TExtractCallback<T> = (item: T) => string;

// Just a simple hashtable search to remove duplicate values
export const removeDuplicates = <T = unknown>(
  list: T[],
  extractCallback: TExtractCallback<T> = (item) => String(item)
) => {
    let map: Object = {};
    return list.filter(item => {
        const extracted = extractCallback(item);
        return map.hasOwnProperty(extracted) ? false : (map[extracted] = true)
    })
}
