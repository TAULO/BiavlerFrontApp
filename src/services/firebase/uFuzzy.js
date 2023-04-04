import  uFuzzy from '@leeoniya/ufuzzy'

const u = new uFuzzy();

async function filter(haystack, searchKeyword, needle) {
    if (needle === '') return await haystack
    
    const filteredArr = await haystack
    const idxs = u.filter(filteredArr.map(item => item[searchKeyword]), needle);
    // let info = u.info(idxs, haystack, needle);
    // let order = u.sort(info, haystack, needle);
    return idxs.map(i => filteredArr[i]).sort((a, b) => a[searchKeyword].localeCompare(b[searchKeyword]))
}

export { filter } 