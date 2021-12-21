interface IRadioInputProps {
    data: Frontier.Element,
    value: boolean,
    fieldChanged: (fieldId: string, value: string | string[] | boolean) => void
}

function RadioInput(props: IRadioInputProps) {
    const metadata = props.data.metadata

    return (
        <div>
            <label>{props.data.question_text}</label>
            <br />
            <input
                id={props.data.id + "1"}
                name={props.data.id}
                type="radio"
                required={metadata.required}
                value={1}
                checked={props.value}
                onChange={() => { props.fieldChanged(props.data.id, true) }}
            />
            <label htmlFor={props.data.id + "1"}>Yes</label>

            <input
                id={props.data.id + "0"}
                name={props.data.id}
                type="radio"
                required={metadata.required}
                value={0}
                checked={!props.value}
                onChange={() => { props.fieldChanged(props.data.id, false) }}
            />
            <label htmlFor={props.data.id + "0"}>No</label>
        </div>
    );
}

export default RadioInput