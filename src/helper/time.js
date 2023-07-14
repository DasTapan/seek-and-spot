const getTimeStamp = (date) => {
  const dateInMilliseconds = date.getTime();
  const tsAfterOneMillisecond = date.setTime(dateInMilliseconds + 1);
  const nd = new Date(tsAfterOneMillisecond);
  const hh = nd.getHours();
  const mn = nd.getMinutes();
  const ss = nd.getSeconds();
  const ms = nd.getMilliseconds();

  return `${hh}:${mn}:${ss}:${ms}`;
};

export default getTimeStamp;
