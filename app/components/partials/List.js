import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { connect } from 'react-redux';

import { boxShadow, colors } from '../../settings';
import AddItemButton from './AddItemButton';
import Item from './Item';

const styles = StyleSheet.create({
    listBox: {
        backgroundColor: colors.ghost,
        padding: 10,
        margin: 10,
        marginBottom: 20,
        marginTop: 0,
        ...boxShadow
    },
    listTitle: {
        fontWeight: "bold",
        fontSize: 14,
        textAlign: "center",
        marginBottom: 5
    }
})

class List extends React.PureComponent {

    render() {
        const dropZoneStyle = {
            backgroundColor: this.props.dropZoneList === this.props.id 
                && this.props.id !== this.props.dragSourceList ?
                colors.primaryLight : colors.ghost
        }

        const dragSourceStyle = {
            zIndex: this.props.dragSourceList === this.props.id ? 
                99 : 1
        }
        
        return (
            <View 
                onLayout={this.props.reportLayout}
                style={[styles.listBox, dropZoneStyle, dragSourceStyle]} >
                <Text style={styles.listTitle}>
                    {this.props.title}
                </Text>
                {this.props.items.map(
                    item => <Item 
                        key={item.id}
                        containerScrollPosition={this.props.containerScrollPosition}
                        id={item.id}
                        listId={item.listId}
                        name={item.name} />
                )}
                <AddItemButton listId={this.props.id} />
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        reportLayout: event => {
            dispatch({
                type: "LIST_LAYOUT",
                payload: {
                    listId: ownProps.id,
                    layout: event.nativeEvent.layout  
                }
            })
        }
    }
}

const mapStateToProps = ( { dragSourceList, dropZoneList } ) => 
    ( { dragSourceList, dropZoneList } );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);