export const getUserDetailsFromMsGraph = async accessToken => {
  try {
    //fetching user details from microsoft graph
    console.log('sending request to fetch user details');
    const response = await fetch(`${process.env.MICROSOT_GRAPH_URL}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    return response.json();
  } catch (error) {
    res.status(500).send('Error fetching user details');
  }
};
