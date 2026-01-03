

export const endPoints = {
  auth: {
    recruiter: {
      register: `/auth/register-recruiter`,
      login: `auth/login/recruiter`,
     
    },

    candidate: {
      register: `/auth/register-candidate`,
      login: `auth/login/candidate`,
      
    },
  },

  cms:{
    candidate:{
    dashboard: `/candidate/dashboard`,
    profile:`/candidate/profile`,
    profiledetails: `/candidate/profile/basic-details`,
    profileDetailsUpdate: `/candidate/profile/basic-details/update`,
    profileSummary:`/candidate/profile/profile-summary`,
    profileSummaryUpdate: `/candidate/profile/profile-summary/update`,
    skills:`/candidate/profile/skills`,
    skillsUpdate:`/candidate/profile/skills/update`,
    addEducation:`/candidate/profile/education/add`,
    deleteEducation:`/candidate/profile/education/`,
    addProjects: `/candidate/profile/project/add`,
    deleteProject:`/candidate/profile/project/`,
    getCareerPreference: `/candidate/profile/career-preferences`,
    updateCareerpreference:`/candidate/profile/career-preferences/update`,
    resumeUpdate:`/candidate/profile/resume/update`,
    },

    recruiter:{
      dashboard:`/recruiter/dashboard`,
      profile:`/recruiter/profile`,
      allJobs: `/recruiter/jobs/by-recruiter/pagination`,
      recruiterManage:`/recruiter/manage-recruiter`,
      companyDetails:`/recruiter/manage-company`,
      updateCompany:`/recruiter/company/`,
     statusUpdate:`/recruiter/jobs/`,
     applicationDetails:`/recruiter/applications/`,
     AllApplications:`/recruiter/applications`,
     deleteJob: `/recruiter/jobs/`,
     jobDetails:`/recruiter/jobs/`,
     addJob :`/recruiter/jobs/add`,
     updateJob:`/recruiter/jobs/`
    }
  }
};
