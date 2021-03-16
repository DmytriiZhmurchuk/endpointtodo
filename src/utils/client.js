const apiKey = 'PMAK-5ef63db179d23c004de50751-10300736bc550d2a891dc4355aab8d7a5c';

const dofetch = (url) => {
  return fetch(url, {
    headers: {
      'X-Api-Key': apiKey
    }
  })
}
const doPost = (url,data) => {
  return fetch(url, {
    method: 'PATCH',
    headers: {
      'X-Api-Key': apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}
export {doPost};
export default dofetch;