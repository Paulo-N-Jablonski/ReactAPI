import axios from "axios"
import { useEffect, useState } from "react"
import { View, Text, FlatList, StyleSheet } from "react-native"
import { Post } from "../types/Post"
import Card from "../components/Card"
import { SafeAreaView } from 'react-native-safe-area-context';
import { baseUrl } from "../utils/constants"

const Posts = () => {

    const [postList, setPostList] = useState<Post[]>([])

    const getPosts = async () => {
        try {

            const response = await axios.get<Post[]>(
                `${baseUrl}/posts`
            )

            setPostList(response.data)

        } catch(error) {

            console.error(error)
        }
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Posts
            </Text>
            <FlatList 
                data={postList}
                renderItem={({item}) => <Card post={item}/>}
                keyExtractor={(item) => item.id.toString()}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: '#000'
    }
})

export default Posts