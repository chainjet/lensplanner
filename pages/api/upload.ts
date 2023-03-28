import { PutObjectCommand, S3 } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'

const s3 = new S3({
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_ACCESS_SECRET!,
  },
  region: 'us-west-2',
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { type, size } = req.body

      // size up to 4mb per image
      if (size > 4 * 1024 * 1024) {
        throw new Error('File size too large')
      }
      if (!type || !type.startsWith('image/')) {
        throw new Error('Invalid file type')
      }

      const uuid = uuidv4()
      const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: uuid,
        ContentType: type,
        ACL: 'public-read',
        ContentLength: size,
      })
      const url = await getSignedUrl(s3, putObjectCommand)
      res.status(200).json({ url, uuid })
    } catch (err) {
      console.log('Error uploading image', err)
      res.status(400).json({ message: err })
    }
  } else if (req.method === 'GET') {
    try {
      const { uuid } = req.query
      const data = await s3.headObject({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: uuid?.toString(),
      })
      res.status(200).json({ cid: data?.Metadata?.['ipfs-hash'] })
    } catch (err) {
      console.log('Error getting image info', err)
      res.status(400).json({ message: err })
    }
  } else {
    // Handle any other HTTP method
    res.status(400).json({ ok: false, message: 'Invalid method' })
  }
}
