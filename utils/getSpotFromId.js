const getSpotFromId = (spot_id, spot_list) => {
    return spot_list.filter((item) => item.id == spot_id)[0]
}

const getSpotListFromIdList = (id_list, spot_list) => {
    return id_list.map((id) => getSpotFromId(id, spot_list))
}

export {
    getSpotFromId,
    getSpotListFromIdList
}
