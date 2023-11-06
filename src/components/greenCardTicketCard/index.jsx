import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styleSheet } from "./style";
import moment from "moment";

const GreenCardTicketCard = ({ style, data, showPic, handleOnPress }) => {
  const styles = styleSheet({ showPic });
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.5}
        style={{ ...style, ...styles.container }}
        onPress={handleOnPress}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.ticketNumber}>{data.number}</Text>
          <Text>{moment(data.createdAt).format("YYYY-MM-DD HH:mm:ss")}</Text>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.bodyProp}>
            <Text style={styles.property}>Project</Text>
            <Text style={styles.property}>Hazard Type</Text>
            <Text style={styles.property}>Identified Date</Text>
            <Text style={styles.property}>Reported By</Text>
            {showPic && <Text style={styles.property}>PIC</Text>}
            {showPic && <Text style={styles.property}>Progress</Text>}
          </View>

          <View style={styles.bodySeparator}>
            <Text>:</Text>
            <Text>:</Text>
            <Text>:</Text>
            <Text>:</Text>
            {showPic && <Text>:</Text>}
            {showPic && <Text>:</Text>}
          </View>

          <View style={styles.bodyValue}>
            <Text>{data.Project.name}</Text>
            <Text>{data.Finding.name}</Text>
            <Text>{moment(data.hazardDate).format("YYYY-MM-DD HH:mm:ss")}</Text>
            <Text>{data.CreatorUser.fullName}</Text>
            {showPic && <Text>{data.PicUser.fullName}</Text>}
            {showPic && <Text>{data.progressPercentage}%</Text>}
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default GreenCardTicketCard;
