import React from 'react';
import {
    Animated,
    Dimensions,
    PanResponder,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { connect } from 'react-redux';

import { boxShadow, colors } from '../../settings';
import { withinRegion } from '../../utils';

const { height, width } = Dimensions.get("window")

const styles = StyleSheet.create({
    row: {
        marginTop: 5,
        marginBottom: 5,
        padding: 5,
        width: "100%",
        borderStyle: "dashed",
        borderWidth: StyleSheet.hairlineWidth
        },
    name: {
        color: colors.charcoal,
        shadowOpacity: 0 // shadow should appear on box, not text
    }
})

class Item extends React.PureComponent {
    constructor(props) {
        super(props);
        this.dragging = false;
        this.scrollAtGestureStart = 0;
        this.state = {
            draggable: false,
            pan: new Animated.ValueXY()
        }
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponderCapture: (evt, gestureState) => {
                return this.state.draggable
            },
            onStartShouldSetPanResponder: (e, gestureState) => {
                return this.state.draggable
            },
            onMoveShouldSetPanResponder: (e, gestureState) => {
                return this.state.draggable
            },
            onPanResponderGrant: (e, gestureState) => {
                this.dragging = true;
                this.scrollAtGestureStart = this.props.containerScrollPosition
                this.props.beginDrag()
                this.props.disableScroll()
            },
            onPanResponderMove: Animated.event([
                null,
                {
                    dx: this.state.pan.x,
                    dy: this.state.pan.y
                }
            ], {
                listener: event => {
                    const touchY = event.nativeEvent.pageY
                    // enable scroll only if at edges of screen
                    if (touchY < (height * .1)) {
                        this.props.startAutoscroll('up')
                    }
                    else if (touchY > (height * .9) ) {
                        this.props.startAutoscroll('down')
                    }
                    else {
                        this.props.stopAutoscroll()
                    }
                    
                    // assign drop zone
                    const position = {
                        x: event.nativeEvent.pageX,
                        y: touchY
                    }
                    for (let listId in this.props.listRegions) {
                        let region = this.props.listRegions[listId]
                        if (withinRegion(position, region)) {
                            this.props.assignDropZone(listId)
                            return
                        }
                    }
                }
            }), 
            onPanResponderRelease: (_, gesture) => {
                this.setState({
                    draggable: false
                })
                this.dragging = false
                Animated.spring(this.state.pan, {
                  toValue: { x: 0, y: 0 },
                  friction: 5
                }).start();
                this.props.enableScroll()
                this.props.stopAutoscroll()
                clearInterval(this.interval)
              },        
            onPanResponderTerminationRequest: () => false
        })
    }

    handleLongPress = () => {
        this.setState({
            draggable: true
        })
    }

    render() {
        // on gesture start, record current scrollPosition 
            // from props
        // at every render, the scroll offset is the diff
            // between the startin scroll pos and the current one
        
        // at next gesture start, current scrollPosition will 
            // be reset
        if (this.state.dragging) {
            const scrollOffset = this.props.containerScrollPosition - this.scrollAtGestureStart 
            this.state.pan.setOffset({
                x: 0,
                y: scrollOffset
            })    
        }
        const animatedStyle = {
            transform: this.state.pan.getTranslateTransform()
        }

        const shadowStyle = {
            zIndex: 99,
            backgroundColor: colors.ghost,
            borderStyle: "solid",
            borderWidth: StyleSheet.hairlineWidth,
            ...boxShadow
        }

        const draggableStyle = this.state.draggable ?
            shadowStyle : { }

        return (
            <Animated.View style={[styles.row, animatedStyle, draggableStyle]}
                {...this.panResponder.panHandlers}
                >
                <TouchableWithoutFeedback
                    onLongPress={this.handleLongPress}
                    >
                    <View>
                        <Text style={styles.name} >
                            {this.props.name}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </Animated.View>
        )
    }
}

const mapStateToProps = ( { listRegions, listViewScrollable } ) => 
( { listRegions, listViewScrollable })

const mapDispatchToProps = (dispatch, ownProps) => (
    {
        assignDropZone: (listId) => {
            dispatch({
                type: "ASSIGN_DROP_ZONE",
                payload: listId
            })
        },
        beginDrag: () => {
            dispatch({
                type: "BEGIN_ITEM_DRAG",
                payload: ownProps.listId
            })
        },
        disableScroll: () => dispatch({ type: "DISABLE_SCROLL" }),
        enableScroll: () => dispatch({ type: "ENABLE_SCROLL" }),
        startAutoscroll: direction => dispatch({
            type: "START_AUTOSCROLL",
            payload: direction
        }),
        stopAutoscroll: () => dispatch({
            type: "STOP_AUTOSCROLL"
        })
    }
)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Item)