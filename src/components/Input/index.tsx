import { TextInput, TextInputProps } from "react-native";
import * as S from './styles'
import { useTheme } from "styled-components/native";

type Props = TextInputProps & {
    inputRef?: React.RefObject<TextInput>
}

export function Input({  inputRef , ...rest} : Props){
    return (
        <S.Container ref={inputRef} {...rest} placeholderTextColor={useTheme().COLORS.GRAY_300}></S.Container>
    )
}