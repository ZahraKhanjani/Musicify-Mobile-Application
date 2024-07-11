import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {Icon, Text} from 'components/index';
import {connect} from 'react-redux';
import {addToQueue} from '../Player/playerActions';
import {saveSongRequest} from 'components/SavedSongs/savedSongsActions';
import {useSafeArea} from 'react-native-safe-area-context';
import {PlaylistApi} from 'api/index';
import {UIActivityIndicator} from 'react-native-indicators';
import {getAndSetPlaylists} from '../Playlist/playlistsActions';
import {ConfirmationModal, EditPlaylistModal} from 'components/index';

function PlaylistMoreModal(props) {
  const insets = useSafeArea();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const {playlist} = props.route.params;
  function deletePlaylist() {
    setIsDeleting(true);
    PlaylistApi.deletePlaylist(playlist?.id)
      .then(() => {
        getAndSetPlaylists();
        props.navigation.pop();
      })
      .finally(() => {
        setIsDeleting(false);
      });
  }
  const ActionSeparator = () => <View style={styles.separator} />;
  return (
    <View style={styles.flexView}>
      <View style={[styles.container]}>
        <BlurView
          blurRadius={15}
          downsampleFactor={5}
          overlayColor={'rgba(18,28,70, 0.2)'}
          style={[styles.blurView]}
          blurType="dark"
          blurAmount={16}
        />
        <View
          style={{
            width: '100%',
          }}>
          <TouchableOpacity
            onPress={() => {
              setIsConfirmModalOpen(true);
            }}>
            <View style={{flexDirection: 'row'}}>
              {isDeleting ? (
                <View>
                  <UIActivityIndicator color="white" size={20} />
                </View>
              ) : (
                <Icon
                  name="remove-circle-outline"
                  size={24}

                  color="#fff"
                />
              )}
              <Text style={{marginLeft: 24, fontSize: 20, color: 'white'}}>
                {isDeleting ? 'Deleting' : 'Delete'}
              </Text>
            </View>
          </TouchableOpacity>
          <ActionSeparator />
          <TouchableOpacity
            onPress={() => {
              setIsEditModalOpen(true);
            }}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="edit" size={24}  color="#fff" />
              <Text style={{marginLeft: 24, fontSize: 20, color: 'white'}}>
                Edit Name
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => {
            props.navigation.pop();
          }}
          style={[
            styles.close,
            {
              bottom: insets.bottom,
            },
          ]}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        <ConfirmationModal
          title={'Delete Playlist'}
          visible={isConfirmModalOpen}
          onClose={() => {
            setIsConfirmModalOpen(false);
          }}
          isRequesting={isDeleting}
          onConfirm={deletePlaylist}
          confirmationText={`Delete Playlist '${playlist?.name}'?`}
          confirmButtonText={'Delete'}
        />
        <EditPlaylistModal
          defaultValue={playlist?.name}
          playlistId={playlist?.id}
          visible={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
          }}
          onSuccess={() => {
            props.navigation.pop();
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  flexView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  container: {
    height: '30%',
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    paddingHorizontal: 35,
    paddingTop: 32,
  },
  close: {
    height: 59,
    position: 'absolute',
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderColor: '#14192D',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  closeButtonText: {fontSize: 20, color: '#6E6E6E', marginLeft: 4},
  blurView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(18,28,70, 0.2)',
  },
  actionText: {
    marginLeft: 24,
    fontSize: 20,
    color: 'white',
  },
  separator: {
    marginTop: 20,
  },
});
export default connect(
  null,
  {
    addToQueue,
    saveSongRequest,
  },
)(PlaylistMoreModal);
