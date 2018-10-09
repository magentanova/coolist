import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import SideMenu from 'react-native-side-menu';

import Menu from '../partials/Menu';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  hamburger: {
    width: 25,
    height: 25,
    borderRadius: 3
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default hamburgerize = ComponentClass => {
    return class extends Component {
        constructor(props) {
          super(props);
      
          this.toggle = this.toggle.bind(this);
      
          this.state = {
            isOpen: false,
            selectedItem: 'About',
          };
        }
      
        toggle() {
          this.setState({
            isOpen: !this.state.isOpen,
          });
        }
      
        updateMenuState(isOpen) {
          this.setState({ isOpen });
        }
      
        onMenuItemSelected = item =>
          this.setState({
            isOpen: false,
            selectedItem: item,
          });
      
        render() {
          const menu = <Menu navigation={this.props.navigation} />;
      
          return (
            <SideMenu
              menu={menu}
              menuPosition={"right"}
              openMenuOffset={window.width / 3}
              isOpen={this.state.isOpen}
              onChange={isOpen => this.updateMenuState(isOpen)}
            >
              <ComponentClass 
                style={styles.container} 
                {...this.props} 
                />

              <TouchableOpacity
                onPress={this.toggle}
                style={styles.button}
              >
                <Image
                  style={styles.hamburger}
                  source={require("../../../assets/hamburger.png")}
                />
              </TouchableOpacity>
            </SideMenu>
          );
        }
      }     
}
