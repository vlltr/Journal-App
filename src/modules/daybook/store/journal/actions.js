// export const myAction = async({ commit }) => {

// }

import journalApi from '@/api/journalApi'


export const loadEntries = async({ commit }) => {

    const { data } = await journalApi.get('/entries.json')

    if ( !data ) {
        commit('setEntries', [])
        return
    }

    const entries = []
    for (let id of Object.keys( data )) {
        entries.push({
            id,
            ...data[id]
        })
    }
    commit('setEntries', entries)
}

export const updateEntry = async({ commit }, entry) => {
    const { date, picture, text } = entry
    const dataToSave = { date, picture, text}

    const response = await journalApi.put(`/entries/${ entry.id }.json`, dataToSave)
    console.log(response)

    commit('updateEntry', {...entry})
}

export const createEntry = async({ commit }, entry) => {
    //dataToSave
    const { date, picture, text } = entry
    const dataToSave = { date, picture, text}
    
    
    const { data } = await journalApi.post(`/entries.json`, dataToSave)

    dataToSave.id = data.name

    //commit add entry
    commit('addEntry', dataToSave)
    return data.name
}

export const deleteEntry = async({ commit }, id) => {
    //await 
    const response = await journalApi.delete(`/entries/${ id }.json`)
    //commit add entry

    commit('deleteEntry', id)

    return response
}