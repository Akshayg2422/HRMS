import {
  ChangeEventHandler,
  MouseEvent,
  KeyboardEventHandler,
  KeyboardEvent,
  ImgHTMLAttributes,
} from "react";
export interface ContainerProps {
  justifyContent?:
  | "justify-content-start"
  | "justify-content-end"
  | "justify-content-center"
  | "justify-content-between"
  | "justify-content-around";
  alignItems?:
  | "align-items-start"
  | "align-items-end"
  | "align-items-center"
  | "align-items-baseline"
  | "align-items-stretch"
  | "align-content-start"
  | "align-content-end"
  | "align-content-center"
  | "align-content-between"
  | "align-content-around"
  | "align-content-stretch";
  col?:
  | "col"
  | "col-1"
  | "col-10"
  | "col-11"
  | "col-12"
  | "col-2"
  | "col-3"
  | "col-4"
  | "col-5"
  | "col-6"
  | "col-7"
  | "col-8"
  | "col-9"
  | "col-auto"
  | "col-lg"
  | "col-lg-1"
  | "col-lg-10"
  | "col-lg-11"
  | "col-lg-12"
  | "col-lg-2"
  | "col-lg-3"
  | "col-lg-4"
  | "col-lg-5"
  | "col-lg-6"
  | "col-lg-7"
  | "col-lg-8"
  | "col-lg-9"
  | "col-lg-auto"
  | "col-md"
  | "col-md-1"
  | "col-md-10"
  | "col-md-11"
  | "col-md-12"
  | "col-md-2"
  | "col-md-3"
  | "col-md-4"
  | "col-md-5"
  | "col-md-6"
  | "col-md-7"
  | "col-md-8"
  | "col-md-9"
  | "col-md-auto"
  | "col-sm"
  | "col-sm-1"
  | "col-sm-10"
  | "col-sm-11"
  | "col-sm-12"
  | "col-sm-2"
  | "col-sm-3"
  | "col-sm-4"
  | "col-sm-5"
  | "col-sm-6"
  | "col-sm-7"
  | "col-sm-8"
  | "col-sm-9"
  | "col-sm-auto"
  | "col-xl"
  | "col-xl-1"
  | "col-xl-10"
  | "col-xl-11"
  | "col-xl-12"
  | "col-xl-2"
  | "col-xl-3"
  | "col-xl-4"
  | "col-xl-5"
  | "col-xl-6"
  | "col-xl-7"
  | "col-xl-8"
  | "col-xl-9"
  | "col-xl-auto"
  | undefined
  | string;
  flexDirection?:
  | "flex-row"
  | "flex-column"
  | "flex-row-reverse"
  | "flex-column-reverse"
  | "row"
  | "column";
  margin?:
  | "m-1"
  | "mx-1"
  | "my-1"
  | "ml-1"
  | "mr-1"
  | "mt-1"
  | "mb-1"
  | "m-2"
  | "mx-2"
  | "my-2"
  | "ml-2"
  | "mr-2"
  | "mt-2"
  | "mb-2"
  | "m-3"
  | "mx-3"
  | "my-3"
  | "ml-3"
  | "mr-3"
  | "mt-3"
  | "mb-3"
  | "m-4"
  | "mx-4"
  | "my-4"
  | "ml-4"
  | "mr-4"
  | "mt-4"
  | "mb-4"
  | "m-5"
  | "mx-5"
  | "my-5"
  | "ml-5"
  | "mr-5"
  | "mt-5"
  | "mb-5"
  | "m-6"
  | "mx-6"
  | "my-6"
  | "ml-6"
  | "mr-6"
  | "mt-6"
  | "mb-6"
  | "m-7"
  | "mx-7"
  | "my-7"
  | "ml-7"
  | "mr-7"
  | "mt-7"
  | "mb-7"
  | "m-8"
  | "mx-8"
  | "my-8"
  | "ml-8"
  | "mr-8"
  | "mt-8"
  | "mb-8"
  | "m-9"
  | "mx-9"
  | "my-9"
  | "ml-9"
  | "mr-9"
  | "mt-9"
  | "mb-9";
  padding?:
  | "p-1"
  | "px-1"
  | "py-1"
  | "pl-1"
  | "pr-1"
  | "pt-1"
  | "pb-1"
  | "p-2"
  | "px-2"
  | "py-2"
  | "pl-2"
  | "pr-2"
  | "pt-2"
  | "pb-2"
  | "p-3"
  | "px-3"
  | "py-3"
  | "pl-3"
  | "pr-3"
  | "pt-3"
  | "pb-3"
  | "p-4"
  | "px-4"
  | "py-4"
  | "pl-4"
  | "pr-4"
  | "pt-4"
  | "pb-4"
  | "p-5"
  | "px-5"
  | "py-5"
  | "pl-5"
  | "pr-5"
  | "pt-5"
  | "pb-5"
  | "p-6"
  | "px-6"
  | "py-6"
  | "pl-6"
  | "pr-6"
  | "pt-6"
  | "pb-6"
  | "p-7"
  | "px-7"
  | "py-7"
  | "pl-7"
  | "pr-7"
  | "pt-7"
  | "pb-7"
  | "p-8"
  | "px-8"
  | "py-8"
  | "pl-8"
  | "pr-8"
  | "pt-8"
  | "pb-8"
  | "p-9"
  | "px-9"
  | "py-9"
  | "pl-9"
  | "pr-9"
  | "pt-9"
  | "pb-9";
  height?:
  | "h-25"
  | "h-50"
  | "h-75"
  | "h-100"
  | "h-auto"
  | "vh-100"
  | number
  | string;
  width?:
  | "w-25"
  | "w-50"
  | "w-75"
  | "w-100"
  | "w-auto"
  | "vw-100"
  | number
  | string;
  display?:
  | "d-none"
  | "d-inline"
  | "d-inline-block"
  | "d-block"
  | "d-table "
  | "d-table-row"
  | "d-table-cell"
  | "d-flex"
  | "d-inline-flex";
  textAlign?: "text-justify" | "text-left" | "text-right" | "text-center";
  fontWeight?:
  | "font-weight-light"
  | "font-weight-lighter"
  | "font-weight-normal"
  | "font-weight-bold"
  | "font-weight-bolder"
  | "font-weight-300"
  | "font-weight-400"
  | "font-weight-500"
  | "font-weight-600"
  | "font-weight-700"
  | "font-weight-800"
  | "font-weight-900";
  textColor?:
  | "text-muted"
  | "text-primary"
  | "text-light"
  | "text-dark"
  | "text-default"
  | "text-white"
  | "text-neutral"
  | "text-darker";
  position?:
  | "position-static"
  | "position-relative"
  | "position-absolute"
  | "position-fixed"
  | "position-sticky";
  onClick?: () => void | undefined;
  additionClass?: string;
}

