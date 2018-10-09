import React from 'react';
import {
    AlertIOS,
    StyleSheet
} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import request from 'superagent';

import { colors } from '../../settings';

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
            "name that list!",
            null,
            text => this.props.handleListAdd(text, this.props.currentUser)
        )
    }

    render() {
        return (
            <Button
                buttonStyle={styles.button}
                loading={this.props.listSaving}
                titleStyle={{fontWeight: "bold"}}
                onPress={this.handlePress}
                title={this.props.listSaving ? '' : "noolist"}
                color={colors.secondary}
                accessibilityLabel="Add a new list"
            />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleListAdd: (text, currentUser) => {
            const listData = {
                title: text,
                householdId: currentUser.householdId,
                createdAt: new Date().toString()
            }        
            dispatch({
                type: "LIST_SAVING"
            })
            request
                .post('https://coolist-8713d.firebaseio.com/lists.json')
                .send(listData)
                .then(
                    res => {
                        const newList = {}
                        newList[res.body.name] = listData
                        dispatch({
                            type: "LIST_SAVED",
                            payload: newList
                        })
                    },
                    err => console.log('err', err)
                )
            }
        }
}

const mapStateToProps = ({ currentUser, listSaving }) => 
    ({currentUser, listSaving })

export default connect(mapStateToProps,mapDispatchToProps)(NewListButton)