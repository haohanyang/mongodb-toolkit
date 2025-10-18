function debug(prefix: string) {
  return (...args: any[]) => {
    console.log(prefix, args);
  };
}

export default debug;
