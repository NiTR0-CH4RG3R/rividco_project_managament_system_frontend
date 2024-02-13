import * as yup from 'yup';

const TaskResourcesValidation = yup.object().shape({
    category: yup.string().required('Required'),
    comment: yup.string().required('Required'),
  });

export default TaskResourcesValidation;