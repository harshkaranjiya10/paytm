export default function Balance(props) {
    return (
        <div className="flex ml-8 mt-2">
            <div className="font-bold text-lg">
                Your balance
            </div>
            <div className="font-semibold ml-4 text-lg">
                Rs {props.value}
            </div>
        </div>
    )
}