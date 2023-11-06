import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styleSheet } from "./style";
import moment from "moment";

const FatigueListCard = ({ style, data, handleOnPress }) => {
  const styles = styleSheet({ data });
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.5}
        style={{ ...style, ...styles.container }}
        onPress={handleOnPress}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.ticketNumber}>
            {data.User.nrp} - {data.User.fullName}
          </Text>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.bodyProp}>
            <Text style={styles.property}>Status</Text>
            <Text style={styles.property}>Date</Text>
            <Text style={styles.property}>Note</Text>
          </View>

          <View style={styles.bodySeparator}>
            <Text>:</Text>
            <Text>:</Text>
            <Text>:</Text>
          </View>

          <View style={styles.bodyValue}>
            <View style={styles.valueContainer}>
              <View style={styles.statusDot}></View>
              <Text>
                {data.FatigueStatusAfter
                  ? data.FatigueStatusAfter.name
                  : data.FatigueStatusBefore.name}
              </Text>
            </View>
            <Text>{moment(data.submittedDate).format("YYYY-MM-DD")}</Text>
            <Text>{data.superiorApprovalNote}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default FatigueListCard;
