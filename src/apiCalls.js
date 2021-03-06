export const getEmailInfo = async (email) => {
  const response = await fetch(`https://apilayer.net/api/check?access_key=c9e97b26d4099cd4e226ce145b24ff95&email=${email}&format=1`)
  
  if(response.ok) {
		return await response.json();
  } else {
    throw new Error(response.statusText);
  }
};