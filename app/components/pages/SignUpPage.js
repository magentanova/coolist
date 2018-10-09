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

  handleSignup = () => {
    // TODO: Firebase stuff...
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        firebase
          .database()
          .ref('users')
          .child(firebase.auth().currentUser.uid)
          .set({
            email: this.state.email,
            password: this.state.password,
            householdId: 0
          })
          .then(() => {
            this.props.navigation.navigate('ListPage')
          })
          .catch(error => console.log(error))
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
          title="sign up" 
          onPress={this.handleSignup} 
          />
        <Button
          color={colors.charcoal}
          title="already have an account? log in!"
          onPress={() => this.props.navigation.navigate('LogInPage')}
        />
      </View>
    )
  }
}
