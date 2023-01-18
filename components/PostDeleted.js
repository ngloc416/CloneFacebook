import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const PostDeleted = () => {
  return (
    <View style={styles.container}>
      <View styled={styles.postDeletedWrapper}>
        <View style={styles.postDeletedNotice}><Text style={styles.postDeletedNoticeText}>Xóa bài viết?</Text></View>
        <View style={styles.postDeletedContent}>
          <Text style={styles.postDeletedContentText}>Bạn có thể chỉnh sửa bài viết nếu cần thay đổi.</Text>
        </View>
        <View style={styles.postDeletedButtonRow}>
          <TouchableOpacity>
            <Text style={styles.postDeletedButtonRowDeletedText}>XÓA</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.postDeletedButtonRowText}>CHỈNH SỬA</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.postDeletedButtonRowText}>HỦY</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default PostDeleted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: screenWidth,
    height: screenHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postDeletedWrapper: {
    width: 100,
    height: 100,
    padding: 15,
    backgroundColor: '#333',
    flexDirection: 'row',
    borderColor: 'black',
    border: 10,
  },
  postDeletedNotice: {
    marginTop: 15,
    marginLeft: 15,
  },
  postDeletedNoticeText: {
    fontSize: 18,
  },
  postDeletedContent: {
    marginTop: 15,
    marginLeft: 15,
  },
  postDeletedButtonRow: {
    marginTop: 15,
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  postDeletedButtonRowText: {
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
  },
  postDeletedButtonRowDeletedText: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 16,
    color: 'blue',
  }
});