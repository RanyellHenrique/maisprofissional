import { StyleSheet, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const colors = {
    white: "#FFFFFF",
    lightGray: "#F2F2F2",
    mediumGray: "#9E9E9E",
    darkGray: "#263238",
    black: "#000000",
    primary: "#407BEE",
    secondary: "#33569B",
    bluePill: "#407BFF61",
    red: "#DF5753",
    borderGray: "#E1E1E1",
    subTitleGray: "#CCCCCC"
}

const nav = StyleSheet.create({
    leftText: {
        color: colors.white,
        fontWeight: "bold",
        marginLeft: 5
    },
    leftTextPlus: {
        color: colors.white,
        fontWeight: "900",
        marginLeft: 10
    },
    drawer: {
        marginRight: 20
    },
    options: {
        width: deviceWidth,
        height: 120,
        backgroundColor: colors.primary,
        marginTop: 125,
        marginRight: -20,
        padding: 20,
        justifyContent: "space-between"

    },
    option: {
        paddingVertical: 5,
        width: deviceWidth,
    },
    textActive: {
        fontWeight: "bold"
    },
    textOption: {
        color: colors.white,
        textTransform: "uppercase"
    },
    logoutBtn: {
        width: 60,
        height: 30,
        borderWidth: 1,
        borderColor: colors.white,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 20
    },
    containerNav: {
        flexDirection: "row"
    }
})
const theme = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    card: {
        width: "100%",
        height: "100%",
        backgroundColor: colors.white,
        borderRadius: 20,
        alignItems: "center",
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        justifyContent: "space-around"
    },
    draw: {
        width: 313,
        height: 225
    },
    textContainer: {
        paddingHorizontal: 20
    },
    primaryButton: {
        height: 50,
        backgroundColor: colors.primary,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 10
    },
    primaryLoginButton: {
        width: 290,
        height: 50,
        backgroundColor: colors.primary,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 10
    },
    arrowContainer: {
        width: 50,
        height: 50,
        backgroundColor: colors.secondary,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    //productCard
    ofertaCard: {
        width: "100%",
        backgroundColor: colors.white,
        borderRadius: 10,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "space-around",
        elevation: 4

    },
    ofertaDescription: {
        width: "100%",
        padding: 20,
        borderTopColor: colors.lightGray,
        borderTopWidth: 1
    },
    priceContainer: {
        flexDirection: "row",
        marginTop: 10,
    },
    ofertaImg: {
        width: 140,
        height: 140,
        margin: 16
    },
    scrollContainer: {
        padding: 10
    },
    //Search Input
    inputContainer: {
        width: "100%",
        height: 60,
        backgroundColor: colors.white,
        borderRadius: 10,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginVertical: 12.5,
        alignItems: "center",
        paddingVertical: 10,
        elevation: 4
    },
    searchInput: {
        width: "90%",
        height: 40,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.borderGray

    },
    //Product Details
    detailsContainer: {
        backgroundColor: colors.lightGray,
        padding: 20
    },
    detailsCard: {
        width: "100%",
        height: "100%",
        backgroundColor: colors.white,
        borderRadius: 20,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        padding: 20
    },
    ofertaImageContainer: {
        width: "100%",
        borderWidth: 1,
        borderColor: colors.lightGray,
        alignItems: "center",
        borderRadius: 20
    },
    ofertaImage: {
        width: 220,
        height: 180
    },
    goBackContainer: {
        width: 290,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        justifyContent: "flex-start"
    },
    scrolltextContainer: {
        marginVertical: 10,
        padding: 20,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: colors.lightGray
    },
    //Login
    loginCard: {
        width: "100%",
        height: "100%",
        backgroundColor: colors.white,
        borderRadius: 20,
        alignItems: "center",
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        justifyContent: "center"
    },
    form: {
        marginVertical: 10
    },
    passwordGroup: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 25
    },
    passwordGroupCreateAccount: {
        flexDirection: "row",
        alignItems: "center",
    },
    textInput: {
        width: 290,
        height: 50,
        borderWidth: 1,
        borderColor: colors.mediumGray,
        borderRadius: 10,
        padding: 10
    },
    toggle: {
        margin: -40
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingBottom: 40
    },
    buttonContainerOferta: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingBottom: 30
    },
    deleteBtn: {
        width: "48%",
        height: 40,
        borderWidth: 1,
        borderColor: colors.red,
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
    editBtn: {
        width: "48%",
        height: 40,
        borderWidth: 1,
        borderColor: colors.mediumGray,
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
    saveBtn: {
        width: "48%",
        height: 40,
        borderWidth: 1,
        borderColor: colors.primary,
        backgroundColor: colors.primary,
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
    eyes: {},
    buttonTextContainer: {},
    // Admin Product Form
    formContainer: {
        padding: 10,
        height: deviceHeight,
        width: deviceWidth,
    },
    formCard: {
        width: "100%",
        height: "90%",
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 20,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.85,
        elevation: 4,
        alignItems: "center",
        justifyContent: "space-around",
        paddingTop: 60
    },
    modalContainer: {
        width: deviceWidth,
        height: deviceHeight,
        backgroundColor: "#00000033",
        alignItems: "center",
        justifyContent: "center"
    },
    modalContent: {
        width: 300,
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50%",
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 20,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.85,
        elevation: 5
    },
    modalItem: {
        width: "100%",
        backgroundColor: colors.lightGray,
        padding: 10,
        marginVertical: 5,
        borderRadius: 5
    },
    formInput: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: colors.mediumGray,
        borderRadius: 10,
        padding: 10,
        marginVertical: 15
    },
    textArea: {
        width: "100%",
        height: 200,
        borderWidth: 1,
        borderColor: colors.mediumGray,
        borderRadius: 10,
        padding: 10,
        marginVertical: 15
    },
    selectInput: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: colors.mediumGray,
        borderRadius: 10,
        padding: 10,
        marginVertical: 15,
        justifyContent: "center"
    },
    uploadBtn: {
        width: "100%",
        height: 40,
        backgroundColor: colors.mediumGray,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    propostaDescriptionContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    propostaDescription: {
        marginLeft: '2%'
    },
    buttonCreateAccount: {
        marginVertical: "5%"
    }
});

