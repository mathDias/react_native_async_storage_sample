import { TextInputProps } from "react-native";
import * as S from './styles'
import { useTheme } from "styled-components/native";

export function Input({ ...rest } : TextInputProps){
    return (
        <S.Container {...rest} placeholderTextColor={useTheme().COLORS.GRAY_300}></S.Container>
    )
}