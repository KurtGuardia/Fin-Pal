export const lockState = (lockState) => {
  return {
    type: 'LOCK_STATE',
    payload: lockState,
  };
};

export const toggleLock = (isAccountLocked) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;
    const profile = getState().firebase.profile;

    firestore
      .collection('users')
      .doc(uid)
      .set({
        ...profile,
        isAccountLocked: isAccountLocked,
      })
      .then((res) => {
        console.log('isAccountLocked activated');
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
