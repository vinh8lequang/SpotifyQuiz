import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    QuestionText:{
        marginTop: 20,
        color: 'black',
        fontSize: 17,
        textAlign: 'center',
        fontWeight: "bold"
    },
    image: {
        marginTop: 20,
        width: 260,
        height: 260,
        alignContent: "center",
        justifyContent: "center",
        borderRadius: 0,
    },
    textAwnser: {
        color: 'black',
        fontSize:15

    },
    button:{
        width: 360,
        marginTop: 15,
        borderRadius: 10,
        backgroundColor:"white",
        height: 55,
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
    }
})



export default styles;