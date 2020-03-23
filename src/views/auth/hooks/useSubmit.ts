import React, {useState} from 'react';

export const useSubmit = (submitFunction: Function) => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setServerError(null);
      await submitFunction();
    } catch (error) {
      setServerError(error.response.status);
    } finally {
      setLoading(false);
    }
  };
  return {handleSubmit, loading, serverError};
};
