
export const getEmailInfo = async (email) => {
  // const response = await fetch(`${rootUrl}/filter.php?a=Alcoholic`);

  // if(response.ok) {
	// 	const data = await response.json();
  //   return data.drinks;
  // } else {
  //   throw new Error(response.statusText);
  // }

  // const response = await fetch(`https://apilayer.net/api/check?access_key=c9e97b26d4099cd4e226ce145b24ff95&email=${email}&format=1`)
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${email}`)

   if(response.ok) {
		return await response.json();
  } else {
    throw new Error(response.statusText);
  }
};