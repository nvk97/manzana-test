export const commonRequest = (props) => {
  return fetch(props.url, { ...props.options });
};
