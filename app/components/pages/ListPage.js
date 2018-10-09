import firebase from 'firebase';
import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import { connect, Provider } from 'react-redux'; 

import { colors } from '../../settings';
import store from '../../state/store';
import ListsContainer from '../partials/ListsContainer';
import NewListButton from '../partials/NewListButton';
import hamburgerize from '../hocs/hamburgerize';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
      paddingTop: 45
    },
  });

const ListPage = props => (
    <View
        style={styles.container}>
        <ListsContainer loading={props.listsLoading || props.itemsLoading} />
        <NewListButton />
    </View>
)

const ListPageWithBurger = hamburgerize(
    connect(
        ({ itemsLoading, listsLoading }) => ({ itemsLoading, listsLoading }),
        null
    )(ListPage)
);

export default props => (
    <Provider store={store} >
        <ListPageWithBurger />
    </Provider>
);