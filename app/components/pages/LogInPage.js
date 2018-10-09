import firebase from 'firebase';
import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

import { boxShadow, colors } from '../../settings';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primary
    },
    textInput: {
      ...boxShadow,
      margin: 20,
      padding: 15,
      backgroundColor: colors.ghost,
      width: 200
    }
  })
  

export default class Login extends React.Component {

  state = { email: '', password: '', errorMessage: null }

  handleLogin = () => {
    // TODO: Firebase stuff...
    const userData = {
      email: this.state.email,
      householdId: 0
    }
    firebase
    .auth()
    .signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      store.dispatch({
        type: "SET_USER",
        payload: resp.body
      })
      this.props.navigation.navigate('ListPage')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button 
          color={colors.charcoal}
          title="log in" 
          onPress={this.handleLogin} 
          />
        <Button
          color={colors.charcoal}
          title="don't have an account? sign up!"
          onPress={() => this.props.navigation.navigate('SignUpPage')}
        />
      </View>
    )
  }
}
