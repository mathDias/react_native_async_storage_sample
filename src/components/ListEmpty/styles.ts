import styled from 'styled-components/native';

export const Container =  styled.View`
    justify-content: center;
    align-items: center;
    flex:1;
`

export const Message = styled.Text`
    text-align: center;

    font-size: ${({theme}) => theme.FONT_SIZE.SM }px;
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    color: ${({theme}) => theme.COLORS.GRAY_300};
`