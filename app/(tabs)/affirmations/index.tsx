import { AppGradient, GuidedAffirmationsGallery } from "@/components";
import AFFIRMATION_GALLERY from "@/constants/affirmation-gallery";
import { ScrollView, Text, View } from "react-native";

export default function Affirmations() {
  return (
    <View className="flex-1">
      <AppGradient colors={["#2E1F58", "#54426B", "#A790AF"]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className="text-zinc-50 text-3xl font-bold">
            Change your beliefs withy affirmations
          </Text>
          <View>
            {AFFIRMATION_GALLERY.map((g) => {
              return (
                <GuidedAffirmationsGallery
                  key={g.title}
                  title={g.title}
                  previews={g.data}
                />
              );
            })}
          </View>
        </ScrollView>
      </AppGradient>
    </View>
  );
}
