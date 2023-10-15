import * as S from './styles'
import {TouchableOpacityProps} from 'react-native'

type Props = {
    title: string
} & TouchableOpacityProps

export function GroupCard({title,...rest} : Props){

    return (
        <S.Container {...rest}>
            <S.Icon/>
            <S.Title>
                {title}
            </S.Title>
        </S.Container>
    )
}