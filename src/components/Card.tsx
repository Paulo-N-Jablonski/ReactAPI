import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Post } from "../types/Post";
import { Comments } from "../types/Post";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/constants";

interface Props {
  post: Post;
}

const Card = ({ post }: Props) => {

  const [openComment, setOpenComment] = useState(false);
  const [commentsList, setCommentsList] = useState<Comments[]>([]);

  const getComments = async () => {
    try {
      const response = await axios.get<Comments[]>(
        `${baseUrl}/comments?postId=${post.id}`
      );
      setCommentsList(response.data);
      setOpenComment(!openComment);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpen = async () => {
    if (!openComment) {
      await getComments();
    }

    setOpenComment(!openComment);
  };

  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#000",
          marginTop: 10
        }}
      />
    );
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>
      <TouchableOpacity onPress={handleOpen}>
        <AntDesign style={styles.icon} name="message1" size={32} color="#000" />
      </TouchableOpacity>
      {openComment && (
        <FlatList
          data={commentsList}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.comment}>
                {item.name} - {item.email}
              </Text>
              <Text style={styles.comment}>{item.body}</Text>
            </View>
          )}
          ItemSeparatorComponent = { FlatListItemSeparator }
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    padding: 10,
    margin: 20
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10
  },
  body: {
    fontSize: 18,
    marginBottom: 10
  },
  comment: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 5
  },
  icon: {
    alignSelf: 'flex-end'
  }
});

export default Card;
