const secondaryFetchAPI = async () => {
  const req = await fetch('https://economia.awesomeapi.com.br/json/all');
  const res = await req.json();
  return res;
};

export default secondaryFetchAPI;
