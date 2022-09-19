import { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { Background } from '../../components/Background';
import { styles } from './styles';
import { THEME } from '../../theme';
import logoImg from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/Heading';
import { DuoCard } from '../../components/DuoCard';
import { api } from '../../services/api';
import { DuoMatch } from '../../components/DuoMatch';

interface GameParams {
  id: string;
  title: string;
  bannerUrl: string;
}

interface Duo {
  id: string;
  name: string;
  yearsPlaying: number;
  hoursStart: string;
  hoursEnd: string;
  weekDays: string[];
  useVoiceChannel: boolean;
}

export function Game() {
  const route = useRoute();
  const navigation = useNavigation();

  const game = route.params as GameParams;
  const [duos, setDuos] = useState<Duo[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState('');

  useEffect(() => {
    api.get(`/games/${game.id}/ads`).then((resp) => setDuos(resp.data));
  }, []);

  function handleGoBack() {
    return navigation.goBack();
  }

  async function getDiscordUser(adId: string) {
    api
      .get(`/ads/${adId}/discord`)
      .then((resp) => setDiscordDuoSelected(resp.data.discord));
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />
        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.containerList}
          contentContainerStyle={[
            duos.length > 0 ? styles.contentList : styles.emptyListContent,
          ]}
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard
              onConnect={() => {
                getDiscordUser(item.id);
              }}
              data={item}
            />
          )}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados no momento.
            </Text>
          )}
        />
        <DuoMatch
          discord={discordDuoSelected}
          visible={discordDuoSelected.length > 0}
          onClose={() => setDiscordDuoSelected('')}
        />
      </SafeAreaView>
    </Background>
  );
}
