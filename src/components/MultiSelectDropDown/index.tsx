import React, { useEffect, useState } from 'react'
import { MultiSelectProps } from './interfaces'
import { Multiselect } from 'multiselect-react-dropdown';
import { FormGroup } from 'reactstrap';
// import { InputHeading } from '@Components';

const MultiSelectDropDown = ({
    options,
    onSelect,
    onRemove,
    selectedValues,
    displayValue,
    heading,
    defaultValue,
    placeholder,
    titleBy,
    id,
    singleSelect
}: MultiSelectProps) => {

    const [selectedOptions, setSelectedOptions] = useState<any>(defaultValue)


    useEffect(() => {
        setSelectedOptions(defaultValue)
    }, [defaultValue])

    const handleSelect = (selectedOptions: any,selectedList:any) => {
      
        if(selectedList.id==='-1'){
            let initialSelect=[{id: '-1', name: 'All', value: ''}]
            setSelectedOptions([])
        onSelect([])

        }
        else {
             let filterData=selectedOptions.filter((el)=>el.id!=='-1')
             

            setSelectedOptions(filterData)
            onSelect(filterData)

        }

    
        
    }

    const handleRemove = (selectedOptions: any) => {
        setSelectedOptions(selectedOptions)
        onRemove(selectedOptions)
    }

    const styles = {

        searchBox: {
            borderColor: '#e4e8eb',
        },
        inputField: {
            margin: '5px',
            border: '#e4e8eb',
        },
        optionContainer: {
             borderColor: 'gray',
             background: '#ffffff',
             border: '1px solid #ccc',
             borderRadius:'8px'
   
        },
        option: {
            // backgroundColor: '#fff',
            color: '#333',
            fontSize:'13px',
        },

        chips: {
            background: '#52307c',
            color: 'white',
            fontSize:'11px'
        },
        
    };

    return (
        <FormGroup>
            {heading && <small className="form-control-label text-black  ">{heading}</small>}
            <Multiselect
                style={styles}
                className='text-sm mt-2'
                options={options}
                groupBy={titleBy}
                placeholder={placeholder}
                selectedValues={selectedOptions}
                onSelect={handleSelect}
                onRemove={handleRemove}
                displayValue={displayValue}
                avoidHighlightFirstOption={true}
             
              
            />
        </FormGroup>
    )
}

export { MultiSelectDropDown } 