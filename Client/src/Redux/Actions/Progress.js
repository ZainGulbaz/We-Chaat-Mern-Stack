export const homeProgress = (isProgress) => {
  return {
    type: "HOME_PROGRESS",
    payload: {
      home: isProgress,
    },
  };
};
