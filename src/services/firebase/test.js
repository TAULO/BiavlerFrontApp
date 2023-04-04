import { fetchDocuments } from "../firebase/db.js";
import  uFuzzy from '@leeoniya/ufuzzy'

const u = new uFuzzy();

async function events() {
    return await fetchDocuments('calendar')
}

async function filter(haystack, searchKeyword, needle) {
    haystack = await haystack
    const idxs = u.filter(haystack.map(item => item[searchKeyword]), needle);

    // let info = u.info(idxs, haystack, needle);
    // let order = u.sort(info, haystack, needle);
    return idxs.map(i => haystack[i]).sort((a, b) => a[searchKeyword].localeCompare(b[searchKeyword]))
}

export { filter }