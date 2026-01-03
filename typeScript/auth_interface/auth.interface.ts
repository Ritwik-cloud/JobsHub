///// ---- candidate interface

export interface candidateRegisterPayload {
  name: string;
  email: string;
  password: string;
}

////  recruiter interface

export interface recruiterRegisterPayload {
  name: string;
  email: string;
  designation: string;
  company: string;
  isNewCompany: boolean;
  companyId: string;
  website: string;
  password: string;
}

export interface loginPayload {
  email: string;
  password: string;
}

// login form recieve data
interface loginResponse {
  status: boolean;
  message: string;
   token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
 
}


/////------- register response-----///

interface registerPayload {
  status: boolean;
  message: string;
  url: string;
}

// inheritance
export interface IRegisterResponse extends registerPayload {
  data: registerPayload;
}

// export interface ILoginResponse extends registerPayload {
//   data: registerPayload;
// }

export interface ILoginResponse extends loginResponse {
  data: loginResponse;
}
