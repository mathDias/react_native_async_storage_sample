import {NavigationContainer} from '@react-navigation/native'
import { AppRoutes } from './app.routes'
import { View } from 'react-native'
import { useTheme } from 'styled-components/native'

export function Routes() {
    return (
        <View style={{
            flex: 1,
            backgroundColor: useTheme().COLORS.GRAY_600
        }}>
        <NavigationContainer>
            <AppRoutes />
        </NavigationContainer>
        </View>
    )
}