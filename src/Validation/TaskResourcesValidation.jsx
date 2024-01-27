import * as yup from 'yup';

const TaskResourcesValidation = yup.object().shape({
    addedBy: yup.string().required('Required'),
    addedDate: yup.date().required('Required'),
    comment: yup.string().required('Required'),
  });

export default TaskResourcesValidation;