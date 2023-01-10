import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import Octicons from 'react-native-vector-icons/Octicons'

const screenWidth = Dimensions.get('screen').width;
const PostOption = () => {
  return (
    <View style={styles.container}>
      <View style={styles.postOptionsWrapper}>
        <TouchableOpacity style={styles.postOptionItemWrapper}>
          <View style={styles.postOptionItem}>
            <View style={styles.optionIcon}><FontAwesome5Icon name="bell" size={24}></FontAwesome5Icon></View>
            <View>
              <Text style={styles.postOptionTitle}>Tắt thông báo về bài viết này</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.postOptionItemWrapper}>
          <View style={styles.postOptionItem}>
            <View style={styles.optionIcon}><FontAwesome5Icon name="bookmark" size={24}></FontAwesome5Icon></View>
            <View>
              <Text style={styles.postOptionTitle}>Lưu bài viết</Text>
              <Text style={styles.postOptionSubtitle}>Thêm vào danh sách các muc đã lưu</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.postOptionItemWrapper}>
          <View style={styles.postOptionItem}>
            <View style={styles.optionIcon}><FontAwesome5Icon name="trash-alt" size={24}></FontAwesome5Icon></View>
            <View>
              <Text style={styles.postOptionTitle}>Xóa</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.postOptionItemWrapper}>
          <View style={styles.postOptionItem}>
            <View style={styles.optionIcon}><Octicons name="pencil" size={24}></Octicons></View>
            <View>
              <Text style={styles.postOptionTitle}>Chỉnh sửa bài viết</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.postOptionItemWrapper}>
          <View style={styles.postOptionItem}>
            <View style={styles.optionIcon}><FontAwesome5Icon name="clone" size={24}></FontAwesome5Icon></View>
            <View>
              <Text style={styles.postOptionTitle}>Sao chép liên kết</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PostOption;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: screenWidth
  },
  backdrop: {
    height: '100%',
    width: '100%',
    zIndex: 1
  },
  postOptionsWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: 2,
    padding: 15,
    backgroundColor: '#fff'
  },
  postOptionItemWrapper: {
      paddingBottom: 30
  },
  postOptionItem: {
      flexDirection: 'row',
      alignItems: 'center'
  },
  optionIcon: {
      width: 35,
      alignItems: 'center'
  },
  postOptionTitle: {
      fontSize: 16
  },
  postOptionSubtitle: {
      fontSize: 12
  }
});