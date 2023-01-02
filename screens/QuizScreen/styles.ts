import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
      containerLifes: {
    flexDirection: "row-reverse",
    marginTop: 15,
    marginLeft: 10,
    marginBottom: 0,
  },
  lifeActive: {
    height: 17,
    width: 17,
    color: "red",
    marginBottom: 0,
  },
  lifeLoss: {
    height: 17,
    width: 17,
    marginBottom: 0,
    color:'#7F8487'
  },
  score: {
    marginRight: 100,
    fontWeight: "bold",
    color: 'white',
  },
    container: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    QuestionText:{
        marginTop: 20,
        color: 'white',
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
    ,
        buttonCorrect:{
        width: 360,
        marginTop: 15,
        borderRadius: 10,
        backgroundColor:"#ADE792",
        height: 55,
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
        buttonIncorrect:{
        width: 360,
        marginTop: 15,
        borderRadius: 10,
        backgroundColor:"#DC3535",
        height: 55,
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
    }
})



export default styles;