const text = StyleSheet.create({
    regular: {
        fontSize: 16,
        fontWeight: "400",
        textAlign: "center",
        color: colors.mediumGray
    },
    bold: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 15,
        color: colors.darkGray
    },
    primaryText: {
        fontSize: 16,
        fontWeight: "bold",
        textTransform: "uppercase",
        color: colors.white,
        marginLeft: 20
    },
    primaryTextAccount: {
        fontSize: 16,
        textTransform: "uppercase",
        color: colors.white,
    },
    ofertaName: {
        fontSize: 16,
        fontWeight: "bold"
    },
    ofertaSubTitulo: {
        fontSize: 13,
        fontWeight: "bold",
        color: colors.subTitleGray
    },
    currency: {
        fontSize: 16,
        fontWeight: "400",
        color: colors.mediumGray
    },
    ofertaPrice: {
        fontSize: 30,
        color: colors.primary,
        fontWeight: "bold"
    },
    goBackText: {
        fontSize: 18,
        fontWeight: "bold",
        textTransform: "uppercase",
        color: colors.darkGray,
        marginLeft: 16
    },
    ofertaDetailsName: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 10,
        color: colors.darkGray
    },
    ofertaDescription: {
        fontSize: 16,
        fontWeight: "400",
        color: colors.mediumGray
    },
    loginTitle: {
        fontSize: 30,
        color: colors.darkGray,
        fontWeight: "400",
        textTransform: "uppercase",
        marginBottom: 50
    },
    logoutText: {
        color: colors.white
    },
    addButtonText: {
        color: colors.white,
        textTransform: "uppercase",
        fontWeight: "bold",
    },
    deleteText: {
        textTransform: "uppercase",
        fontWeight: "bold",
        color: colors.red
    },
    saveText: {
        textTransform: "uppercase",
        fontWeight: "bold",
        color: colors.white
    },
    editText: {
        textTransform: "uppercase",
        fontWeight: "bold",
        color: colors.mediumGray
    },
    uploadText: {
        color: colors.white,
        textTransform: "uppercase",
        fontWeight: "bold"
    },
    fileSize: {
        color: colors.primary,
        fontSize: 10,
        fontWeight: "300",
        marginVertical: 5,
        padding: 2

    }
});

const tabbar = StyleSheet.create({
    container: {
        width: deviceWidth,
        height: 80,
        backgroundColor: colors.white,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    pill: {
        padding: 15,
        backgroundColor: colors.lightGray,
        borderRadius: 30
    },
    pillActive: {
        backgroundColor: colors.bluePill
    },
    pillText: {
        fontWeight: "bold",
        color: colors.mediumGray
    },
    pillTextActive: {
        color: colors.primary
    }
});

const admin = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: "center"
    },
    addButton: {
        width: "100%",
        height: 50,
        backgroundColor: colors.primary,
        margin: 10,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    }
});

const tag = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    containerItem: {
        fontWeight: "bold",
        borderRadius: 8,
        backgroundColor: "#0086b3"
    },
    containerText: {
        fontSize: 13,
        paddingHorizontal: 5,
        paddingVertical: 3,
        fontWeight: "bold",
        color: colors.subTitleGray
    }
})

export { colors, theme, text, nav, tabbar, admin, tag };