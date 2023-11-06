import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, RefreshControl } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useMainLayout } from "../../../contexts";
import { styleSheet } from "./style";
import { useAxios } from "../../../hooks";
import { greenCardService } from "../../../services";
import { GreenCardTicketCard } from "../../../components";

const GreenCardTicketsScreen = () => {
  const styles = styleSheet();
  const { setLayoutTitle } = useMainLayout();
  const navigation = useNavigation();
  const route = useRoute();
  const getSubmitted = useAxios();
  const getOnProcess = useAxios();
  const getPicAssignment = useAxios();
  const getClosed = useAxios();
  const getRejectedMobile = useAxios();

  const [routeName, setRouteName] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const getSubmittedData = () => {
    setRefreshing(true);
    getSubmitted.axiosFetch(greenCardService.getSubmitted());
  };

  const getOnProcessData = () => {
    setRefreshing(true);
    getOnProcess.axiosFetch(greenCardService.getOnProcess());
  };

  const getPicAssignmentData = () => {
    setRefreshing(true);
    getPicAssignment.axiosFetch(greenCardService.getPicAssignment());
  };

  const getClosedData = () => {
    setRefreshing(true);
    getClosed.axiosFetch(greenCardService.getClosed());
  };

  const getRejectedMobileData = () => {
    setRefreshing(true);
    getRejectedMobile.axiosFetch(greenCardService.getRejectedMobile());
  };

  const handleOnRefresh = () => {
    if (routeName === "Submitted") {
      getSubmittedData();
    } else if (routeName === "On Process") {
      getOnProcessData();
    } else if (routeName === "Assignment") {
      getPicAssignmentData();
    } else if (routeName === "Closed") {
      getClosedData();
    } else if (routeName === "Rejected") {
      getRejectedMobileData();
    }
  };

  const handleOnPress = (type, id) => {
    const params = { type, id };
    navigation.navigate("GreenCardDetail", params);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (route.name === "Assignment") {
        setLayoutTitle("Green Card Assignment");
      } else {
        setLayoutTitle("Green Card Tickets");
      }
      handleOnRefresh();
      setRouteName(route.name);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    handleOnRefresh();
  }, [routeName]);

  useEffect(() => {
    if (!getSubmitted.loading) {
      setRefreshing(false);
    }
  }, [getSubmitted.loading]);

  useEffect(() => {
    if (!getOnProcess.loading) {
      setRefreshing(false);
    }
  }, [getOnProcess.loading]);

  useEffect(() => {
    if (!getPicAssignment.loading) {
      setRefreshing(false);
    }
  }, [getPicAssignment.loading]);

  useEffect(() => {
    if (!getClosed.loading) {
      setRefreshing(false);
    }
  }, [getClosed.loading]);

  useEffect(() => {
    if (!getRejectedMobile.loading) {
      setRefreshing(false);
    }
  }, [getRejectedMobile.loading]);

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
          {routeName === "Submitted" &&
            getSubmitted.isSuccess &&
            getSubmitted.response.payload.map((item, index) => (
              <GreenCardTicketCard
                key={index}
                style={styles.cardStyle}
                data={item}
                showPic={false}
                handleOnPress={() => handleOnPress("Submitted", item.id)}
              />
            ))}

          {routeName === "On Process" &&
            getOnProcess.isSuccess &&
            getOnProcess.response.payload.map((item, index) => (
              <GreenCardTicketCard
                key={index}
                style={styles.cardStyle}
                data={item}
                showPic={true}
                handleOnPress={() => handleOnPress("On Process", item.id)}
              />
            ))}

          {routeName === "Assignment" &&
            getPicAssignment.isSuccess &&
            getPicAssignment.response.payload.map((item, index) => (
              <GreenCardTicketCard
                key={index}
                style={styles.cardStyle}
                data={item}
                showPic={true}
                handleOnPress={() => handleOnPress("Assignment", item.id)}
              />
            ))}

          {routeName === "Closed" &&
            getClosed.isSuccess &&
            getClosed.response.payload.map((item, index) => (
              <GreenCardTicketCard
                key={index}
                style={styles.cardStyle}
                data={item}
                showPic={true}
                handleOnPress={() => handleOnPress("Closed", item.id)}
              />
            ))}

          {routeName === "Rejected" &&
            getRejectedMobile.isSuccess &&
            getRejectedMobile.response.payload.map((item, index) => (
              <GreenCardTicketCard
                key={index}
                style={styles.cardStyle}
                data={item}
                showPic={false}
                handleOnPress={() => handleOnPress("Rejected", item.id)}
              />
            ))}
          <View style={styles.emptySpace}></View>
        </ScrollView>
      </View>
    </>
  );
};

export default GreenCardTicketsScreen;
