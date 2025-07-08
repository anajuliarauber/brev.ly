  export const copyUrl = (url: string) => {
    navigator.clipboard.writeText(`${url}`);
  };