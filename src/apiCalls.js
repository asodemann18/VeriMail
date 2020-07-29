
export const getEmailInfo = async () => {
  const response = await fetch(`${rootUrl}/filter.php?a=Alcoholic`);

  if(response.ok) {
		const data = await response.json();
    return data.drinks;
  } else {
    throw new Error(response.statusText);
  }
};