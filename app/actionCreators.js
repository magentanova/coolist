import request from 'superagent';

import { dbURL } from './settings';

export const fetchItems = (currentUser, dispatch) => {
    dispatch({
        type: "ITEMS_LOADING"
    })
    request
        .get(dbURL + '/items.json')
        .query({
            orderBy: `"householdId"`, // needs double quotes
            equalTo: currentUser.householdId
        })
        .accept('application/json')
        .then(
            resp => {
                dispatch({
                    type: "ITEMS_LOADED",
                    payload: resp.body
                });
            },
            (err) => {
                console.log('Error',JSON.stringify(err))
            }
        )
}

export const fetchLists = (currentUser, dispatch) => {
    dispatch({
        type: "LISTS_LOADING"
    })
    request
        .get(dbURL + '/lists.json')
        .query({
            orderBy: `"householdId"`, // needs double quotes
            equalTo: currentUser.householdId
        })
        .accept('application/json')
        .then(
            resp => {
                dispatch({
                    type: "LISTS_LOADED",
                    payload: resp.body
                })
            },
            err => {
                console.log('Error',err)
            }
        )
}
