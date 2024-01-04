const styles = {
  root: {
    paddingTop: 80,
    paddingLeft: 34,
    paddingRight: 34,
    justifyContent: "center",
    minHeight: "100%",
    paddingBottom: 40,
    flexDirection: "column",
    fontSize: 9,
  },
  wrapItem: {
    flexDirection: "column",
    display: "flex",
    transition: "flex-grow .3s",
  },
  wrapStack: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  item: {
    textAlign: "center",
    overflow: "hidden",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    height: 35,
    border: `1px solid #aaa`,
  },
  innerItem: {
    wordBreak: "break-all",
  },
};

export default styles;
