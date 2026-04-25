export const catchAsyncErrors = (theFunction) => {
    return (req, res, next) => {
      Promise.resolve(theFunction(req, res, next)).catch(next);
    };
  };
<<<<<<< HEAD
=======
  
>>>>>>> 01408f9db6e9f9b896d80cf40404a295b58e63f8
