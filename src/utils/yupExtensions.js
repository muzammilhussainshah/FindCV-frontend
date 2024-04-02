import * as Yup from 'yup';

// Extending Yup to include a file validation method for file size
Yup.addMethod(Yup.mixed, 'fileSize', function (maxSize, message) {
  return this.test('fileSize', message, function (value) {
    
    if (value) {
      return value && value.size <= maxSize;
    }
    else {
      return true;
    }

  });
});

// Extending Yup to include a file validation method for file type
Yup.addMethod(Yup.mixed, 'fileType', function (types, message) {
  return this.test('fileType', message, function (value) {

    if (value) {
      return value && types.includes(value.type);
    }
    else {
      return true;
    }

  });
});

export default Yup;