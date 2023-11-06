import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { useMainLayout } from "../../../contexts";
import { useNavigation } from "@react-navigation/native";
import { styleSheet } from "./style";
import { useAxios } from "../../../hooks";
import { fatigueService } from "../../../services";
import { FatigueListCard } from "../../../components";

const SelfFatigueListScreen = () => {
  const styles = styleSheet();
  const { setLayoutTitle } = useMainLayout();
  const navigation = useNavigation();
  const getSelfData = useAxios();

  const [refreshing, setRefreshing] = useState(false);

  const handleGetSelfData = () => {
    setRefreshing(true);
    getSelfData.axiosFetch(fatigueService.getSelfData());
  };

  const handleOnRefresh = () => {
    handleGetSelfData();
  };

  const handleOnPress = (id) => {
    const params = { id, selfData: true };
    navigation.navigate("FatigueDetail", params);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setLayoutTitle("Fatigue List");
      handleOnRefresh();
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!getSelfData.loading) {
      setRefreshing(false);
    }
  }, [getSelfData.loading]);
  return (
    <>
      <View style={styles.screenContainer}>
        <ScrollView
          style={styles.scrollContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleOnRefresh}
            />
          }
        >
          {getSelfData.isSuccess &&
            getSelfData.response.payload.map((item, index) => (
              <FatigueListCard
                key={index}
                style={styles.cardStyle}
                data={item}
                handleOnPress={() => handleOnPress(item.id)}
              />
            ))}
        </ScrollView>
      </View>
    </>
  );
};

export default SelfFatigueListScreen;
