import React from 'react'
import Select2 from "react-select2-wrapper";
import { Form, FormGroup } from 'reactstrap'
import { InputHeading } from '@components'



type AutoCompleteProps = {
    variant?: 'default' | 'custom'
    data?: any
    placeHolder?: string;
    defaultValue?: any;
    onChange?: (item: any) => void;
    multiple?: string;
    value?: any;
    disabled?: boolean;
    selected?: any;
    className?: string;
    inputType?: string;
    heading?: string
}

function SearchableDropdown({ variant = 'default', data, heading, selected, className, onChange, inputType, placeHolder }: AutoCompleteProps) {


    function proceedOnChange(e: any) {

        const selectedId = e.target.value
        if (onChange) {

            const selectedItemById = data?.find((option: any) => {
                return option.id == selectedId
            })

            if (selectedItemById) {
                onChange(selectedItemById)
            }
        }

    }



    return (
        <>
            <InputHeading heading={heading}/>
            <div className='mt-2 overflow-hidden'>
                <Select2
                    data={data}
                    data-minimum-results-for-search={inputType}
                    className={`${className} select2-container `}
                    value={selected && selected.id}
                    options={{
                        placeholder: placeHolder
                    }}
                    onChange={proceedOnChange}
                />
            </div>
        </>
    )

}

export default SearchableDropdown;
