import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import * as S from './styles'
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { useCallback, useEffect, useState } from 'react';
import { ListEmpty } from '@components/ListEmpty';
import Button from '@components/Button';
import {useNavigation, useFocusEffect} from '@react-navigation/native'
import { groupsGetAll } from '@storage/group/groupsGetAll';
import { Loading } from '@components/Loading';

export default function Groups() {
  const [ isLoading, setIsloading] = useState(true)
  const [groups,setGroups] = useState<string[]>([])
  const navigation = useNavigation()

  function handleNewGroup(){
    navigation.navigate('new')
  }

  async function fetchGroups() {
    try {
      setIsloading(true)
      const data = await groupsGetAll();
      setGroups(data)
      setIsloading(false)
    } catch (error) {
      setIsloading(false)
      Alert.alert('Turmas','Não foi possível buscar as turmas.')
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group })
  }

  useFocusEffect(useCallback(() => {
    fetchGroups()
  },[]))

  return (
    <S.Container>
      <Header></Header>
      <Highlight title='Turmas' subtitle='Jogue com a sua turma' />

      {
        isLoading ? <Loading></Loading>: 
      <FlatList 
        data={groups} 
        keyExtractor={item => item} 
        renderItem={({item}) => (
          <GroupCard title={item} 
          onPress={() => handleOpenGroup(item)}></GroupCard>
        )}
        contentContainerStyle={groups.length === 0 && {flex: 1}}
        ListEmptyComponent={() => <ListEmpty message='Que tal cadastrar a primeira turma?' />}
      ></FlatList>
      }
      <Button  title='Cadastrar novo grupo' onPress={handleNewGroup}/>
    </S.Container>
  );
}