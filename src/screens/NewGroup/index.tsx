import { useState } from 'react'
import { Header } from '@components/Header';
import * as S from './styles'
import { Highlight } from '@components/Highlight';
import Button from '@components/Button';
import { Input } from '@components/Input';
import {useNavigation} from '@react-navigation/native'
import { groupCreate } from '@storage/group/groupCreate';
import { AppError } from '@utils/AppError';
import { Alert } from 'react-native';
export default function NewGroup() {
  const navigation = useNavigation()

  const [group,setGroup] = useState('');
  
  async function handleNew(){
    try{
      if(!group.trim().length){
        return Alert.alert('Novo grupo', 'Informe o nome do grupo')
      }


      await groupCreate(group)
      navigation.navigate('players',{group});
    }catch(error){
      
      if(error instanceof AppError){
        Alert.alert('Novo grupo',error.message)
      }else{
        Alert.alert('Novo Grupo','Não foi possível criar um novo grupo :(')
      }
    }
  }

  return (
    <S.Container>
      <Header showBackButton />
      <S.Content>
        <S.Icon/>
        <Highlight title='Nova turma' subtitle='Crie a turma para adicionar pessoas'></Highlight>
        <Input placeholder='Nome da Turma' onChangeText={setGroup}/>
        <Button title='Criar' style={{marginTop: 30}} onPress={handleNew}/>
      </S.Content>
    </S.Container>
  );
}