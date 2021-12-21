import React from "react";
import { FormEvent, useEffect, useState } from "react";
import Section, { Dictionary } from "./Section";

interface IFormGeneratorProps {
    jobData: Frontier.Job
}

function FormGenerator(props: IFormGeneratorProps) {

    function initializeValues(currValues: Dictionary, selectedSection: Frontier.Section) {
        const newValues: Dictionary = selectedSection.content.reduce((obj: Dictionary, field: Frontier.Element) => {
            switch (field.type) {
                case "text":
                case "textarea":
                    obj[field.id] = ""
                    break
                case "boolean":
                    obj[field.id] = true
                    break
                case "multichoice":
                    obj[field.id] = []
            }

            return obj
        }, {} as Dictionary)

        return Object.assign({} as Dictionary, newValues, currValues)
    }

    const [sectionNum, setSectionNum] = useState<number>(0)
    const [section, setSection] = useState<Frontier.Section>(props.jobData.sections[sectionNum])
    const [values, setValues] = useState<Dictionary>(initializeValues({}, section))
    const formRef: React.RefObject<HTMLFormElement> = React.createRef()

    // this effect will run when the `section` changes
    useEffect(() => {
        const selectedSection: Frontier.Section = props.jobData.sections[sectionNum]
        setSection(selectedSection)
        setValues((currValues: Dictionary) => initializeValues(currValues, selectedSection))
    }, [sectionNum, props.jobData])

    // callback provided to components to update all the form values
    function fieldChanged(fieldId: string, value: string | string[] | boolean) {
        setValues((currValues: Dictionary) => {
            currValues[fieldId] = value
            return currValues
        })

        // Only been done to force a re-render in React
        setSection((currSection) => {
            return Object.assign({}, currSection)
        });
    };

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        // logs all the values added to the form by the user when the form is submitted, as required
        console.log(values)
    }

    function handleClick() {
        const form = formRef.current;
        // To force form validation on every click on the 'Next' button
        if (!form?.checkValidity()) {
            form?.reportValidity()
            return
        }
        else {
            setSectionNum(sectionNum + 1)
        }
    }

    return (
        <form onSubmit={handleSubmit} ref={formRef} style={{ backgroundColor: props.jobData.theme.primary_color }}>
            <h2>Job Application</h2>
            <div style={{ backgroundColor: props.jobData.theme.secondary_color }}>
                <Section key={section.id} sectionData={section} values={values} fieldChanged={fieldChanged} />
                {
                    sectionNum > 0 &&
                    <button onClick={() => setSectionNum(sectionNum - 1)}>Back</button>
                }&nbsp;
                {
                    sectionNum < props.jobData.sections.length - 1 &&
                    <button onClick={handleClick}>Next</button>
                }&nbsp;
                {
                    sectionNum === props.jobData.sections.length - 1 &&
                    <button type="submit">Submit</button>
                }
            </div>
        </form >
    );
}

export default FormGenerator