export interface InputProps extends ContainerProps {
  size?: "sm" | "md" | "lg" | undefined;
  label?: string;
  accept?: string | undefined;
  alt?: string | undefined;
  autoComplete?: string | undefined;
  autoFocus?: boolean | undefined;
  capture?: boolean | "user" | "environment" | undefined;
  checked?: boolean | undefined;
  crossOrigin?: string | undefined;
  disabled?: boolean | undefined;
  enterKeyHint?:
  | "enter"
  | "done"
  | "go"
  | "next"
  | "previous"
  | "search"
  | "send"
  | undefined;
  form?: string | undefined;
  formAction?: string | undefined;
  formEncType?: string | undefined;
  formMethod?: string | undefined;
  formNoValidate?: boolean | undefined;
  formTarget?: string | undefined;
  height?: number | string | undefined;
  list?: string | undefined;
  max?: number | string | undefined;
  maxLength?: number | undefined;
  min?: number | string | undefined;
  minLength?: number | undefined;
  multiple?: boolean | undefined;
  name?: string | undefined;
  pattern?: string | undefined;
  placeholder?: string | undefined;
  readOnly?: boolean | undefined;
  required?: boolean | undefined;
  src?: string | undefined;
  step?: number | string | undefined;
  type?:
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week"
  | undefined;
  value?: string | number | undefined;
  width?: number | string | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  divClass?: string | undefined;
  formCustomClass?: string | undefined;
  validator?: any;
  ref?: any;
  onFocus?: any
  defaultValue?: string
  onKeyUp?: any,
  showArrow?: boolean,
  id?: any
}

export interface DatePickerProps {
  icon?: any;
  iconPosition?: "append" | "prepend";
  title?: string;
  onChange?: (currentDateString: string) => void;
  value?: any;
  defaultValue?: string;
  placeholder?: string;
  minDate?: any;
  disabledDate?: any
  additionalClass?: string
  maxDate?: string
  name?: string
  disabled?:boolean
}

export interface TableProps {
  tableData: Array<{}>;
}

export type LocationProps = {
  name: string;
  id: string;
  has_location: boolean;
  can_update_location: boolean;
  parent_id: string;
  fencing_radius: number;
  geo_location_id: string;
  fence_admin_id: string;
  child?: any;
};
