import { useEffect, useState, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'
import { Alert, FlatList, TextInput } from 'react-native'
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import Button from '@components/Button';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { AppError } from '@utils/AppError';
import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playersGetByGroupAndTeam } from '@storage/player/playerGetByGroupAndTeam';
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';
import { Loading } from '@components/Loading';


type RouteParams = {
  group: string
}

export default function Players() {
  const [ isLoading, setIsloading] = useState(true)
  const [newPlayerName, setNewPlayerName] = useState('')
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
  const newPlayerNameInputRef = useRef<TextInput>(null)
  const navigation = useNavigation();
  const route = useRoute()
  const {group} = route.params as RouteParams

  async function handleAddPlayer() {
    try{
      if(newPlayerName.trim().length === 0){
        return Alert.alert('Nova pessoa','Informa o nome da pessoa para adicionar')
      }

      const newPlayer : PlayerStorageDTO = {
        name: newPlayerName,
        team: team
      }

      await playerAddByGroup(newPlayer,group)
      fetchPlayersByTeam();
      newPlayerNameInputRef.current?.blur()
      setNewPlayerName('')

    }catch(error){
      if(error instanceof AppError){
        Alert.alert('Nova pessoa',error.message)
      }else{
        Alert.alert('Nova pessoa','Não foi possível adicionar uma nova pessoa ao time :(')
      }
    }
  }

  async function fetchPlayersByTeam() {
    try{
      setIsloading(true)
      const playersByTeam = await playersGetByGroupAndTeam(group,team)
      setPlayers(playersByTeam)
      setIsloading(false)
    }catch(error){
      setIsloading(false)
      Alert.alert('Pessoas','Não foi possível carregar as pessoas filtradas no time')
    }
  }

  async function handlePlayerRemove(playerName: string){
    try{
      await playerRemoveByGroup(playerName,group)
      fetchPlayersByTeam();
    }catch(error){
      Alert.alert('Remover pessoa','Não foi possível remover a pessoa selecionada.')
    }
  }

  async function groupRemove(){
    try{
      await groupRemoveByName(group)
      navigation.navigate('groups')
    }catch(error){
      Alert.alert('Remover grupo','Não foi possível remover o grupo.')
    }
  }

  async function handleGroupRemove(){
    Alert.alert('Remover', 'Deseja remover o grupo?',[
      {
        text: 'Não', style: 'cancel',
      },
      {
        text: 'Sim', onPress: () => groupRemove()
      }
    ])
  }

  useEffect(() => {
    
    
    fetchPlayersByTeam();
  },[team])

  return (
    <Container>
      <Header showBackButton />

      <Highlight 
        title={group}
        subtitle="adicione a galera e separe os times"
      />
      
      <Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} onChangeText={setNewPlayerName} value={newPlayerName} inputRef={newPlayerNameInputRef} onSubmitEditing={handleAddPlayer} returnKeyType='done'/>
        <ButtonIcon icon="add" onPress={handleAddPlayer}/>
      </Form>

      <HeaderList>
        <FlatList 
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter 
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
      </HeaderList>
      {
        isLoading ? <Loading></Loading>: 
      
      <FlatList 
        data={players}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <PlayerCard 
            name={item.name} 
            onRemove={() => handlePlayerRemove(item.name)}
          />
        )}
        ListEmptyComponent={() => <ListEmpty message='Não há pessoas neste time.' />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          [{
            paddingBottom: 100
          }, players.length === 0 && {flex: 1}]
        }
      />
    }

      <Button title='Remover Turma' type='SECONDARY' onPress={handleGroupRemove}></Button>
    </Container>
  )
}