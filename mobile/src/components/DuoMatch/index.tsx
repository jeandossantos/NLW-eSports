import {
  ActivityIndicator,
  Alert,
  Modal,
  ModalProps,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ClipBoard from 'expo-clipboard';

import { styles } from './styles';
import { THEME } from '../../theme';
import { CheckCircle } from 'phosphor-react-native';
import { Heading } from '../Heading';
import { useState } from 'react';

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
  const [isCopying, setIsCopying] = useState(false);

  async function handleCopyDiscordToClipBoard() {
    setIsCopying(true);
    await ClipBoard.setStringAsync(discord);
    setIsCopying(false);

    Alert.alert(
      'Discord copiado!',
      'Você já pode colar no Discord e adicionar seu duo!'
    );
  }

  return (
    <Modal animationType="fade" transparent statusBarTranslucent {...rest}>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon}>
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
              onPress={onClose}
            />
          </TouchableOpacity>
          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />
          <Heading
            title="Let's Play"
            subtitle="Agora é só começar a jogar!"
            style={{ alignItems: 'center', marginTop: 24 }}
          />
          <Text style={styles.label}>Adicionar no Discord</Text>

          <TouchableOpacity
            style={styles.discordButton}
            onPress={handleCopyDiscordToClipBoard}
            disabled={isCopying}
          >
            <Text style={styles.discord}>
              {isCopying ? <ActivityIndicator /> : discord}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
