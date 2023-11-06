import React from "react";
import { Image, View } from "react-native";
import Carousel, { PaginationLight } from "react-native-x-carousel";
import { styleSheet } from "./style";

const CustomCarousel = (props) => {
  const styles = styleSheet();

  const renderItem = (data) => (
    <View key={data.source} style={styles.container}>
      <View style={styles.cardWrapper}>
        <Image style={styles.card} source={data.source} />
      </View>
    </View>
  );

  return (
    <>
      <Carousel
        pagination={PaginationLight}
        renderItem={renderItem}
        data={props.data}
        loop
        autoplay
        autoplayInterval={4000}
      />
    </>
  );
};

export default CustomCarousel;
