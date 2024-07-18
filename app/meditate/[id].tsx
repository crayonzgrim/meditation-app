import { ImageBackground, Pressable, Text, View } from "react-native";

import { AppGradient, CustomButton } from "@/components";
import MEDIATATION_IMAGES from "@/constants/meditation-images";
import { AUDIO_FILES, MEDITATION_DATA } from "@/constants/meditationData";
import { TimerContext } from "@/context/TimerContext";
import { AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { router, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";

export default function Meditate() {
  const { id } = useLocalSearchParams();

  const { duration, setDuration } = useContext(TimerContext);
  // const [duration, setDuration] = useState(10);
  const [isMeditating, setIsMeditating] = useState(false);
  const [audioSound, setAudioSound] = useState<Audio.Sound>();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (duration === 0) {
      setIsMeditating(false);
      return;
    }

    if (isMeditating) {
      timerId = setTimeout(() => {
        setDuration(duration - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [duration, isMeditating]);

  useEffect(() => {
    return () => {
      audioSound?.unloadAsync();
    };
  }, [audioSound]);

  const toggleMeditationSessionStatus = async () => {
    if (duration === 0) setDuration(10);

    setIsMeditating(!isMeditating);
    await toggleSound();
  };

  const toggleSound = async () => {
    const sound = audioSound ?? (await initializeSound());

    const status = await sound?.getStatusAsync();

    if (status?.isLoaded && !isPlaying) {
      await sound.playAsync();
      setIsPlaying(true);
    } else {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  const initializeSound = async () => {
    const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;

    const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName]);
    setAudioSound(sound);

    return sound;
  };

  const formattedTimeMinutes = String(Math.floor(duration / 60)).padStart(
    2,
    "0",
  );

  const formattedSeconds = String(duration % 60).padStart(2, "0");

  const handleAdjustDuration = () => {
    if (isMeditating) toggleMeditationSessionStatus();

    router.push("/(modal)/adjust-meditation-duration");
  };

  return (
    <View className="flex-1">
      <ImageBackground
        source={MEDIATATION_IMAGES[Number(id) - 1]}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={["transparent", "rgba(0,0,0,0.8)"]}>
          <Pressable onPress={() => router.back()}>
            <AntDesign name="leftcircleo" size={50} color={"white"} />
          </Pressable>

          <View className="flex-1 justify-center">
            <View className="mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center">
              <Text className="text-4xl text-blue-800 font-rmono">
                {formattedTimeMinutes}:{formattedSeconds}
              </Text>
            </View>
          </View>

          <View className="mb-5">
            <CustomButton
              title={"Adjust duration"}
              onPress={handleAdjustDuration}
            />

            <CustomButton
              title={isMeditating ? "Stop" : "Start Meditation"}
              onPress={toggleMeditationSessionStatus}
              containerStyles={"mt-4"}
            />
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  );
}
