// @flow
import React from 'react';
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
import {Icon, GradientButton} from 'components/index';

type PropsType = {
  visible: boolean,
  onClose: Function,
  onConfirm: Function,
  confirmationText: string,
  confirmButtonText: string,
  title: string,
};
function ConfirmationModal({
  visible,
  confirmationText,
  confirmButtonText,
  onConfirm,
  onClose,
  title,
}: PropsType) {
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
                <Icon name="close" size={30}  color="#B5B5B5" />
              </TouchableOpacity>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.modalText}>{confirmationText}</Text>
              <View
                style={{
                  flexDirection: 'row-reverse',
                  justifyContent: 'space-around',
                  paddingHorizontal: 18,
                  marginTop: 16,
                  alignItems: 'center',
                }}>
                <GradientButton
                  onPress={onClose}
                  containerStyle={styles.cancelButton}
                  textStyle={styles.cancelText}
                  text="Cancel"
                />
                <TouchableOpacity
                  onPress={() => {
                    onConfirm();
                    onClose();
                  }}>
                  <Text style={styles.confirmButtonText}>
                    {confirmButtonText}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
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
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    height: 200,
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
  cancelButton: {
    height: 40,
    width: 100,
  },
  cancelText: {
    fontSize: 16,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  confirmButtonText: {
    alignSelf: 'center',
    textAlign: 'left',
    fontSize: 16,
  },
  modalText: {
    marginTop: 32,
    marginBottom: 15,
    textAlign: 'left',
    fontSize: 16,
  },
  closeIcon: {
    position: 'absolute',
    right: 25,
    top: 18,
    zIndex: 100,
  },
});
export default ConfirmationModal;
