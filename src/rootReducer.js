import { combineReducers } from 'redux'
import { auth, form, forms, submission, submissions } from 'react-formio';
import {FormConfig} from './config'

const createReducers = () => {

  let reducersObj =  {
    auth: auth(),
    form: form({name: 'form'}),
    forms: forms({ name: 'forms', query: {type: 'form', tags: 'common'}}),
    submission: submission({name: 'submission'}),
    submissions: submissions({name: 'submissions'})
  }

  console.log(FormConfig);
  reducersObj[FormConfig.volunteerForm.formName] = combineReducers({
    form: form({ name: FormConfig.volunteerForm.formName}),
    submission: submission({name: FormConfig.volunteerForm.formName}),
    submissions: submissions({name: FormConfig.volunteerForm.formName}),
  });
  reducersObj[FormConfig.addVolunteerForm.formName] = combineReducers({
    form: form({ name: FormConfig.addVolunteerForm.formName}),
    submission: submission({name: FormConfig.addVolunteerForm.formName}),
    submissions: submissions({name: FormConfig.addVolunteerForm.formName}),
  });
  return reducersObj;

}

export default combineReducers(createReducers());
