import React from 'react';
import {
    AlertIOS,
    StyleSheet
} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import request from 'superagent';

import { colors, dbURL } from '../../settings';

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.ghost,
        alignSelf: "center",
        borderColor: colors.secondary,
        borderWidth: 1,
        borderRadius: 10,
        margin: 10
    }
})

class NewListButton extends React.PureComponent {

    handlePress = () => {
        AlertIOS.prompt(
            "what the item??!",
            null,
            text => this.props.handleItemAdd(text, this.props.currentUser, this.props.listId)
        )
    }

    render() {
        return (
            <Button
                buttonStyle={styles.button}
                loading={this.props.listWithItemSaving === this.props.listId}
                titleStyle={{fontWeight: "bold"}}
                onPress={this.handlePress}
                title={this.props.listWithItemSaving === this.props.listId ? '' : "+"}
                color={colors.secondary}
                accessibilityLabel="Add a new item"
            />
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleItemAdd: (text, currentUser, listId) => {
            const itemData = {
                name: text,
                householdId: currentUser.householdId,
                listId,
                createdAt: new Date().toString()
            }        
            dispatch({
                type: "ITEM_SAVING",
                payload: listId
            })
            request
                .post(dbURL + '/items.json')
                .send(itemData)
                .then(
                    res => {
                        const newItem = {}
                        newItem[res.body.name] = itemData
                        dispatch({
                            type: "ITEM_SAVED",
                            payload: {
                                item: newItem,
                                listId: listId
                            }
                        })
                    },
                    err => console.log('err', err)
                )
            }
        }
}

const mapStateToProps = ({ currentUser, listWithItemSaving }) => 
    ({currentUser, listWithItemSaving })

export default connect(mapStateToProps,mapDispatchToProps)(NewListButton)