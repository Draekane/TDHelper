import jinqJs from 'jinq';

export function addItemToArray(array, item) {
    return new jinqJs().from(array, [item]).select();
}

export function removeItemFromArrayById(array, id, idColumn) {
    let tempIdColumn = idColumn;
    if (!idColumn) {
        tempIdColumn = 'Id';
    }
    const returnArray = new jinqJs().from(array)
        .delete()
        .at((all, index) => all[index][tempIdColumn] === id)
        .select();

    return returnArray;
}

export function replaceItemInArrayById(array, newItem, idColumn) {
    let tempIdColumn = idColumn;
    if (!idColumn) {
        tempIdColumn = 'Id';
    }
    const returnArray = new jinqJs().from(array)
        .update((all, index) => (all[index] = newItem)) // eslint-disable-line no-param-reassign
        .at((all, index) => all[index][tempIdColumn] === newItem[tempIdColumn])
        .select();
    return returnArray;
}

export function modifyItemInArrayById(array, id, newProps, idColumn) {
    let tempIdColumn = idColumn;
    if (!idColumn) { tempIdColumn = 'Id'; }
    const newArray = new jinqJs().from(array)
        .update((all, index) => (all[index] = { ...all[index], ...newProps })) // eslint-disable-line no-param-reassign
        .at((all, index) => all[index][tempIdColumn] === id)
        .select();

    return newArray;
}