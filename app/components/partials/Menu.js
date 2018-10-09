import firebase from 'firebase';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';

import { colors } from '../../settings';

const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: colors.ghost,
    padding: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
});

export default class Menu extends React.PureComponent {

    handleLogOut = () => {
        firebase    
            .auth()
            .signOut()
            .then(
                () => {
                    this.props.navigation.navigate('SignUpPage')
                },
                error => {
                    console.log(error)
                }
            )
    }

    render() {
        return (
            <View scrollsToTop={false} style={styles.menu}>
              <Text
                onPress={this.handleLogOut}
                style={styles.item}
              >
                log out
              </Text>
            </View>
          );        
    }
}

