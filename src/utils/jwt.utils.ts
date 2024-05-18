import jwt from 'jsonwebtoken'

// create token pair
export function createTokenPair(
  payload: object,
  publicKey: string,
  privateKey: string,
): {
  accessToken: string
  refreshToken: string
} {
  try {
    //sign
    const accessToken = jwt.sign(payload, publicKey, {
      expiresIn: '2 days',
      // algorithm: 'RS256',
    })

    const refreshToken = jwt.sign(payload, privateKey, {
      expiresIn: '7 days',
      // algorithm: 'RS256',
    })

    //verify

    jwt.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.log(`--> Error verify::`, err)
      } else {
        console.log(`--> Decode verify::`, decode)
      }
    })

    return { accessToken, refreshToken }
  } catch (error: any) {
    return error
  }
}
