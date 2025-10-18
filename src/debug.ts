function debug(prefix: string) {
  return (...args: any[]) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(prefix, args);
    }
  };
}

export default debug;
