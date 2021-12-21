import MultiChoiceInput from "./MultiChoiceInput";
import RadioInput from "./RadioInput";
import TextAreaInput from "./TextAreaInput";
import TextInput from "./TextInput";

export interface Dictionary {
    [key: string]: string | string[] | boolean
}

interface ISectionProps {
    sectionData: Frontier.Section,
    values: Dictionary,
    fieldChanged: (fieldId: string, value: string | string[] | boolean) => void
}

function Section(props: ISectionProps) {
    const sectionData: Frontier.Section = props.sectionData
    const userForm: JSX.Element[] = sectionData.content.map((content) => {
        let inputElement: JSX.Element
        switch (content.type) {
            case "text":
                inputElement = <TextInput
                    key={content.id}
                    data={content}
                    value={props.values[content.id] as string}
                    fieldChanged={props.fieldChanged} />
                break
            case "boolean":
                inputElement = <RadioInput
                    key={content.id}
                    data={content}
                    value={props.values[content.id] as boolean}
                    fieldChanged={props.fieldChanged} />
                break
            case "multichoice":
                inputElement = <MultiChoiceInput
                    key={content.id}
                    data={content}
                    value={props.values[content.id] as string[]}
                    fieldChanged={props.fieldChanged} />
                break
            case "textarea":
                inputElement = <TextAreaInput
                    key={content.id}
                    data={content}
                    value={props.values[content.id] as string}
                    fieldChanged={props.fieldChanged} />
        }

        return inputElement
    });

    return (
        <>
            <h3> {sectionData.title} </h3>
            {userForm}
        </>
    );
}

export default Section