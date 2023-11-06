import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { useMainLayout } from "../../../contexts";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAxios } from "../../../hooks";
import { fatigueService } from "../../../services";
import { FatigueListCard } from "../../../components";
import { styleSheet } from "./style";

const FatigueListScreen = () => {
  const styles = styleSheet();
  const { setLayoutTitle } = useMainLayout();
  const navigation = useNavigation();
  const route = useRoute();
  const getDataApproval = useAxios();
  const getDataAllowed = useAxios();

  const [routeName, setRouteName] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const getDataApprovalData = (statusCode) => {
    setRefreshing(true);
    const queryParams = { statusCode };
    getDataApproval.axiosFetch(fatigueService.getDataApproval(queryParams));
  };

  const getDataAllowedData = () => {
    setRefreshing(true);
    getDataAllowed.axiosFetch(fatigueService.getDataAllowed());
  };

  const handleOnRefresh = () => {
    if (routeName === "Dibawah Pengawasan") {
      getDataApprovalData("DPK");
    } else if (routeName === "Tidak Boleh Bekerja") {
      getDataApprovalData("TBB");
    } else if (routeName === "Kerja Normal") {
      getDataAllowedData();
    }
  };

  const handleOnPress = (id) => {
    const params = { id };
    navigation.navigate("FatigueDetail", params);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setLayoutTitle("Fatigue Approval");
      handleOnRefresh();
      setRouteName(route.name);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    handleOnRefresh();
  }, [routeName]);

  useEffect(() => {
    if (!getDataApproval.loading) {
      setRefreshing(false);
    }
  }, [getDataApproval.loading]);

  useEffect(() => {
    if (!getDataAllowed.loading) {
      setRefreshing(false);
    }
  }, [getDataAllowed.loading]);

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
          {getDataApproval.isSuccess &&
            getDataApproval.response.payload.map((item, index) => (
              <FatigueListCard
                key={index}
                style={styles.cardStyle}
                data={item}
                handleOnPress={() => handleOnPress(item.id)}
              />
            ))}

          {getDataAllowed.isSuccess &&
            getDataAllowed.response.payload.map((item, index) => (
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

export default FatigueListScreen;
