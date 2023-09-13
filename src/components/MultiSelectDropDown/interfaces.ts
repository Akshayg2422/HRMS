export interface MultiSelectProps {
    options: { id: string, value: string, name: string ,title?:string}[];
    onSelect: (selectedList: any) => void;
    onRemove: (selectedList: any) => void;
    displayValue: string;
    selectedValues?: any;
    singleSelect?: boolean;
    showCheckbox?: boolean;
    placeholder?: string;
    style?: object;
    disable?: boolean;
    showArrow?: boolean;
    avoidHighlightFirstOption?: boolean;
    heading?: string;
    id?: string;
    titleBy?:string;
    defaultValue?: [];
  
}