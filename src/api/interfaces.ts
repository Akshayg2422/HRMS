export interface ApiProps {
  params: object;
  successResponse: (response: object) => void;
  failureResponse: () => void;
}

export interface ResponseProps {
  success: boolean;
  status: string;
  message: string;
  details: object;
  error_message?: string;
  errors?: [];
}


export interface LoginProps {
  success: boolean;
  status: string;
  message: string;
  details?: OtpLoginProps;
}


export interface OtpLoginProps {
  success?: boolean;
  token?: string;
  message?: string;
  is_admin?: boolean;
  is_branch_admin?: boolean;
  has_company?: boolean;
  has_company_branch_location?: boolean;
  company?: {name: string, id: string};
  company_branch?: {name: string, id: string};
}


export interface Employees {
  success: boolean;
  status: string;
  message: string;
  details: EmployeeDetails;
}


export interface EmployeeDetails {
  total: number;
  next_page: number;
  num_pages: number;
  data: Array<Employee>
}

export interface Employee {
  id: string;
  mobile_number: string;
  employee_id: string;
  name: string;
  is_admin: boolean;
  is_active: boolean;
  is_branch_admin: boolean;
}

