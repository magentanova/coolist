import firebase from 'firebase';
import React from 'react'
import { 
    View, 
    Text, 
    ActivityIndicator, 
    StatusBar,
    StyleSheet 
} from 'react-native'
import request from 'superagent';

import { colors } from '../../settings';
import store from '../../state/store';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primary
    }
  });

export default class Loading extends React.Component {

    componentDidMount() {
        StatusBar.setHidden(true);
        const navigate = this.props.navigation.navigate
        // DELETE THIS CODE
        console.log('delete code in loadingPage')
        store.dispatch({
            type: "SET_USER",
            payload: { householdId: 0}
        })
        navigate("ListPage")
        console.log('end delete code')
        return 

        this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if ( user ) {
                request
                    .get(`https://coolist-8713d.firebaseio.com/users/${user.uid}.json`)
                    .then(
                        resp => {
                            store.dispatch({
                                type: "SET_USER",
                                payload: resp.body
                            })
                            setTimeout(() => navigate("ListPage"), 250)
                        }
                    )
            }
            else {
                store.dispatch({
                    type: "SET_USER",
                    payload: user
                })
                navigate("SignUpPage")
            }
        });
    }

    componentWillUnMount() {
        this.unsubscribe();
    }

    render() {
        return (
        <View style={styles.container}>
            <Text>Loading</Text>
            <ActivityIndicator size="large" />
        </View>
        )
    }
}
