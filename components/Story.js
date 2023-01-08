import { StyleSheet, Text, View, ScrollView, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const screenWidth = Dimensions.get('screen').width;

const StoryCard = () => {
  return (
    <ScrollView
    horizontal={true}
    showsHorizontalScrollIndicator={false}
    style={styles.container}>
        <View style={styles.thirdStory}>
                <View style={styles.image}>
                    <Image
                    source={require('../assets/avatar.webp')}
                    style={{
                        width: 110,
                        height: 135,
                        resizeMode: 'cover',
                        borderTopRightRadius: 15,
                        borderTopLeftRadius: 15,
                    }}
                    />
                </View>
                <View style={styles.textView}>
                    <Ionicons name="add-circle" color="royalblue" size={28} style={{marginTop: -28}}/>
                    <Text style={styles.text}>
                      Tạo tin
                    </Text>
                </View>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: screenWidth
  },
  thirdStory: {
    backgroundColor: '#e9e9e9',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: 110,
    height: 190,
    borderRadius: 15,
    margin: 7,
  //  left: 5
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  textView: {
      width: 110,
      height: 50,
      justifyContent:'center',
      alignItems: 'center',
  },
  text: {
      color: '#000',
      fontWeight: '400'
  },
  topView: {
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
      backgroundColor: 'white',
      width: 35,
      height: 35,
      borderRadius: 30,
      margin: 10,
      marginLeft: 5
  },
  bottomText: {
    height: 40,
    marginTop: -30
  },
  text2: {
      fontWeight: '500',
      fontSize: 13,
      left: 5
  }
});

export default StoryCard;