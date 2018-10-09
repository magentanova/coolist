import React from 'react';
import { ActivityIndicator, Image, View } from 'react-native';

const loaderize = ComponentClass => props => (
        <View>
            {props.loading ? 
            
                <ActivityIndicator 
                    style={{alignSelf: "center"}}
                    size="large" />  
                    :
                null 
                }
                <ComponentClass {...props} /> 
            }
        </View>
    )

export default loaderize;