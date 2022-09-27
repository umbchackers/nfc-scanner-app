import { StyleSheet } from "react-native";

export default navbarStyle = StyleSheet.create({
    navbarView: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      padding: 15,
      backgroundColor: "#000000",
    },
    navbarHeaderText: {
      fontSize: 25,
      textAlign: "center",
      color: "#ffffff",
      backgroundColor: "#000000",
    },
    loginText: {
        fontSize: 25,
        textAlign: "center",
        color: "#000000",
    },
    loginWindow: {
        alignItems: "center",
    },
    loginTextInput: {
        width: "60%",
        color: "#000000",
        borderWidth: 2,
        borderColor: "#000000",
    },
    loginButton: {
        width: 15,
    },
    homeLogo: {
        flex: 1,
        width: null,
        height: 350,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 5,
        alignItems: "center",
    },
    modalText: {
        color: "black"
    },
    optionView: {
        marginTop: 10,
        backgroundColor: "grey",
        borderRadius: 20,
        padding: 5,
        alignItems: "center",
    }
});