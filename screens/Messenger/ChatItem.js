import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { BLACK_COLOR } from '../../constants/constants'

function ChatItem({ item }) {
  const time = Date.now() / 1000 - parseInt(item.lastmessage.created);

  return (
    <View style={styles.chatItemContainer}>
        <Image style={styles.chatIcon} source={{ uri: item.partner.avatar}}></Image>
        <View style={styles.chatDetailSectionContainer}>
            <Text style={styles.chatName}>{item.partner.username}</Text>
            <View style={styles.messageContainer}>
                <Text style={styles.chatMessage}>{item.lastmessage.message} •</Text>
                <Text style={{ color: BLACK_COLOR, fontSize: 13 }}>
                    {time < 1 * 60 * 60 ? 'Vừa xong' : null}
                    {time >= 1 * 60 * 60 && time < 24 * 60 * 60
                        ? `${Math.floor(time / 3600)} giờ`
                        : null}
                    {time >= 24 * 60 * 60 && time < 30 * 24 * 60 * 60
                        ? `${Math.floor(time / 86400)} ngày`
                        : null}
                    {time >= 30 * 24 * 60 * 60 && time < 12 * 30 * 24 * 60 * 60
                        ? `${Math.floor(time / 2592000)} tháng`
                        : null}
                    {time >= 12 * 30 * 24 * 60 * 60
                        ? `${Math.floor(time / 31104000)} năm`
                        : null}
                </Text>
            </View>
        </View>
    </View>
  )
}

export default ChatItem

const styles = StyleSheet.create({
   chatItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
   },
   chatIcon: {
    width: 60,
    height: 60,
    borderRadius: 100,
   },
   chatDetailSectionContainer: {
    marginLeft: 15,
   },
   chatName: {
    color: BLACK_COLOR,
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 22
   },
   messageContainer: {
    color: BLACK_COLOR,
    opacity: 0.5,
    fontWeight: '400',
    display: 'flex',
    flexDirection: 'row'
   },
   chatMessage: {
    marginRight: 5
   }
  });
  