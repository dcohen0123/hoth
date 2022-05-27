const ProgressBar = (props: any) => {
    return <div style={{marginTop: "5px", width: "100%", height: "15px", "border": "1px solid #ccc", borderRadius: "30px", background: props.node.rowIndex !== 2 ? "linear-gradient(to right, #51c734ff 80%, white 80% 100%)" : "linear-gradient(to right, rgb(222, 109, 99) 30%, white 30% 100%)"}}></div>
}

export default ProgressBar;