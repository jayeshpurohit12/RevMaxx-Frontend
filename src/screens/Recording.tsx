import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Animated,
  Easing,
  Modal,
  Linking,
} from 'react-native';
import RNFS from 'react-native-fs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import React, {useState, useEffect, useRef} from 'react';
import {COLORS, FONT} from '../themes/themes';
import Card from '../components/shared/Card';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import axios from 'axios';
import {useNavigation, useRoute} from '@react-navigation/native';
import {scale, verticalScale} from '../constants/Layout';
import {Bar} from 'react-native-progress';
import Voice from '@react-native-community/voice';
import ScribeModal from '../components/interface/ScribeModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFetchRefreshToken, useFetchSubscription} from './hooks';
import {useMutation} from 'react-query';
import {generateChart} from '../api';
import {formatTime} from '../utils/helper';
import Button from '../components/shared/Button';

const audioRecorderPlayer = new AudioRecorderPlayer();

export default function Recording() {
  const navigation = useNavigation();

  const micBlinkAnimation = useRef(new Animated.Value(0)).current;

  const {data: subscription} = useFetchSubscription();

  console.log('subscription:', subscription);

  const [startRecord, setStartRecord] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [audioLevel, setAudioLevel] = useState(0);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [recordState, setRecordState] = useState({
    recordSecs: 0,
    recordTime: '00:00',
    currentPositionSec: 0,
    currentDurationSec: 0,
    playTime: '00:00',
    duration: '00:00',
  });
  const [isScribing, setIsScribing] = useState(false);

  const {mutate: generateChartsMutate} = useMutation({
    mutationFn: formData => generateChart(formData),
    onSuccess: () => {
      setIsScribing(false);
      setStartRecord(false);
      navigation.navigate('Charts');
    },
    onError: () => {
      setIsScribing(false);
      setStartRecord(false);
    },
  });

  const animatedStyle = {
    transform: [{scale: micBlinkAnimation}],
    opacity: micBlinkAnimation.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 1, 0],
    }),
  };

  const startListening = async () => {
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.error(error);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      console.error(error);
    }
  };

  //I am currently experiencing a fever and I need of medical attention. I have been feeling unwell with symptoms such as high fever.

  useEffect(() => {
    let interval;
    if (startRecord && isPlaying) {
      interval = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlaying, startRecord]);

  useEffect(() => {
    // Start mic blinking animation when recording starts
    if (isPlaying) {
      setIsPlaying(true);
      micBlinkAnimation.setValue(1);

      Animated.loop(
        Animated.sequence([
          Animated.timing(micBlinkAnimation, {
            toValue: 2,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
          Animated.timing(micBlinkAnimation, {
            toValue: 0,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
        ]),
      ).start(() => {
        // Animation completed
        setIsPlaying(false);
      });
    } else {
      // Stop mic blinking animation when recording stops
      micBlinkAnimation.setValue(1);
    }
  }, [isPlaying, micBlinkAnimation]);

  useEffect(() => {
    // await Voice.start('en-US');
    Voice.onSpeechStart = () => {
      setIsPlaying(true);
    };

    Voice.onSpeechEnd = () => {
      setIsPlaying(false);
    };

    Voice.onSpeechVolumeChanged = e => {
      // Update audio level in state

      setAudioLevel(e.value);
    };

    return async () => {
      console.log('voice destroyed');

      // Clean up listeners
      Voice.destroy();
    };
  }, []);

  useEffect(() => {
    if (isScribing) {
      stopListening();
      setIsPlaying(false);
    }
  }, [isScribing]);

  const startRecording = async () => {
    setStartRecord(true);
    const result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener(e => {
      setRecordState({
        ...recordState,
        recordSecs: e.currentPosition,
        recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
      });
    });
    console.log(result, 'startRecording');
  };

  const getAudioFile = async (result: any) => {
    console.log('Path:', result);
    setIsScribing(true);
    const formData = new FormData();
    formData.append('file', {
      uri: result,
      type: 'audio/m4a',
      name: 'sound.m4a',
    });

    generateChartsMutate(formData);
  };

  const stopRecording = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordState({
      ...recordState,
      recordSecs: 0,
    });
    console.log(result, 'stopRecording');
    setElapsedTime(0);
    getAudioFile(result);
  };

  const onStartPlay = async () => {
    console.log('onStartPlay');
    const msg = await audioRecorderPlayer.startPlayer();
    audioRecorderPlayer.addPlayBackListener(e => {
      setRecordState(prevState => ({
        ...prevState,
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      }));
    });
    console.log(msg);
  };

  const handleCapture = () => {
    if (subscription?.subscription_status === false) {
      setShowSubscriptionModal(true);
    } else {
      startRecording();
      onStartPlay();
      setIsPlaying(true);
      startListening();
    }
  };

  const handleContact = async () => {
    try {
      const url = 'https://revmaxx.co/contact/';

      await Linking.openURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'center',
        }}>
        {!startRecord ? (
          <>
            <TouchableOpacity
              style={styles.captureContainer}
              activeOpacity={0.9}
              onPress={handleCapture}>
              <Feather name="mic" size={scale(23)} color={COLORS.grey} />
              <Text style={styles.captureTitle}>CAPTURE CONVERSATION</Text>
            </TouchableOpacity>
            <Text style={styles.bottomText}>
              Click the button to start the visit
            </Text>
          </>
        ) : (
          <>
            <View
              style={{
                alignItems: 'center',
                gap: 4,
              }}>
              <Text style={[styles.textRecord, {fontSize: 24}]}>
                {formatTime(elapsedTime)}
              </Text>
              <Text style={styles.textRecord}>Recording</Text>
            </View>

            <Animated.View style={styles.recordingContainer}>
              <TouchableOpacity
                style={[styles.captureContainer, styles.endVisitContainer]}
                activeOpacity={0.9}
                onPress={() => {
                  stopRecording();
                  stopListening();
                  Voice.destroy();
                }}>
                <Animated.View style={animatedStyle}>
                  <Feather
                    name="mic"
                    size={scale(20)}
                    color={isPlaying ? COLORS.primary : COLORS.grey}
                  />
                </Animated.View>
                <Text style={styles.captureTitle}>END VISIT</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.playPauseContainer}
                onPress={() => {
                  setIsPlaying(!isPlaying);
                  isPlaying ? stopListening() : startListening();
                }}
                activeOpacity={0.8}>
                <Ionicons
                  name={isPlaying ? 'pause-sharp' : 'play'}
                  size={scale(22)}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </Animated.View>

            <Bar
              progress={audioLevel}
              width={200}
              style={{marginTop: scale(20)}}
            />
          </>
        )}

        <View>
          <ScribeModal isScribing={isScribing} />
        </View>

        <View>
          <Modal
            visible={showSubscriptionModal}
            animationType="fade"
            transparent={true}>
            <TouchableOpacity
              style={styles.outerContainer}
              activeOpacity={1}
              onPress={() => setShowSubscriptionModal(false)}>
              <View style={styles.innerContainer}>
                <Button name="Contact sales" onPress={handleContact} />
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: FONT.bold,
    fontSize: 20,
    color: COLORS.mediumGreyText,
    textAlign: 'center',
  },
  des: {
    fontFamily: FONT.regular,
    fontSize: 14,
    color: COLORS.greyText,
    textAlign: 'center',
  },
  textRecord: {
    fontFamily: FONT.bold,
    fontSize: 16,
    color: COLORS.primary,
    textAlign: 'center',
  },
  captureContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
    borderRadius: scale(50),
    backgroundColor: COLORS.white,
    borderColor: COLORS.white,
    shadowColor: COLORS.grey,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.53,
    shadowRadius: 2.62,
  },
  captureTitle: {
    marginLeft: scale(10),
    fontFamily: FONT.bold,
    fontWeight: '400',
    fontSize: scale(14),
    color: '#000000de',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomText: {
    marginTop: scale(20),
    fontFamily: FONT.regular,
    fontSize: scale(12),
  },
  endVisitContainer: {
    marginRight: scale(25),
  },
  playPauseContainer: {
    borderWidth: 1,
    borderRadius: scale(50),
    padding: scale(10),
    backgroundColor: COLORS.white,
    borderColor: COLORS.white,
    shadowColor: COLORS.grey,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.53,
    shadowRadius: 2.62,
  },
  recordingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(50),
  },
  outerContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    height: scale(100),
    width: scale(240),
    borderWidth: 1,
    backgroundColor: COLORS.white,
    borderColor: COLORS.white,
    shadowColor: COLORS.black,
    borderRadius: scale(16),
    padding: scale(16),
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
});
