export function parseJWT(jwtToken: any) {
    const [header, payload, signature] = jwtToken.split('.');
    
    const decodedHeader = JSON.parse(atob(header));
    const decodedPayload = JSON.parse(atob(payload));
  
    return {
      header: decodedHeader,
      payload: decodedPayload,
      signature: signature
    };
  };