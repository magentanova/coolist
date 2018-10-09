import { connect } from 'react-redux';
import { RefreshControl,
    ScrollView } from 'react-native';
import React from 'react';

import loaderize from '../hocs/loaderize';
import List from '../partials/List';
import { fetchItems,
    fetchLists } from '../../actionCreators';

class ListsContainer extends React.PureComponent {

    scrollPosition = 0

    state = {
        scrollPosition: 0
    }

    componentDidMount() {
        fetchItems(this.props.currentUser, this.props.dispatch)
        fetchLists(this.props.currentUser, this.props.dispatch)
    }

    componentWillReceiveProps(nextProps) {
        const autoscrollDirection = nextProps.autoscrollDirection
        if (autoscrollDirection !== this.props.autoscrollDirection) {
            autoscrollDirection ? 
                this.startScrolling(autoscrollDirection)
                : this.stopScrolling()
        }
    }

    onRefresh = () => {
        fetchItems(this.props.currentUser, this.props.dispatch)
        fetchLists(this.props.currentUser, this.props.dispatch)
    }

    startScrolling = (direction) => {
        let sign
        if (direction === 'down') {
            sign = 1
        }
        else if (direction === 'up') {
            sign = -1
        }
        else {
            throw "You must provide a scroll direction."
        }
        this.interval = setInterval(() => {
            // have to manually update scrollposition here
                // because onScroll is only fired when scroll happens
                // from touch
            const delta = 5 * sign
            this.scrollPosition += delta
            this.setState({
                scrollPosition: this.scrollPosition
            })
        }, 50)
    }

    stopScrolling = () => {
        clearInterval(this.interval)
    }

    updateScrollPosition = (e) => {
        this.scrollPosition = e.nativeEvent.contentOffset.y
    }

    render() {
        // sort lists 
        const listsArray = Object.keys(this.props.lists).map(id => (
            {
                ...this.props.lists[id],
                id
            }
        ))
        const sortedLists = listsArray.sort(
            (a,b) => Date.parse(a.createdAt) > Date.parse(b.createdAt)
        )

        // sort items into lists
        const itemsArray = Object.keys(this.props.items).map(id => (
            {
                ...this.props.items[id],
                id
            }
        ))
        const itemsByList = {};
        itemsArray.forEach( item => {
            const listItems = itemsByList[item.listId]
            itemsByList[item.listId] = listItems ? listItems.concat([item]) : [item]
        })

        return (
            <ScrollView
                contentOffset={{y: this.state.scrollPosition}}
                onScroll={this.updateScrollPosition}
                ref={el => this.scrollView = el}
                refreshControl={
                    <RefreshControl
                    refreshing={this.props.listsLoading}
                    onRefresh={this.onRefresh}
                    />
                }
                scrollEnabled={this.props.listViewScrollable}
                scrollEventThrottle={250}
            >
                {sortedLists.map(
                    list => <List 
                        key={list.id}
                        id={list.id}
                        containerScrollPosition={this.scrollPosition}
                        items={itemsByList[list.id] || []}
                        title={list.title} />
                )}
            </ScrollView>
        )
    }
}

export default loaderize(connect(
    ({  autoscrollDirection,
        currentUser,
        items,
        lists,
        listsLoading,
        listsLoaded,
        listViewScrollable }) => 
    ({  autoscrollDirection,
        currentUser,
        items,
        lists,
        listsLoading,
        listsLoaded,
        listViewScrollable }),
    dispatch => ({ dispatch })
)(ListsContainer));