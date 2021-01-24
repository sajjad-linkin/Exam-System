const styles = theme => ({
    paper: {
        userSelect: "none",
        overflowX: "hidden",
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: "70px",
        position: "absolute",
        top: "50%",
        left: "50%",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "70%",
        height: "85%"
    },
    btnNext: {
        margin: theme.spacing(),
        marginTop: "20px",
        position: "absolute",
        left: 20
    },
    btnPrev: {
        margin: theme.spacing(),
        marginTop: "20px",
        position: "absolute",
        left: 100
    },
    btnPrevSubmit: {
        margin: theme.spacing(),
        marginTop: "20px",
        position: "absolute",
        left: 120
    },
    btnSubmit: {
        margin: theme.spacing(),
        marginTop: "20px",
        position: "absolute",
        left: 20
    },
    logo: {
        userSelect: "none",
        marginTop: "2px",
        direction:"rtl"
    },
    undoneAnswer:{
        minWidth:"40px ",
        minHeight:"40px",
        borderRadius:"50%",
        margin:"2px",
        fontWeight:"600",
        fontSize:"11px",
        background:"#F8EA9C",
        "&:hover": {
            backgroundColor: "#F8EA9C"
        }
    },
    doneAnswer:{
        minWidth:"40px ",
        minHeight:"40px",
        borderRadius:"50%",
        margin:"2px",
        fontWeight:"600",
        fontSize:"11px",
        color:"white",
        background:"#14E307",
        "&:hover": {
            backgroundColor: "#14E307"
        }
    },
    
});

export default styles;
