interface Props{
    key: string;
    value: number;
    isHeld: boolean;
    holdDice: Function;
}

export default function Die({key, value, isHeld, holdDice}: Props) {
    // colour changes depending on whether the die is selected or not
    const styles = {
        backgroundColor: isHeld ? "#59E391" : "white"
    }

    function clickHandler() {
        holdDice();
    }

    return (
        <div
            className="die-face"
            style={styles}
            onClick={clickHandler}
        >
            <h2 className="die-num">{value}</h2>
        </div>
    )
}