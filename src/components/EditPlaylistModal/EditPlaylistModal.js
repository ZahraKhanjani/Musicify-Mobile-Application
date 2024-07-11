// @flow
import React, {useRef, useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {UIActivityIndicator} from 'react-native-indicators';
import {PlaylistApi} from 'api/index';
import {getAndSetPlaylists} from 'screens/Playlist/playlistsActions';
import {Icon, Input} from 'components/index';
type PropsType = {
  visible: boolean,
  onClose: Function,
  onSuccess?: Function,
  defaultValue: string,
  playlistId: string,
};
function EditPlaylistModal({
  visible,
  onClose,
  onSuccess = () => {},
  defaultValue,
  playlistId,
}: PropsType) {
  const input = useRef();
  const [playlistName, setPlaylistName] = useState(defaultValue);
  const [isRequesting, setIsRequesting] = useState(false);

  function editPlaylist() {
    setIsRequesting(true);
    PlaylistApi.editPlaylist(playlistId, playlistName)
      .then(res => {
        getAndSetPlaylists();
        onClose(); //todo show global modal and update playlists
        onSuccess();
      })
      .catch(error => {
        console.log({error}); //todo
      })
      .finally(() => {
        setIsRequesting(false);
      });
  }
  useEffect(() => {
    if (input && input.current) {
      input.current.focus();
    }
  }, [defaultValue, visible]);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        // Alert.alert('Modal has been closed.');
      }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
                <Icon name="close" size={30} color="#B5B5B5" />
              </TouchableOpacity>
              <Text style={styles.title}>Edit Playlist</Text>
              <Input
                ref={input}
                containerStyle={{paddingHorizontal: 0, marginTop: 40}}
                placeholder="Playlist Name"
                defaultValue={defaultValue || ''}
                value={playlistName}
                onChangeText={setPlaylistName}
              />
            </View>
            <TouchableOpacity disabled={isRequesting} onPress={editPlaylist}>
              <LinearGradient
                start={{x: 0.0, y: 1.0}}
                end={{x: 1.0, y: 0.0}}
                colors={['#DB007C', '#FF3737']}
                style={styles.createButton}>
                {isRequesting ? (
                  <View>
                    <UIActivityIndicator color="white" size={20} />
                  </View>
                ) : (
                  <Text style={{fontSize: 15, color: 'white', marginLeft: 8}}>
                    Edit
                  </Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    paddingHorizontal: 18,
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    height: 250,
    borderRadius: 19,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  createButton: {
    marginTop: -24,
    height: 48,
    width: 145,
    borderRadius: 24,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginTop: 8,
    marginBottom: 15,
    textAlign: 'left',
    fontSize: 19,
  },
  closeIcon: {
    position: 'absolute',
    right: 25,
    top: 18,
    zIndex: 100,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
});
export default EditPlaylistModal;
