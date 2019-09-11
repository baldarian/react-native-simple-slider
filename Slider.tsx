import React, { ReactNode, useState, Children, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

type Props = {
  slides: ReactNode[];
};

function Slider(props: Props) {
  const [slideWidth, setSlideWidth] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollView = useRef(null);

  function handleLayout(event: LayoutChangeEvent) {
    setSlideWidth(event.nativeEvent.layout.width);
  }

  function handleScrollEnd(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const newSlide = Math.round(event.nativeEvent.contentOffset.x / slideWidth);
    setCurrentSlide(newSlide);
  }

  function goToSlide(currentSlide: number) {
    scrollView.current.scrollTo({
      x: slideWidth * currentSlide,
      animated: true,
    });

    setCurrentSlide(currentSlide);
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        onLayout={handleLayout}
        onMomentumScrollEnd={handleScrollEnd}
        ref={scrollView}
        showsHorizontalScrollIndicator={false}>
        {Children.map(props.slides, slide => (
          <View style={[styles.slide, { width: slideWidth }]}>{slide}</View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.backButtonWrapper}
        onPress={() =>
          goToSlide(
            currentSlide - 1 < 0 ? props.slides.length - 1 : currentSlide - 1,
          )
        }>
        <View style={[styles.arrow, styles.arrowLeft]}></View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.forwardButtonWrapper}
        onPress={() =>
          goToSlide(
            currentSlide + 1 > props.slides.length - 1 ? 0 : currentSlide + 1,
          )
        }>
        <View style={[styles.arrow, styles.arrowRight]}></View>
      </TouchableOpacity>
      <View style={styles.bullets}>
        {Children.map(props.slides, (_, index) => (
          <TouchableOpacity
            style={[
              styles.bullet,
              {
                backgroundColor: currentSlide === index ? '#2980a5' : '#7BB2CA',
              },
            ]}
            onPress={() => goToSlide(index)}></TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width: 0,
    height: '100%',
  },
  bullets: {
    position: 'absolute',
    bottom: '5%',
    width: '100%',
    height: '1.7%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bullet: {
    aspectRatio: 1,
    height: '100%',
    borderRadius: 50,
    marginRight: '1.7%',
  },
  arrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#2980a5',
  },
  arrowLeft: {
    transform: [{ rotate: '-90deg' }],
  },
  arrowRight: {
    transform: [{ rotate: '90deg' }],
  },
  backButtonWrapper: {
    position: 'absolute',
    left: '5%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  forwardButtonWrapper: {
    position: 'absolute',
    right: '5%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Slider;
