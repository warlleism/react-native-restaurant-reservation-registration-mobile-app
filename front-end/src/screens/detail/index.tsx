import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View, ImageSourcePropType, StyleSheet } from 'react-native';
import Arrow from 'react-native-vector-icons/AntDesign';

const { height } = Dimensions.get('window');

const Detail = () => {
  const navigation = useNavigation();

  const [centerImg, setCenterImg] = useState<ImageSourcePropType | undefined>(undefined);

  const data = [
    {
      id: 1,
      name: 'Cantinho Gourmet',
      img1: require('../../../assets/img1.png'),
      img2: require('../../../assets/img2.png'),
      img3: require('../../../assets/img3.png'),
      img4: require('../../../assets/img4.png'),
    },
  ];

  useEffect(() => {
    setCenterImg(require('../../../assets/img1.png'));
  }, []);

  return (
    <View style={{ height: '100%', padding: 15 }}>
      <TouchableOpacity
        style={styles.buttonContainer}
      >
        <Text style={styles.buttonText}>Reservar</Text>
      </TouchableOpacity>

      <ScrollView>
        {data.map((e) => {
          return (
            <View key={e.id} style={styles.container}>
              <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("/" as never)}>
                  <Arrow name="arrowleft" size={30} color="#33363F" />
                </TouchableOpacity>
                <Text style={styles.title}>{e.name}</Text>
                <View />
              </View>
              {centerImg ? (
                <Image source={centerImg} style={styles.image} />
              ) : (
                <Image source={e.img1} style={styles.image} />
              )}
              <View style={styles.thumbnailContainer}>
                <TouchableOpacity onPress={() => setCenterImg(e.img1)} style={styles.thumbnail}>
                  <Image source={e.img1} style={styles.thumbnailImage} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCenterImg(e.img2)} style={styles.thumbnail}>
                  <Image source={e.img2} style={styles.thumbnailImage} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCenterImg(e.img3)} style={styles.thumbnail}>
                  <Image source={e.img3} style={styles.thumbnailImage} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCenterImg(e.img4)} style={styles.thumbnail}>
                  <Image source={e.img4} style={styles.thumbnailImage} />
                </TouchableOpacity>
              </View>

              <View>
                <Text style={styles.title}>{e.name}</Text>
                <Text style={styles.description}>
                  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here'.
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    letterSpacing: -1,
    color: '#000000',
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 16,
    borderRadius: 10,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },
  thumbnail: {
    width: '23%',
    height: 60,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  buttonContainer: {
    width: '90%',
    height: height - 700,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#151515',
    zIndex: 2,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 50,
    letterSpacing: -2,
    fontWeight: '800',
    color: '#fff',
  },
  description: {
    fontSize: 14,
    color: '#000',
  },
});

export default Detail;
