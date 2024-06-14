'use server';

export async function PincodeChecker(pincode) {
  console.log(process.env.PASS);
  try {
    const authresponse = await fetch(
      'https://apiv2.shiprocket.in/v1/external/auth/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: process.env.USEREMAIL,
          password: process.env.PASS,
        }),
      }
    );

    const authdata = await authresponse.json();
    console.log(authdata);
    if (authdata && authdata.token) {
      const finalresponse = await fetch(
        `https://apiv2.shiprocket.in/v1/external/courier/serviceability/?pickup_postcode=411045&delivery_postcode=${pincode}&weight=1&cod=1`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authdata.token}`,
          },
        }
      );

      const finaldata = await finalresponse.json();
      return {
        message: 'Response',
        success: true,
        data: finaldata,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      message: 'Response',
      success: false,
      data: { message: error, status: 500 },
    };
  }
}
