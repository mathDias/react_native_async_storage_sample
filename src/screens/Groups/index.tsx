import { FlatList, StyleSheet, Text, View } from 'react-native';
import * as S from './styles'
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { useState } from 'react';
import { ListEmpty } from '@components/ListEmpty';
import Button from '@components/Button';
export default function Groups() {

  const [groups,setGroups] = useState<string[]>([])

  return (
    <S.Container>
      <Header></Header>
      <Highlight title='Turmas' subtitle='Jogue com a sua turma' />
      <FlatList 
        data={groups} 
        keyExtractor={item => item} 
        renderItem={({item}) => (
          <GroupCard title={item}></GroupCard>
        )}
        contentContainerStyle={groups.length === 0 && {flex: 1}}
        ListEmptyComponent={() => <ListEmpty message='Que tal cadastrar a primeira turma?' />}
      ></FlatList>
      <Button  title='Cadastrar novo grupo'/>
    </S.Container>
  );
}